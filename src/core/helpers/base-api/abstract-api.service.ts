import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Loader from '@core/loader/loader.service';
import store, { RootState } from '@store/app.store';
import { ApiEndpoint } from '@shared/constant/app-endpoint';
import { ApiMethod } from '@shared/types/app.type';
import { IApiResponse } from './interfaces/IApiResponse';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { NotificationFactory } from '../notification/factory/notification-factory';
import { TmsNotificationType } from '../notification/enum/notification-type.enum';
import { APP_MESSAGES } from '@shared/constant/app-message';
import showToast from '@core/toaster/notification.service';
import { showToastify } from '@shared/components/common/CustomToast';

type ParamsType = {
  [key: string]: string | number | undefined;
};

const buildUrl = (endpoint: string, params?: ParamsType): string => {
  if (params && Object.keys(params).length > 0) {
    const urlParams = new URLSearchParams(params as Record<string, string>);
    return `${endpoint}?${urlParams.toString()}`;
  }
  return endpoint;
};

abstract class AbstractApiService {
  protected readonly headers: Record<string, string>;
  private loader: (value: boolean) => void;
  private showToast: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
  private static activeRequests = 0;

  constructor() {
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.loader = Loader;
    this.showToast = showToast;
  }

  private startLoading() {
    if (AbstractApiService.activeRequests === 0) {
      this.loader(true);
    }
    AbstractApiService.activeRequests += 1;
  }

  private stopLoading() {
    AbstractApiService.activeRequests -= 1;
    if (AbstractApiService.activeRequests === 0) {
      this.loader(false);
    }
  }

  protected async request<T>(
    method: ApiMethod,
    endpoint: string,
    data = {},
    notificationMethod = {},
    reassurance = '',
    params = {},
    notificationBody?: object
  ): Promise<T> {
    const isOnline = navigator.onLine;
    const path = window.location.pathname;

    if (!isOnline) {
      if (['post', 'put', 'delete'].includes(method)) {
        const queueItem = {
          apiUrl: `${buildUrl(endpoint, params)}`,
          requestMethod: method,
          payloadData: data,
          extractedPath: path
        };

        const storedQueue = localStorage.getItem('queueData');
        const queueData = storedQueue ? JSON.parse(storedQueue) : [];

        queueData.push(queueItem);
        localStorage.setItem('queueData', JSON.stringify(queueData));

        showToastify('You are currently offline. Your request has been queued.', 'warning');
        return Promise.resolve() as Promise<T>;
      }
    } else {
      const state: RootState = store.getState();
      const user = state.user.data as unknown as ILogin;
      const headersWithAuth = {
        ...this.headers,
        ...(user ? { Authorization: `Bearer ${user.token}` } : {})
      };

      const config: AxiosRequestConfig = {
        method,
        url: `${endpoint}`,
        headers: headersWithAuth,
        data,
        params
      };

      this.startLoading();
      try {
        const response: AxiosResponse<IApiResponse<T>> = await axios(config);
        if (
          (endpoint !== ApiEndpoint.notification && method === 'post' && !config?.url?.split('/')?.includes('getFilesUrlFromS3')) ||
          method === 'put' ||
          method === 'delete'
        ) {
          this.showToast(response.data.message, 'success');
        }
        if (method !== 'get' && endpoint !== ApiEndpoint.auth) {
          NotificationFactory.create(notificationMethod as TmsNotificationType)?.log(method, notificationBody!, reassurance);
        }
        return response.data.data as T;
      } catch (error) {
        const log = `Error ${method}ing data from ${endpoint}`;
        const message = error?.response?.data?.error?.[0]?.message || error.response.data.message;
        const statusCode: number = error?.response?.status;
        switch (statusCode) {
          case 401:
            this.showToast(message, 'error');
            break;
          case 409:
          case 404:
            this.showToast(message, 'warning');
            break;
          case 422:
          case 400:
          case 500:
            message.includes(APP_MESSAGES?.TEACHER_ALREADY_TOOK_ATTENDANCE_FOR_TODAY)
              ? this.showToast(message, 'warning')
              : this.showToast(message, 'error');
            break;
          default:
            this.showToast('An unexpected error occurred', 'error');
            break;
        }
        throw log;
      } finally {
        this.stopLoading();
      }
    }
    return Promise.resolve() as Promise<T>;
  }

  protected get<T>(endpoint: string, params = {}): Promise<T> {
    return this.request<T>('get', endpoint, {}, {}, '', params);
  }

  protected getBy<T>(endpoint: string, id: string | number): Promise<T> {
    return this.request<T>('get', `${endpoint}/${id}`);
  }

  protected getByWithParmas<T>(endpoint: string, id: string | number, params = {} as object): Promise<T> {
    return this.request<T>('get', `${endpoint}/${id}`, {}, {}, '', params);
  }

  public post<T>(
    endpoint: string,
    data = {},
    notificationMethod: TmsNotificationType,
    reassurance: string,
    notificationBody: object
  ): Promise<T> {
    return this.request<T>('post', endpoint, data, notificationMethod, reassurance, {}, notificationBody);
  }

  protected put<T>(
    endpoint: string,
    data = {},
    notificationMethod: TmsNotificationType,
    reassurance: string,
    notificationBody: object
  ): Promise<T> {
    return this.request<T>('put', endpoint, data, notificationMethod, reassurance, {}, notificationBody);
  }

  protected delete<T>(
    endpoint: string,
    notificationMethod: TmsNotificationType,
    reassurance: string,
    notificationBody: object
  ): Promise<T> {
    return this.request<T>('delete', endpoint, {}, notificationMethod, reassurance, {}, notificationBody);
  }

  protected async uploadBinaryData<T>(
    endpoint: string,
    data: FormData,
    notificationMethod: TmsNotificationType,
    reassurance: string,
    notificationBody: object
  ): Promise<T> {
    try {
      const state: RootState = store.getState();
      const user = state.user.data as unknown as ILogin;
      const headersWithAuth = {
        ...(user ? { Authorization: `Bearer ${user.token}` } : {})
      };
      const response: AxiosResponse<IApiResponse<T>> = await axios.post(`${endpoint}`, data, {
        headers: headersWithAuth
      });
      NotificationFactory.create(notificationMethod as TmsNotificationType)?.log('post', notificationBody, reassurance);
      this.showToast(response?.data?.message, 'success');
      return response.data as T;
    } catch (error) {
      const message = error.response.data.error || error.response.data.message;
      this.showToast(message, 'error');
      throw error.response.data;
    }
  }

  protected async updateBinaryData<T>(
    endpoint: string,
    data: FormData,
    notificationMethod: TmsNotificationType,
    reassurance: string,
    notificationBody?: object
  ): Promise<T> {
    try {
      const state: RootState = store.getState();
      const user = state.user.data as unknown as ILogin;
      const headersWithAuth = {
        ...(user ? { Authorization: `Bearer ${user.token}` } : {})
      };
      const response: AxiosResponse<IApiResponse<T>> = await axios.put(`${endpoint}`, data, {
        headers: headersWithAuth
      });
      NotificationFactory.create(notificationMethod as TmsNotificationType)?.log('put', notificationBody!, reassurance);
      this.showToast(response?.data?.message, 'success');
      return response.data as T;
    } catch (error) {
      const message = error.response.data.error || error.response.data.message;
      this.showToast(message, 'error');
      throw error.response.data;
    }
  }
}

export default AbstractApiService;
