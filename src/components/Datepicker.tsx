'use client';

import { memo } from 'react';

import { styled } from '@mui/material/styles';
import {
  DatePicker as DatepickerMui,
  DatePickerProps,
} from '@mui/x-date-pickers';

const StyledDatepicker = styled(DatepickerMui)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    lineHeight: 1,
    paddingLeft: '8px',
  },
  '& .MuiInputAdornment-positionEnd': {
    marginRight: '10px',
  },
  '& .MuiInputBase-root': {
    position: 'relative',
    backgroundColor: '#FCFCFC',
    borderColor: '#cdcdcd',
    borderRadius: 24,
    borderWidth: 2,
    width: 'auto',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
  '& .MuiInputBase-input': {
    padding: '12px 20px',
    fontSize: 16,
  },
}));

// @ts-expect-error: Typescript
const DatePicker = (props: DatePickerProps) => (
  <StyledDatepicker format="yyyy-MM-dd" {...props} />
);

export default memo(DatePicker);
