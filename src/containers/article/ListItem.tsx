'use client';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { memo } from 'react';

import { Article } from '@/types/article';

type Props = {
  item: Article;
};

const ArticleListItem = ({ item }: Props) => {
  return (
    <Stack
      component={Paper}
      sx={{ flexDirection: { xs: 'column', sm: 'row' }, p: 2, mb: 1 }}
    >
      {item.imageUrl && (
        <Box
          sx={{
            width: { xs: '100%', sm: 160 },
            height: { sm: 104 },
            overflow: 'hidden',
            mr: 1,
          }}
        >
          <img
            style={{ width: '100%', borderRadius: 4 }}
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
        </Box>
      )}
      <Stack sx={{ flex: 1 }}>
        <Box sx={{ flex: 1, mb: 1 }}>
          <a href={item.url} target="_blank">
            <Typography variant="h6" component="p">
              {item.title}
            </Typography>
          </a>
          <Typography variant="caption" color="textSecondary">
            {item.url}
          </Typography>
          <Typography sx={{ mt: 2 }}>{item.summary}</Typography>
        </Box>

        <Divider />

        <Typography sx={{ mt: 1 }} variant="body2" fontWeight="500">
          {item.author ? `${item.author} - ` : ''}
          {format(new Date(item.publishedAt), 'LLL dd, yyyy, hh:ss b')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default memo(ArticleListItem);
