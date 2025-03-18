import { IdNameType } from '@shared/types/app.type';
import { TmsNotificationType } from '../enum/notification-type.enum';

export interface INotification {
  content: string;
  dateSent?: Date;
  recipientId?: string[];
  senderId: string;
  relatedEntity: string;
  type: string;
  account?: { RoleSchema: { name: string } };
}

export interface INotificationData {
  id: string;
  content: string;
  type: string;
}

export type TsmNotification = {
  module: 'Attendance' | 'Submission' | 'Master';
  timeStamp: Date;
  message: string;
  details: object;
};

export interface IGenerateLog extends IdNameType {
  content?: string;
  recipientId?: string[];
  relatedEntity?: string;
  notificationType?: TmsNotificationType;
  isCustom?: boolean;
}
export interface INotificationBody {
  name?: string;
  notificationType?: string;
  className?: string;
  recipientId?: string[];
  relatedEntity?: string;
  method?: string;
  topicName?: string;
  videoName?: string;
  noteFile?: string;
  message?: string;
  fileName?: string;
  subjectName?: string;
  resource?: string;
  batchName?: string;
  isRedo?: boolean;
  teacherName?: string;
}

export type NotificationType =
  | 'Topic'
  | 'SubTopic'
  | 'Class'
  | 'Batch'
  | 'Class Event'
  | 'Tutorial'
  | 'HomeWork'
  | 'Test'
  | 'Tag'
  | 'TestLevel'
  | 'Course Video'
  | 'Teacher Assigned'
  | 'Topic Class Mapping'
  | 'Attendance'
  | 'Lecture Slides'
  | 'Homework Sheet'
  | 'Homework Task'
  | 'Test Task'
  | 'FileUpload'
  | 'Test Sheet';


  export interface INotificationPayload {
    type: TmsNotificationType;
    content: string;
    recipientId: string[];
    relatedEntity: string;
    method: 'put' | 'post' | 'delete';
    notificationType: TmsNotificationType;
    isCustom?: boolean;
  }