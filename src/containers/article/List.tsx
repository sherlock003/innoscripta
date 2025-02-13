'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

import { QueryParams } from '@/types/common';

import ArticleListItem from '@/containers/article/ListItem';
import useGetArticles from '@/hooks/useGetArticleApi';

type Props = QueryParams & {
  onPaginationChange?: (page: number) => void;
};

const ArticleList = ({
  article,
  end,
  from,
  page,
  sortBy,
  onPaginationChange,
}: Props) => {
  const { getArticles, data: response } = useGetArticles();

  const currentPage = useMemo(() => (page ? parseInt(page) : 1), [page]);

  const fetchApi = useCallback(async () => {
    if (article) {
      await getArticles({
        q: article,
        pageSize: DEFAULT_PAGE_SIZE,
        page: currentPage,
        from: from ?? undefined,
        to: end ?? undefined,
        sortBy: sortBy ?? undefined,
      });
    }
  }, [article, end, from, sortBy, currentPage, getArticles]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const articles = useMemo(() => response?.data, [response?.data]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPaginationChange?.(value);
  };

  if (articles) {
    if (articles.length > 0) {
      return (
        <>
          <Box sx={{ py: 2 }}>
            {articles.map((item) => (
              <ArticleListItem key={item.title} item={item} />
            ))}
          </Box>

          <Pagination
            page={currentPage}
            count={response?.totalPages}
            color="primary"
            siblingCount={2}
            boundaryCount={3}
            onChange={handleChange}
          />
        </>
      );
    }

    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ my: 3, p: 3, minHeight: 300 }}
      >
        <Box mb={1}>
          <SearchIcon color="disabled" sx={{ width: 80, height: 80 }} />
        </Box>
        <Typography variant="h5" textAlign="center" color="textSecondary">
          No news found. Try refining your search terms.
        </Typography>
      </Stack>
    );
  }

  return null;
};

export default memo(ArticleList);
