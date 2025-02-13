import { SortBy } from '@/enums/common.enums';

export type NYTPerson = {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
};

export type NYTByline = {
  original: string;
  person: NYTPerson[];
  organization: string;
};

export type NYTKeyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
};

export type NYTHeadline = {
  main: string;
  kicker: string;
  content_kicker: string;
  print_headline: string;
  name: string;
  seo: string;
  sub: string;
};

export type NYTMultimedia = {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  // legacy: Record<string, any>;
  subType: string;
  crop_name: string;
};

export type NYTArticle = {
  web_url: string;
  snippet: string;
  abstract: string;
  print_page: number;
  print_section: string;
  source: string;
  lead_paragraph: string;
  multimedia: NYTMultimedia[];
  headline: NYTHeadline;
  keywords: NYTKeyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: NYTByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};

export type NYTQuery = {
  begin_date?: string;
  end_date?: string;
  page?: number;
  q?: string;
  sort?: SortBy;
};

export type NYTArticleResponse = {
  status: string;
  copyright: string;
  response: {
    docs: NYTArticle[];
    meta: {
      /**
       * Total items
       */
      hits: number;
      /**
       * Page (0 based)
       */
      offset: number;
      time: number;
    };
  };
};
