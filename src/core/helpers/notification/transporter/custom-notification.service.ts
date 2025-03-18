import { ApiMethod } from '@shared/types/app.type';
import { BaseNotificationService } from '../base.notification.service';
import { IGenerateLog, INotification } from '../interface/INotification';
import { formatTimestamp, getActionFromMethod } from '@shared/utils/util';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { TmsNotificationType } from '../enum/notification-type.enum';

export class CustomNotificationService extends BaseNotificationService {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  generateLogMessage(user: ILogin, method: ApiMethod, data: IGenerateLog): INotification {
    getActionFromMethod(method);
    const isCustom = data?.isCustom ?? true;
    return {
      content: `${data?.content} ${isCustom ? 'by' : ''} ${isCustom ? user.username : ''}${isCustom ? ` (Role: ${user.role.name})` : ''} on ${formatTimestamp()}.`,
      dateSent: new Date(),
      recipientId: data?.recipientId || [],
      senderId: user.id!,
      relatedEntity: data.relatedEntity!,
      type: data?.notificationType ?? TmsNotificationType.Master
    };
  }
}
