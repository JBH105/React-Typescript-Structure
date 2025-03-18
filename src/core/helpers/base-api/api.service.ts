import AbstractApiService from '@core/helpers/base-api/abstract-api.service';
import { pathWithId } from '@shared/utils/util';
import { TmsNotificationType } from '../notification/enum/notification-type.enum';

export class ApiService<T> extends AbstractApiService {
  public readonly PATH;
  public readonly Notification;
  public readonly Reassurance;

  constructor(
    endpoint: string,
    notificationMethod: TmsNotificationType = TmsNotificationType.Performed,
    Reassurance: string = 'Performed'
  ) {
    super();
    this.PATH = endpoint;
    this.Notification = notificationMethod;
    this.Reassurance = Reassurance;
  }

  async getAll(params = {}): Promise<T[]> {
    return await this.get<T[]>(this.PATH, params);
  }

  async getById(id: number | string): Promise<T> {
    return await this.getBy<T>(this.PATH, id);
  }

  async getByIdWithParmas({ id, params = {} }: { id: number | string; params: object }): Promise<T> {
    return await this.getByWithParmas<T>(this.PATH, id, params);
  }

  async create(data: object, notificationBody?: object): Promise<T> {
    return await this.post<T>(this.PATH, data, this.Notification, this.Reassurance, notificationBody!);
  }

  async bulkCreate(data: Array<T>, notificationBody: object): Promise<T> {
    return await this.post<T>(this.PATH, data, this.Notification, this.Reassurance, notificationBody);
  }

  async update(data: object, id: string | number, notificationBody: object): Promise<T> {
    return await this.put<T>(pathWithId(this.PATH, id.toString()), data, this.Notification, this.Reassurance, notificationBody);
  }

  async updateWithoutId(data: object, notificationBody: object): Promise<T> {
    return await this.put<T>(this.PATH, data, this.Notification, this.Reassurance, notificationBody);
  }
  async updateArrayWithoutId(data: Array<T>, notificationBody: object): Promise<T> {
    return await this.put<T>(this.PATH, data, this.Notification, this.Reassurance, notificationBody);
  }
  async updateArrayWithoutIdForAttendance(data: Array<T>, notificationIds: Array<T>): Promise<T> {
    return await this.put<T>(this.PATH, data, this.Notification, this.Reassurance, notificationIds);
  }
  async setArchived(id: string | number, notificationBody?: object): Promise<T> {
    return await this.delete<T>(pathWithId(this.PATH, id.toString()), this.Notification, this.Reassurance, notificationBody!);
  }

  async updateFormdata(data: FormData, id: string | number, notificationBody?: object): Promise<T> {
    return await this.updateBinaryData<T>(
      pathWithId(this.PATH, id.toString()),
      data,
      this.Notification,
      this.Reassurance,
      notificationBody!
    );
  }

  async createFormData(data: FormData, notificationBody?: object): Promise<T> {
    return await this.uploadBinaryData<T>(this.PATH, data, this.Notification, this.Reassurance, notificationBody!);
  }
}
