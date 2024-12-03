export interface IApiResponse<T> {
  error: Error | null;
  data: Array<T> | T | null;
};