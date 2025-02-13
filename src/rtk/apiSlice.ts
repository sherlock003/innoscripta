/**
 * @module RTKConfig
 * @category Utils
 *
 */

import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import type { ApiErrorResponse, AxiosErrorResponse } from '@/types/common';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const transformErrorResponse = (
  response: AxiosErrorResponse,
): ApiErrorResponse => {
  toast.error(response.message);

  if (response.code === AxiosError.ERR_NETWORK) {
    return {
      success: false,
      message:
        "We're having trouble reaching the server. Please try again later.",
      status: response.status,
    };
  }

  if (response.code === AxiosError.ETIMEDOUT) {
    return {
      success: false,
      message:
        'The server is taking too long to respond. Please try again later.',
      status: response.status,
    };
  }

  if (response.code === AxiosError.ERR_INVALID_URL) {
    return {
      success: false,
      message:
        'An error occurred while processing your request. Please contact support.',
      status: response.status,
    };
  }

  if (response.message === 'Network Error') {
    return {
      success: false,
      message:
        "Can't connect to the server. Please check your internet connection.",
      status: response.status,
    };
  }

  return {
    success: false,
    message: 'Something went wrong. Please try again later.',
    status: response.status,
  };
};

export const axiosPrivate = axios.create({
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    headers?: AxiosRequestConfig['headers'];
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> = async (args) => {
  try {
    const result = await axiosPrivate(args);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        code: err.code,
        status: err.response?.status,
        message: err.message,
        data: err.response?.data,
      },
    };
  }
};

export const api = createApi({
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
  tagTypes: ['ARTICLES'],
  refetchOnReconnect: true,
  refetchOnFocus: false, // we don't want to refetch on focus because it will cause a lot of request
  refetchOnMountOrArgChange: 86400, // 1 day to refetch again NOTE: this is not working on useLazyQuery
  reducerPath: 'RTK',
  keepUnusedDataFor: 60, // seconds
});

export default api;
