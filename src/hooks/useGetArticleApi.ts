/**
 * @module useGetArticles
 * @category Hooks
 *
 */

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ArticleSource } from '@/enums/article.enums';
import {
  useLazyGetGuardianApiQuery,
  useLazyGetNewsApiQuery,
  useLazyGetNYTApiQuery,
} from '@/rtk/article/apiSlice';
import { selectSourceState } from '@/rtk/article/slice';
import { ArticleResponse } from '@/types/article';

import { FilterQuery } from '@/types/common';

const useGetArticles = () => {
  const source = useSelector(selectSourceState);
  const [getNYTApiArticle, nytState] = useLazyGetNYTApiQuery();
  const [getNewsApiArticle, newsApiState] = useLazyGetNewsApiQuery();
  const [getGuardianApiArticle, guardianState] = useLazyGetGuardianApiQuery();

  const getArticles = useCallback(
    async (query: FilterQuery): Promise<ArticleResponse> => {
      if (source === ArticleSource.GUARDIAN) {
        return await getGuardianApiArticle(query).unwrap();
      }

      if (source === ArticleSource.NEWYORKTIMES) {
        return await getNYTApiArticle(query).unwrap();
      }

      return await getNewsApiArticle(query).unwrap();
    },
    [getNewsApiArticle, getNYTApiArticle, getGuardianApiArticle, source],
  );

  const state = useMemo(() => {
    if (source === ArticleSource.GUARDIAN) return guardianState;
    if (source === ArticleSource.NEWYORKTIMES) return nytState;
    return newsApiState;
  }, [source, guardianState, nytState, newsApiState]);

  return { getArticles, ...state };
};

export default useGetArticles;
