// Define your API response data types
export type APIData<T> = {
  count: number;
  data: T | T[];
  statusCode: number;
};
