import { SelectOptionType } from '@core/dynamicForm/interfaces/DynamicForm';
import { BaseEntityDetail } from '@shared/types/app.type';

export interface ILogin extends BaseEntityDetail {
  roleId: string;
  accountId: string
  email: string;
  password: string;
  username: string;
  role: { name: string };
  authId: string;
  token: string;
  profileAvatar?: string;
}

export interface IUser {
  payload: {
    id: string;
  };
}
export interface IRole extends BaseEntityDetail {
  name: string;
  desc: string;
}

export interface ILoginState {
  data: ILogin | null;
  loading: boolean;
  error: string | null;
}

export interface IUserPermission {
  id: string;
  moduleName: string;
  accountId: string;
}

export interface LoginViewProps {
  roleOption: SelectOptionType[];
  handleSubmit: (values: ILogin) => Promise<void>;
}
