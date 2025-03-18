import { ILogin } from "@shared/components/auth/login/interfaces/IAuth";

export interface INestedMenuItem {
  id?: string;
  label: string;
  route: string;
  icon?: string;
  children?: INestedMenuItem[];
}

export interface NestedDropdownProps {
  items?: INestedMenuItem[];
  level: number;
  isCollapsed: boolean;
  onCloseSidebar?: () => void; 

}
export interface NavbarProps {
  toggleSidebar: () => void;
  user: ILogin | null;
}