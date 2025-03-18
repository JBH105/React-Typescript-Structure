export interface IApiResponse<T> {
  message: string;
  success: boolean;
  count: number;
  data: T[] | T;
}
