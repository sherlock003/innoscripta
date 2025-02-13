'use client';

import { memo } from 'react';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 24,
    position: 'relative',
    backgroundColor: '#FCFCFC',
    border: '1px solid',
    borderWidth: 2,
    borderColor: '#cdcdcd',
    fontSize: 16,
    padding: '10px 20px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover, &:focus': {
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));

export default memo(Input);
