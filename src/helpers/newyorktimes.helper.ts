import { Article } from '@/types/article';
import { FilterQuery } from '@/types/common';
import { NYTArticle, NYTQuery } from '@/types/newyorktimes';

export function transformNytArticle(data: NYTArticle[]): Article[] {
  return data.map((item: NYTArticle): Article => {
    let author = '',
      imageUrl = '';

    if (item.byline.person.length > 0) {
      const person = item.byline.person[0];
      author = `${person.firstname} ${person.lastname}`;
    }

    if (item.multimedia.length > 0) {
      imageUrl = `${process.env.NEXT_PUBLIC_NEWYORKTIMES_IMAGE_URL}/${item.multimedia[0].url}`;
    }

    return {
      content: item.abstract,
      id: '',
      imageUrl,
      publishedAt: item.pub_date,
      slug: '',
      author,
      summary: item.snippet,
      title: item.headline.main,
      url: item.web_url,
    };
  });
}

export function transformNYTQuery(query: FilterQuery): NYTQuery {
  return {
    begin_date: query.from,
    end_date: query.to,
    sort: query.sortBy,
    page: query.page,
    q: query.q,
  };
}
