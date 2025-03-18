import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiMethod, IBaseEntity, NotificationDataType } from '@shared/types/app.type';

import { ApiService } from '../core/helpers/base-api/api.service';
import { NotificationFactory } from '@core/helpers/notification/factory/notification-factory';
import { INotificationBody } from '@core/helpers/notification/interface/INotification';

export const AbstractActionService = <T extends IBaseEntity>(
  actionType: string,
  service: ApiService<T>,
  callFetchAction: boolean = true
) => {
  const fetchAction = createAsyncThunk<T[], { params?: Record<string, unknown> } | void>(actionType, async (arg) => {
    const params = arg?.params || {};
    const response = await service.getAll(params);
    return response;
  });

  const fetchByIdAction = createAsyncThunk<T, string>(`${actionType}/fetchById`, async (id) => {
    const response = await service.getById(id);
    return response;
  });

  const fetchByIdWithParamsAction = createAsyncThunk<T, { id: number | string; params: object }>(`${actionType}/fetchById`, async (arg) => {
    const response = await service.getByIdWithParmas(arg);
    return response;
  });

  const createAction = createAsyncThunk<T, { data: T; notificationBody?: INotificationBody }>(
    `${actionType}/create`,
    async ({ data, notificationBody = {} }, thunkAPI) => {
      const response = await service.create(data, notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  const bulkCreateAction = createAsyncThunk<T, { data: T; notificationBody?: INotificationBody }>(
    `${actionType}/create`,
    async ({ data, notificationBody = {} }, thunkAPI) => {
      const response = await service.bulkCreate(data as unknown as T[], notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  const updateAction = createAsyncThunk<T, { data: T; notificationBody?: INotificationBody }>(
    `${actionType}/update`,
    async ({ data, notificationBody = {} }, thunkAPI) => {
      const response = await service.update(data, data.id!, notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  const updateArrayAction = createAsyncThunk<T, { data: unknown; id: string; notificationBody?: INotificationBody }>(
    `${actionType}/updatearray`,
    async ({ data, id, notificationBody = {} }, thunkAPI) => {
      const response = await service.update(data as object, id, notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  const updateArrayActionWithoutId = createAsyncThunk<T, { data: unknown; notificationBody?: INotificationBody }>(
    `${actionType}/updatearraywithoutId`,
    async ({ data, notificationBody = {} }, thunkAPI) => {
      const response = await service.updateArrayWithoutId(data as unknown as Array<T>, notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  const deleteAction = createAsyncThunk<T, { id: string | number; notificationBody?: INotificationBody }>(
    `${actionType}/delete`,
    async ({ id, notificationBody = {} }, thunkAPI) => {
      const response = await service.setArchived(id, notificationBody);
      if (callFetchAction) {
        thunkAPI.dispatch(fetchAction());
      }
      return response;
    }
  );

  return {
    fetchAction,
    fetchByIdAction,
    createAction,
    bulkCreateAction,
    updateAction,
    updateArrayAction,
    deleteAction,
    updateArrayActionWithoutId,
    fetchByIdWithParamsAction
  };
};

export const NotificationAction = createAsyncThunk<void, { data: NotificationDataType }>('notification', async ({ data }) => {
  return await NotificationFactory.create(data.type)?.log(data.method as ApiMethod, data, data.relatedEntity);
});
