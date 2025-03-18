import { ApiMethod } from '@shared/types/app.type';
import { BaseNotificationService } from '../base.notification.service';
import { INotification, INotificationPayload, NotificationType } from '../interface/INotification';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { NotificationTemplates } from '../notificationTemplates/notification-templates';
import { getAttendanceActionFromMethod } from '@shared/utils/util';


export class AttendanceNotificationService extends BaseNotificationService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  generateLogMessage(user: ILogin, method: ApiMethod, data: INotificationPayload, reassurance: NotificationType): INotification {
    const action = getAttendanceActionFromMethod(method);

    const message = NotificationTemplates.getNotificationMessage(reassurance, user, data, action);
    return {
      content: message,
      dateSent: new Date(),
      recipientId: data?.recipientId ?? [],
      senderId: user.id!,
      relatedEntity: reassurance,
      type: 'Attendance'
    };
  }
}
