import { ApiMethod, IdNameType } from '@shared/types/app.type';
import { BaseNotificationService } from '../base.notification.service';
import { INotification, NotificationType } from '../interface/INotification';
import { getActionFromMethod } from '@shared/utils/util';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { NotificationTemplates } from '../notificationTemplates/notification-templates';

export class MasterNotificationService extends BaseNotificationService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  generateLogMessage(user: ILogin, method: ApiMethod, data: IdNameType, relatedEntity: NotificationType): INotification {
    const action = getActionFromMethod(method);

    const message = NotificationTemplates.getNotificationMessage(relatedEntity, user, data, action);

    return {
      content: message,
      dateSent: new Date(),
      recipientId: [],
      senderId: user.id!,
      relatedEntity: relatedEntity,
      type: 'Master'
    };
  }
}
