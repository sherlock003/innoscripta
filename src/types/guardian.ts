import { SortBy } from '@/enums/common.enums';

export type GuardianField = {
  headline: string;
  trailText: string;
  byline: string;
  starRating: string;
  lastModified: string;
  publication: string;
  shortUrl: string;
  thumbnail: string;
  bodyText: string;
};

export type GuardianResult = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: GuardianField;
};

export type GuardianQueryString = {
  q?: string;
  'from-date'?: string;
  'show-fields'?: string;
  'to-date'?: string;
  'order-by'?: SortBy;
  page?: number;
  'page-size'?: number;
};

export type GuardianResponse = {
  response: {
    status: string;
    total: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    id: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webUrl: string;
    apiUrl: string;
    results: GuardianResult[];
  };
};
