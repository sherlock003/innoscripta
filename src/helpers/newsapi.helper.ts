import { SortBy } from '@/enums/common.enums';
import { NewsAPISortBy } from '@/enums/newsapi.enums';
import { Article } from '@/types/article';
import { NewsAPI } from '@/types/newsapi';

export function transformNewsApiArticle(data: NewsAPI[]): Article[] {
  return data.map((item: NewsAPI) => ({
    content: item.content,
    id: '',
    imageUrl: item.urlToImage,
    publishedAt: item.publishedAt,
    slug: '',
    author: item.author,
    summary: item.description,
    title: item.title,
    url: item.url,
  }));
}

export function transformSortBy(sortBy?: SortBy): NewsAPISortBy | undefined {
  if (sortBy === SortBy.NEWEST) return NewsAPISortBy.PUBLISHED_AT;
  if (sortBy === SortBy.OLDEST) return NewsAPISortBy.POPULARITY;
  if (sortBy === SortBy.RELEVANCE) return NewsAPISortBy.RELEVANCY;
  return undefined;
}
