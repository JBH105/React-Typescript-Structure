import { createContext, useCallback, useContext, useRef, useState } from 'react';
import CustomConfirmModal from './CustomConfirmModal';
import { ConfirmDialogProviderProps, IConfirmState } from '../interface/IConfirmDialogModal';

type ConfirmDialogContextType = (data: IConfirmState) => Promise<boolean>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ConfirmDialog = createContext<ConfirmDialogContextType>((_: IConfirmState) => Promise.resolve(true));


export function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [state, setState] = useState<IConfirmState>({
    open: false,
    icon: '',
    headerText: '',
    contentText: '',
    cancelButtonText: '',
    confirmButtonText: '',
    iconColor: '',
    showDeleteField: false,
    height: ''
  });

  const fn = useRef<(choice: boolean) => void>();

  const confirm = useCallback((data: IConfirmState) => {
    return new Promise<boolean>((resolve) => {
      setState({ ...data, open: true });
      fn.current = (choice: boolean) => {
        resolve(choice);
        setState({ open: false });
      };
    });
  }, []);

  return (
    <ConfirmDialog.Provider value={confirm}>
      {children}
      <CustomConfirmModal {...state} onClose={() => fn.current && fn.current(false)} onConfirm={() => fn.current && fn.current(true)} />
    </ConfirmDialog.Provider>
  );
}

export default function useConfirmDialog() {
  return useContext(ConfirmDialog);
}
