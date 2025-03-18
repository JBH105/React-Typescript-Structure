import axios from 'axios';
import { INotification } from './interface/INotification';
import { ApiMethod } from '@shared/types/app.type';
import { ILogin } from '@shared/components/auth/login/interfaces/IAuth';
import store, { RootState } from '@store/app.store';

export abstract class BaseNotificationService {
  constructor(private apiUrl?: string) { }
  protected async sendNotification(payload: object): Promise<void> {
    try {
      console.log(`Sending notification to ${this.apiUrl} with payload:`, payload);
      axios.post(this.apiUrl!, payload);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  abstract generateLogMessage(user: ILogin, method: ApiMethod, data: object, reassurance: string): INotification;

  public async log(method: ApiMethod, data: object, reassurance: string): Promise<void> {
    const state: RootState = store.getState();
    const user = state.user.data as unknown as ILogin;
    const logMessage = this.generateLogMessage(user, method, data, reassurance);
    await this.sendNotification(logMessage);
  }
}
