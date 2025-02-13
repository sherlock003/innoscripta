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
  from = '',
  end = '',
  sortBy,
  onFilter,
}: Props) => {
  const sortRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [fieldEnd, setFieldEnd] = useState(end);
  const [fieldFrom, setFieldFrom] = useState(from);
  const [fieldSort, setFieldSort] = useState(sortBy ?? SortBy.RELEVANCE);
  const [advancedFilter, setAdvancedFilter] = useState(false);

  const toggleAdvanceFilter = () => {
    setAdvancedFilter((prevState) => !prevState);
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter?.({
      article: searchRef.current?.value,
      from: fieldFrom ? new Date(fieldFrom).toISOString() : undefined,
      end: fieldEnd ? new Date(fieldEnd).toISOString() : undefined,
      sortBy: fieldSort,
    });
  };

  return (
    <form noValidate onSubmit={onSearch}>
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
                <Select
                  value={fieldSort}
                  inputRef={sortRef}
                  onChange={(event) =>
                    setFieldSort(event.target.value as SortBy)
                  }
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
                    disableFuture
                    value={from ? new Date(from) : null}
                    onChange={(newValue: string) => setFieldFrom(newValue)}
                    slotProps={{
                      textField: { fullWidth: true },
                      field: {
                        clearable: true,
                        onClear: () => setFieldFrom(''),
                      },
                    }}
                  />
                </StackItem>
                <StackItem flex={1}>
                  <Datepicker
                    label="End date"
                    disableFuture
                    value={end ? new Date(end) : null}
                    onChange={(newValue: string) => setFieldEnd(newValue)}
                    slotProps={{
                      textField: { fullWidth: true },
                      field: {
                        clearable: true,
                        onClear: () => setFieldEnd(''),
                      },
                    }}
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
