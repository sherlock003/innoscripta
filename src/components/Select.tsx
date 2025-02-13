'use client';

import * as React from 'react';

import Input from '@/components/Input';
import { Select as SelectMUI, SelectProps, styled } from '@mui/material';

const StyledSelect = styled(SelectMUI)({
  '&.Mui-focused .MuiSelect-select': {
    borderRadius: 24,
  },
});

const Select = (props: SelectProps) => {
  return <StyledSelect input={<Input />} {...props} />;
};

export default React.memo(Select);
