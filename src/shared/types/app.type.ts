import { TmsNotificationType } from '@core/helpers/notification/enum/notification-type.enum';

export type ApiMethod = 'get' | 'post' | 'put' | 'delete';
export interface IBaseEntity {
  id: string;
}
export interface IBaseEntityWithActive extends IBaseEntity {
  isArchived?: boolean;
}

export type IdNameType = {
  // map(arg0?: (d: unknown) => unknown): unknown;
  id: string;
  name: string;
};

export type ValueLabelType = { value: string | undefined; label: string; order?: number };

export type NameType = {
  name: string;
};

export type NotificationDataType = {
  type: TmsNotificationType;
  content: string;
  recipientId: string[];
  relatedEntity: string;
  method: string;
};
export type BaseEntityDetail = IBaseEntityWithActive & IBaseEntity;

export type DateFormat = 'month' | 'date' | 'year' | 'weekday' | 'short' | 'monthdate' | 'custom' | 'custom2';
