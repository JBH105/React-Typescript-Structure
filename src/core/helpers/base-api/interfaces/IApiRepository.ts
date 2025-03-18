export interface IApiRepository {
  get<T>(url: string, params?: object, errorMessage?: string): Promise<T>;
  post<T>(url: string, data?: object, errorMessage?: string): Promise<T>;
}
