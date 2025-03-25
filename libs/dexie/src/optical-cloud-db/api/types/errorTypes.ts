import { AxiosError } from 'axios';

export type ApiError = {
  message: string;
  error: string;
  statusCode: number;
};

export type ErrorResponse = AxiosError<ApiError>;
