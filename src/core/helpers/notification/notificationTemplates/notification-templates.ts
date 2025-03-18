import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import { formatTimestamp } from '@shared/utils/util';
import { INotificationBody, NotificationType } from '../interface/INotification';
import { APP_CONSTANTS } from '@shared/constant/app.constant';
import { NotificationEnum } from '@shared/constant/app-enum';

export class NotificationTemplates {
  static getNotificationMessage(type: NotificationType, user: ILogin, data: INotificationBody, action: string): string {
    const timestamp = formatTimestamp();

    switch (type) {
      case NotificationEnum?.ATTENDANCE:
        return `${data?.notificationType}: Attendance for the ${data?.className} Class was taken by ${user?.username} on ${timestamp}.`;

      case NotificationEnum?.LECTURE_SLIDES:
        return `${data?.notificationType}: ${user?.username} has ${action!} the attendance slides in ${data?.className} on ${timestamp}.`;

      case NotificationEnum?.HOMEWORK_SHEET:
        return `${data?.notificationType}: ${user?.username} has send a file named ${data?.fileName} in ${data?.className} on ${timestamp}.`;

      case NotificationEnum?.TEST_SHEET:
        return `${data?.notificationType}: ${user?.username} has send a file named ${data?.fileName} in ${data?.className} on ${timestamp}.`;

      case NotificationEnum?.HOMEWORK_TASK:
        return `${data?.notificationType}: ${user?.username} has ${data?.isRedo ? 'a Redo of your' : 'submitted'} homework file titled ${data?.fileName ?? 'No File Name'} in ${data?.isRedo ? '' : data?.batchName} on ${timestamp}.`;

      case NotificationEnum?.TEST_TASK:
        switch (data?.notificationType) {
          case APP_CONSTANTS.TEST_NOTIFICATION.TEST_SUBMIT:
            return `${data?.notificationType}: ${user?.username} has submitted a Test file${data?.fileName ? ` titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.TEACHER_COMMENT:
            return `${data?.notificationType}: ${user?.username} has added a comment${data?.fileName ? ` on Test file titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.REDO_SENT:
            return `${data?.notificationType}: ${user?.username} has requested a redo${data?.fileName ? ` for Test file titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.DOUBT_SENT:
            return `${data?.notificationType}: ${user?.username} has raised a doubt${data?.fileName ? ` on Test file titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.APPROVED:
            return `${data?.notificationType}: ${user?.username} has approved the Test file${data?.fileName ? ` titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.COMPLETED:
            return `${data?.notificationType}: ${user?.username} has marked the Test as completed${data?.fileName ? ` for file titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.REDO_SUBMITTED:
            return `${data?.notificationType}: ${user?.username} has resubmitted the Test file${data?.fileName ? ` titled ${data.fileName}` : ''} after redo request in ${data?.batchName} on ${timestamp}.`;

          case APP_CONSTANTS.TEST_NOTIFICATION.DOUBT_SUBMITTED:
            return `${data?.notificationType}: ${user?.username} has submitted a doubt clarification${data?.fileName ? ` for Test file titled ${data.fileName}` : ''} in ${data?.batchName} on ${timestamp}.`;

          default:
            return `${data?.notificationType}: Action by ${user?.username} on ${timestamp}.`;
        }

      case 'FileUpload':
        return `${data?.notificationType}: ${user?.username} has sent a file named ${data?.fileName} in ${data?.className} on ${timestamp}.`;

      case 'Topic':
        return `${user?.username} has ${action} a Topic ${data?.name} in ${data?.subjectName} on ${timestamp}.`;

      case 'SubTopic':
        return `A SubTopic named ${data?.name} Relation has been ${action} by ${user?.username} in the ${data?.topicName} Topic of the ${data?.subjectName} subject on ${timestamp}.`;

      case 'Class':
        return `${user?.username} has ${action} a Class ${data?.name}, on ${timestamp}.`;

      case 'Batch':
        return `A batch, ${data?.name}, has been ${action} by ${user?.username} for the ${data?.className}, on ${timestamp}.`;

      case 'Class Event':
        return `A Event, ${data?.name}, has been ${action} by ${user?.username} for the ${data?.className}, on ${timestamp}.`;

      case 'Topic Class Mapping':
        return `A topic mapping, including the topics ${data.topicName}, has been ${action} by ${user.username} for the class ${data.className}, on ${timestamp}.`;

      case 'Course Video':
        return `A course tutorial mapping, including the topics ${data.topicName}, has been ${action} by ${user.username} for the class ${data.className}, on ${timestamp}.`;

      case 'Tutorial':
        return `A video named ${data?.videoName}, was ${action} by ${user?.username}, for Topic ${data?.topicName} on ${timestamp}.`;

      case 'HomeWork':
        return `A document, ${data?.resource}, has been ${action} for the ${data?.topicName} topic.`;

      case 'Test':
        return `${data?.message}`;

      case 'Tag':
        return `A Tag ${data?.name} has been ${action} by ${user?.username}, on ${timestamp}.`;

      case 'TestLevel':
        return `A Test Level ${data?.name} has been ${action} by ${user?.username}, on ${timestamp}.`;

      case 'Teacher Assigned':
        return `Teacher ${data.teacherName} has added in the ${data.className} Class by ${user.username} on ${timestamp}.`;

      default:
        return `${type}: Action by ${user?.username} on ${timestamp}.`;
    }
  }
}
