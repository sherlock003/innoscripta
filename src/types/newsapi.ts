import { NewsAPISortBy } from '@/enums/newsapi.enums';

export type NewsAPISource = {
  id: string | null;
  name: string;
};

export type NewsAPI = {
  source: NewsAPISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

export type NewsAPIQueryString = {
  q?: string;
  searchIn?: string;
  sources?: string;
  domains?: string;
  exclusiveDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: NewsAPISortBy;
  pageSize?: number;
  page?: number;
};

export type NewsAPIResponse = {
  status: string;
  totalResults: number;
  articles: NewsAPI[];
};

export type NewsAPIResponseError = {
  code: string;
  message: string;
  status: string;
};
