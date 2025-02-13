'use client';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { FormEvent, memo, useState } from 'react';

import { IconButton, useTheme } from '@mui/material';

type Props = {
  onSubmit?: (search: string) => void;
};

const SearchBar = ({ onSubmit: onFormSubmit }: Props) => {
  const theme = useTheme();
  const [search, setSearch] = useState<string>('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) onFormSubmit?.(search);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        borderRadius: 24,
        border: '1px solid',
        borderColor: theme.palette.divider,
      }}
      onSubmit={onSubmit}
    >
      <InputBase
        type="search"
        sx={{ ml: 1, flex: 1, pr: 1.5 }}
        size="medium"
        placeholder="What is on your mind?"
        inputProps={{ 'aria-label': 'search news' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton
        type="submit"
        disabled={!search}
        sx={{ p: '8px' }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default memo(SearchBar);
