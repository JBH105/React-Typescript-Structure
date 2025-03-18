import { IDynamicFieldData } from '@core/dynamicForm/interfaces/DynamicForm';
import { IdNameType } from '@shared/types/app.type';
import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

export interface IGlobalContextProps {
  deleteConfirm: boolean;
  setDeleteConfirm: (value: boolean) => void;
  restoreConfirm: boolean;
  setRestoreConfirm: (value: boolean) => void;
  setDrawerOpen: (value: boolean) => void;
  drawerOpen: boolean;
  archived: boolean;
  setArchived: (value: boolean) => void;
  baseRoute: string;
}

export const defaultValue: IGlobalContextProps = {
  deleteConfirm: false,
  setDeleteConfirm: () => {},
  restoreConfirm: false,
  setRestoreConfirm: () => {},
  archived: false,
  setArchived: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  baseRoute: ''
};
export interface GlobalProviderProps {
  children: ReactNode;
}
export interface Data {
  icon: JSX.Element;
  title: string;
  link?: string;
  count?: number | string;
}
export interface CardProps {
  cardData: Data[];
}

interface step {
  label: string;
}

export interface horizontalStepperProps {
  setpCount: string;
  stepper: number;
  steps: step[];
  handleStep?: ((value: number) => void) | undefined;
}

export interface GlobalContextType {
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
}

export interface HeaderProps {
  toggleSidebar: boolean;
}

export interface SidebarProps {
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
}

export interface ImageComponentProps {
  field: IDynamicFieldData;
  setFieldValue: (field: string, value: File | undefined | (string | File)[], shouldValidate?: boolean) => void;
  value?: { [key: string]: (File | string)[] };
  name?: string;
}

export interface VideoComponentProps {
  field: IDynamicFieldData;
  setFieldValue: (field: string, value: File | undefined | (string | File)[], shouldValidate?: boolean) => void;
  value?: { [key: string]: (File | string)[] };
  name?: string;
}

export interface FileComponentProps {
  field: IDynamicFieldData;
  setFieldValue: (field: string, value: File | undefined | (string | File)[], shouldValidate?: boolean) => void;
  value?: { [key: string]: (File | string)[] };
  name?: string;
  handleOnChange?: (name: string, file: File) => void;
}

export interface selectComponentProps {
  field: IDynamicFieldData;
  setFieldValue?: SetFieldValueFunction;
  name?: string;
}
export interface selectDateRangePickerProps {
  field: IDynamicFieldData;
  setFieldValue?: SetFieldValueFunction | undefined;
  name?: string;
}
export interface SetFieldValueFunction {
  (fieldName: string, value: string[] | string | boolean | object | Dayjs | null | undefined | IdNameType[]): void;
}
export interface DynamicFormProps {
  field: IDynamicFieldData;
  setFieldValue?: SetFieldValueFunction;
  name?: string;
}

export interface IRoutreRole {
  Teacher: string;
  Supervisor: string;
  Student: string;
  Superadmin: string;
}
export interface GlobalContextProps {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}