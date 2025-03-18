import { config } from '@config/config';

export class ApiEndpoint {
  static MASTER = 'masters';
  static NOTIFICATION = 'notification';

  static get epbaseUrl() {
    return `${config.API_EPBASE_URL}/api`;
  }
  static get tmsbaseUrl() {
    return `${config.API_TMSBASE_URL}/api`;
  }
  static get notification() {
    return `${this.tmsbaseUrl}/${this.NOTIFICATION}`;
  }
  static get permission() {
    return `${this.epbaseUrl}/auth/permission`;
  }
  static get role() {
    return `${this.epbaseUrl}/${this.MASTER}/roles`;
  }
  static get auth() {
    return `${this.epbaseUrl}/auth/login`;
  }
}