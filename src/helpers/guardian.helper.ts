import { Article } from '@/types/article';
import { FilterQuery } from '@/types/common';
import { GuardianQueryString, GuardianResult } from '@/types/guardian';

export function transformGuardianArticle(data: GuardianResult[]): Article[] {
  return data.map((item: GuardianResult) => ({
    content: item.fields.bodyText,
    id: '',
    imageUrl: item.fields.thumbnail,
    publishedAt: item.webPublicationDate,
    slug: '',
    author: '',
    summary: item.fields.trailText,
    title: item.fields.headline,
    url: item.fields.shortUrl,
  }));
}

export function transformGuardianQuery(
  query: FilterQuery,
): GuardianQueryString {
  return {
    'from-date': query.from,
    'order-by': query.sortBy,
    'page-size': query.pageSize,
    'show-fields':
      'starRating,headline,thumbnail,short-url,publication,byline,trailText,bodyText,lastModified',
    'to-date': query.to,
    page: query.page,
    q: query.q,
  };
}
