import { ReactNode } from "react";

export interface CustomConfirmModalProps {
  open: boolean;
  onClose: () => void;
  icon?: string;
  headerText?: string;
  contentText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  iconColor?: string;
  showDeleteField?: boolean;
  height?: string;
}

export interface IConfirmState {
  open: boolean;
  icon?: string;
  headerText?: string;
  contentText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  iconColor?: string;
  showDeleteField?: boolean;
  height?: string;
}

export interface ConfirmDialogProviderProps {
  children: ReactNode;
}
