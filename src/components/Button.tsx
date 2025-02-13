'use client';

import { Button as ButtonMUI, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

const Button = styled(ButtonMUI)<ButtonProps>({
  borderRadius: 24,
  padding: '8px 20px',
});

export default Button;
