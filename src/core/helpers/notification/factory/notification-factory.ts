import { AttendanceNotificationService } from '../transporter/attendance-notification.service';
import { BaseNotificationService } from '../base.notification.service';
import { MasterNotificationService } from '../transporter/master-notification.service';
import { SubmissionNotificationService } from '../transporter/submission-notification.service';
import { TmsNotificationType } from '../enum/notification-type.enum';
import { ApiEndpoint } from '@shared/constant/app-endpoint';
import { CustomNotificationService } from '../transporter/custom-notification.service';

export class NotificationFactory {
  static create(type: TmsNotificationType, apiUrl: string = ApiEndpoint.notification): BaseNotificationService | null {
    switch (type) {
      case TmsNotificationType.Master:
        return new MasterNotificationService(apiUrl);
      case TmsNotificationType.Attendance:
        return new AttendanceNotificationService(apiUrl);
      case TmsNotificationType.Submission:
        return new SubmissionNotificationService(apiUrl);
      case TmsNotificationType.Custom:
        return new CustomNotificationService(apiUrl);
      default:
        return null;
    }
  }
}
