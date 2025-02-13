export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
}

export type ArticleResponse = {
  status: string;
  totalResults: number;
  totalPages: number;
  pageSize: number;
  page: number;
  data: Article[];
};
