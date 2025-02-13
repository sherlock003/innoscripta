/**
 * @module ArticleEndpoints
 * @category RTK Endpoints
 *
 */

import {
  transformGuardianArticle,
  transformGuardianQuery,
} from '@/helpers/guardian.helper';
import {
  transformNewsApiArticle,
  transformSortBy,
} from '@/helpers/newsapi.helper';
import {
  transformNytArticle,
  transformNYTQuery,
} from '@/helpers/newyorktimes.helper';
import api, { transformErrorResponse } from '@/rtk/apiSlice';
import { ArticleResponse } from '@/types/article';

import { AxiosErrorResponse, FilterQuery } from '@/types/common';
import { GuardianQueryString, GuardianResponse } from '@/types/guardian';
import { NewsAPIQueryString, NewsAPIResponse } from '@/types/newsapi';
import { NYTArticleResponse, NYTQuery } from '@/types/newyorktimes';
import { AxiosResponse } from 'axios';

export const articleApiSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNewsApi: builder.query<ArticleResponse, FilterQuery>({
      query: (query) => {
        const params: NewsAPIQueryString = {
          ...query,
          sortBy: transformSortBy(query.sortBy),
        };
        return {
          url: process.env.NEXT_PUBLIC_NEWS_API_URL as string,
          params: { ...params, apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY },
          method: 'GET',
        };
      },
      providesTags: [{ type: 'ARTICLES' }],
      transformResponse: (response: NewsAPIResponse, _meta, arg) => ({
        status: response.status,
        page: arg.page,
        pageSize: arg.pageSize,
        totalPages: Math.ceil(response.totalResults / arg.pageSize),
        totalResults: response.totalResults,
        data: transformNewsApiArticle(response.articles),
      }),
      transformErrorResponse: (response: AxiosResponse<AxiosErrorResponse>) => {
        transformErrorResponse(response?.data as AxiosErrorResponse);
      },
    }),
    getGuardianApi: builder.query<ArticleResponse, FilterQuery>({
      query: (query) => {
        const params: GuardianQueryString = transformGuardianQuery(query);
        return {
          url: process.env.NEXT_PUBLIC_GUARDIAN_API_URL as string,
          params: {
            ...params,
            'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
          },
          method: 'GET',
        };
      },
      providesTags: [{ type: 'ARTICLES' }],
      transformResponse: ({ response }: GuardianResponse) => ({
        status: response.status,
        page: response.currentPage,
        pageSize: response.pageSize,
        totalPages: response.pages,
        totalResults: response.total,
        data: transformGuardianArticle(response.results),
      }),
      transformErrorResponse,
    }),
    getNYTApi: builder.query<ArticleResponse, FilterQuery>({
      query: (query) => {
        const params: NYTQuery = transformNYTQuery(query);
        return {
          url: process.env.NEXT_PUBLIC_NEWYORKTIMES_API_URL as string,
          params: {
            ...params,
            'api-key': process.env.NEXT_PUBLIC_NEWYORKTIMES_API_KEY,
          },
          method: 'GET',
        };
      },
      providesTags: [{ type: 'ARTICLES' }],
      transformResponse: (
        { status, response }: NYTArticleResponse,
        _meta,
        arg,
      ) => ({
        status,
        page: arg.page,
        pageSize: arg.pageSize,
        totalPages: Math.ceil(response.meta.hits / arg.pageSize),
        totalResults: response.meta.hits,
        data: transformNytArticle(response.docs),
      }),
      transformErrorResponse,
    }),
  }),
});

export const {
  useLazyGetNewsApiQuery,
  useLazyGetGuardianApiQuery,
  useLazyGetNYTApiQuery,
} = articleApiSlice;
