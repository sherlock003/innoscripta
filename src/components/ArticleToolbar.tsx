'use client';

import { Box, BoxProps, MenuItem, Stack, styled } from '@mui/material';
import { FormEvent, memo, useRef, useState } from 'react';

import { SortBy } from '@/enums/common.enums';

import { QueryParams } from '@/types/common';

import Button from '@/components/Button';
import Datepicker from '@/components/Datepicker';
import Input from '@/components/Input';
import Select from '@/components/Select';
import SourceMenu from '@/components/SourceMenu';

const StackItem = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    width: 200,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

type Props = QueryParams & {
  onFilter?: (fields: QueryParams) => void;
};

const ArticleToolbar = ({
  article,
  author,
  from,
  end,
  sortBy,
  onFilter,
}: Props) => {
  const [advancedFilter, setAdvancedFilter] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLInputElement>(null);

  const toggleAdvanceFilter = () => {
    setAdvancedFilter((prevState) => !prevState);
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter?.({
      article: searchRef.current?.value,
      author: authorRef.current?.value,
      from: fromRef.current?.value,
      end: endRef.current?.value,
      sortBy: sortRef.current?.value as SortBy,
    });
  };

  return (
    <form onSubmit={onSearch}>
      <Stack
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: { sm: 'space-between' },
        }}
      >
        <Stack
          flex={1}
          flexWrap="wrap"
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Box>
            <Stack
              flexWrap="wrap"
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              <StackItem sx={{ width: { md: 300 } }}>
                <Input
                  fullWidth
                  placeholder="Search article"
                  defaultValue={article}
                  inputRef={searchRef}
                />
              </StackItem>

              <StackItem>
                <Input
                  fullWidth
                  placeholder="Author"
                  inputRef={authorRef}
                  defaultValue={author}
                />
              </StackItem>

              <StackItem>
                <Select
                  defaultValue={sortBy ?? SortBy.RELEVANCE}
                  inputRef={sortRef}
                  fullWidth
                >
                  <MenuItem disabled>
                    <em>Sort By</em>
                  </MenuItem>
                  {Object.values(SortBy).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </StackItem>
            </Stack>

            {advancedFilter && (
              <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <StackItem flex={1}>
                  <Datepicker
                    label="Start date"
                    defaultValue={from ? new Date(from) : null}
                    inputRef={fromRef}
                    disableFuture
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </StackItem>
                <StackItem flex={1}>
                  <Datepicker
                    label="End date"
                    defaultValue={end ? new Date(end) : null}
                    inputRef={endRef}
                    disableFuture
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </StackItem>
              </Stack>
            )}
          </Box>

          <Stack sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
            <StackItem sx={{ width: { sm: 160 } }}>
              <Button
                type="submit"
                disableElevation
                fullWidth
                variant="contained"
              >
                Search
              </Button>
            </StackItem>

            <StackItem sx={{ width: { sm: 160 } }}>
              <Button fullWidth onClick={toggleAdvanceFilter}>
                Advanced Filter
              </Button>
            </StackItem>
          </Stack>
        </Stack>

        <Box px={1} mb={1.5}>
          <SourceMenu />
        </Box>
      </Stack>
    </form>
  );
};

export default memo(ArticleToolbar);
