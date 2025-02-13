import { SortBy } from '@/enums/common.enums';

export type ApiErrorResponse = {
  success: boolean;
  message: string;
  status?: string | number;
};

export type AxiosErrorResponse = {
  code?: string;
  status?: string | number;
  message: string;
};

export type FilterQuery = {
  q?: string;
  page: number;
  pageSize: number;
  sortBy?: SortBy;
  from?: string;
  to?: string;
};

export type QueryParams = {
  article?: string | null;
  from?: string | null;
  end?: string | null;
  page?: string | null;
  sortBy?: SortBy | null;
};
