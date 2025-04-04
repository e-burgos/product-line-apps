/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo } from 'react';
import {
  MutationKey,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrls } from './apiUrls';
import { ApiErrorResponses, ApiResponses } from './types/apiTypes';
import { useToastStore } from '@product-line/ui';
import { dexieDbUrl } from '../const';
import { useTokenStore } from './store/use-token-store';

const axiosInit = () => {
  const axiosInstance = axios.create({
    baseURL: `${dexieDbUrl}`,
  });
  return axiosInstance;
};

export const axiosInstance = axiosInit();

export function apiRequest<Type extends keyof ApiResponses>(
  id: Type,
  axiosOptions?: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponses[Type]>> {
  return axiosInstance.request({
    url: apiUrls[id],
    ...axiosOptions,
  });
}

interface IQueryMessage {
  title: string;
  message?: string;
}

type ApiType = keyof ApiResponses & keyof ApiErrorResponses;

interface IApiQueryParams<Type extends ApiType> {
  id: Type;
  keys?: unknown[];
  auth?: 'jwt' | 'none';
  queryOptions?: Omit<
    UseQueryOptions<
      AxiosResponse<ApiResponses[Type]>,
      AxiosError<ApiErrorResponses[Type]>,
      AxiosResponse<ApiResponses[Type]>,
      QueryKey[]
    >,
    'queryKey' | 'queryFn'
  >;
  axiosOptions?: AxiosRequestConfig;
  errorMessage?: IQueryMessage;
  successMessage?: IQueryMessage;
}

export function useApiQuery<Type extends ApiType>(
  params: IApiQueryParams<Type>
): UseQueryResult<
  AxiosResponse<ApiResponses[Type]>,
  AxiosError<ApiErrorResponses[Type]>
> {
  const {
    id,
    auth = 'jwt',
    keys,
    queryOptions,
    axiosOptions,
    errorMessage,
    successMessage,
  } = params;
  const { tokenData } = useTokenStore();
  const token = tokenData?.accessToken;
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const dependencies = useMemo<QueryKey[]>(
    // @ts-ignore
    () => (keys ? [id, ...keys] : [id]),
    [id, keys]
  );

  const query = useQuery({
    queryKey: dependencies,
    queryFn: () => {
      return axiosInstance.request({
        url: apiUrls[id],
        ...axiosOptions,
        headers: {
          Authorization: auth === 'jwt' ? `Bearer ${token}` : undefined,
          ...axiosOptions?.headers,
        },
      });
    },
    ...queryOptions,
  });

  if (query?.isError && query.error?.response?.status === 403) {
    navigate('/403');
  }

  useEffect(() => {
    if (query?.isError && errorMessage?.title) {
      addToast({
        id: 'api-error',
        variant: 'destructive',
        title: errorMessage.title || 'Error',
        message:
          errorMessage?.message ||
          query?.error?.response?.data?.message ||
          // @ts-ignore
          query?.error?.response?.data?.error ||
          '',
      });
    }
    if (query?.isSuccess && successMessage?.title) {
      addToast({
        id: 'api-success',
        variant: 'success',
        title: successMessage.title || 'Success',
        message: successMessage.message || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.isError, query?.isSuccess]);

  return query;
}

interface IApiMutationParams<Type extends ApiType> {
  id: Type;
  keys?: MutationKey;
  auth?: 'jwt' | 'none';
  mutationOptions?: Omit<
    UseMutationOptions<
      AxiosResponse<ApiResponses[Type]>,
      AxiosError<ApiErrorResponses[Type]>,
      AxiosResponse<ApiResponses[Type]>,
      MutationKey
    >,
    'mutationKey' | 'mutationFn'
  >;
  axiosOptions?: AxiosRequestConfig;
  invalidateQueries?: string[];
  invalidateQueriesByIds?: ApiType[];
  invalidateQueriesDelay?: number;
  errorMessage?: IQueryMessage;
  successMessage?: IQueryMessage;
}

export function useApiMutation<Type extends ApiType>(
  params: IApiMutationParams<Type>
): UseMutationResult<
  AxiosResponse<ApiResponses[Type]>,
  AxiosError<ApiErrorResponses[Type]>
> {
  const {
    id,
    keys,
    auth = 'jwt',
    mutationOptions,
    axiosOptions,
    errorMessage,
    successMessage,
    invalidateQueries,
    invalidateQueriesByIds,
    invalidateQueriesDelay = 0,
  } = params;
  const { tokenData } = useTokenStore();
  const token = tokenData?.accessToken;
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const dependencies = useMemo<QueryKey[]>(
    // @ts-ignore
    () => (keys ? [id, ...keys] : [id]),
    [id, keys]
  );

  // @ts-ignore
  return useMutation({
    mutationKey: dependencies,
    mutationFn: (mutationAxiosOptions) => {
      return axiosInstance.request({
        url: apiUrls[id],
        ...axiosOptions,
        ...(mutationAxiosOptions as AxiosRequestConfig),
        headers: {
          Authorization: auth === 'jwt' ? `Bearer ${token}` : undefined,
          ...axiosOptions?.headers,
          ...(mutationAxiosOptions as AxiosRequestConfig)?.headers,
        },
      });
    },
    ...mutationOptions,
    onError: (error, variables, context) => {
      if (errorMessage?.title)
        addToast({
          id: 'api-error',
          variant: 'destructive',
          title: errorMessage.title || 'Error',
          message:
            errorMessage?.message ||
            error?.response?.data?.message ||
            // @ts-ignore
            error?.response?.data?.error ||
            '',
        });
      mutationOptions?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (invalidateQueries?.length) {
        setTimeout(() => {
          for (const query of invalidateQueries)
            queryClient.invalidateQueries({ queryKey: [query] });
        }, invalidateQueriesDelay);
      }
      if (invalidateQueriesByIds?.length) {
        setTimeout(() => {
          for (const query of invalidateQueriesByIds)
            queryClient.invalidateQueries({ queryKey: [query] });
        }, invalidateQueriesDelay);
      }
      if (successMessage?.title)
        addToast({
          id: 'api-success',
          variant: 'success',
          title: successMessage?.title || 'Success',
          message: successMessage?.message || '',
        });
      mutationOptions?.onSuccess?.(data, variables, context);
    },
  });
}
