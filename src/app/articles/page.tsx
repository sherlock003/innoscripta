'use client';

import { Box, Container, Toolbar, Typography, useTheme } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { SortBy } from '@/enums/common.enums';

import { QueryParams } from '@/types/common';

import ArticleToolbar from '@/components/ArticleToolbar';
import ArticleList from '@/containers/article/List';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queries = useMemo(
    (): QueryParams => ({
      article: searchParams.get('q'),
      end: searchParams.get('end'),
      from: searchParams.get('from'),
      page: searchParams.get('page'),
      sortBy: searchParams.get('sortBy') as SortBy | null | undefined,
    }),
    [searchParams],
  );

  const onPaginationChange = (page: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('page', page.toString());
    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  const onFilter = (fields: QueryParams) => {
    const queryParams = new URLSearchParams();
    if (fields.article) queryParams.set('q', fields.article);
    if (fields.from) queryParams.set('from', fields.from);
    if (fields.end) queryParams.set('end', fields.end);
    if (fields.sortBy) queryParams.set('sortBy', fields.sortBy);
    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <>
      <Toolbar sx={{ bgcolor: theme.palette.background.paper }} />
      <Box py={3} boxShadow={1} bgcolor={theme.palette.background.paper}>
        <Container maxWidth="lg">
          <ArticleToolbar {...queries} onFilter={onFilter} />

          {queries?.article && (
            <Box px={1} mt={2}>
              <Typography variant="h4">{`News about "${queries.article}"`}</Typography>
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box mb={2}>
          <ArticleList {...queries} onPaginationChange={onPaginationChange} />
        </Box>
      </Container>
    </>
  );
}
