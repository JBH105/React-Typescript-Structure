import { AlertType, NotificationType } from '../types/alert.type';

export interface INotificationProps {
  type: AlertType;
  message: string;
  messageHeader: string;
  duration?: number;
  position?: string;
  notificationType: NotificationType;
  onClose?: () => void;
  alertId: string;
  status: number;
}

export interface IToastProps {
  message: string;
  type: NotificationType;
  setOpen?: (value: boolean) => void;
  open?: boolean;
}
export interface IAlertProps {
  type: NotificationType;
  messageHeader: string;
  message: string | null | undefined;
  onClose?: () => void;
}
