'use client';

import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import SearchBar from '@/components/SearchBar';
import { paths } from '@/utils/routes';

export default function RootPage() {
  const router = useRouter();

  const onSubmit = (search: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('q', search);
    router.push(`${paths.articles}?${searchParams.toString()}`);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 3,
          minHeight: 'calc(100vh - 68px)',
        }}
      >
        <Box mb={3}>
          <Typography variant="h3">Search News</Typography>
        </Box>

        <SearchBar onSubmit={onSubmit} />
      </Box>
    </Container>
  );
}
