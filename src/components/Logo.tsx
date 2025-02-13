'use client';

import { alpha, Box } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import Image from 'next/image';
import { memo } from 'react';

import logo from '@/images/innoscripta-logo.svg';

const Logo = () => {
  return (
    <Box
      py={1}
      px={2}
      sx={{ bgcolor: alpha(lightBlue[700], 0.64), borderRadius: 8 }}
    >
      <Image src={logo} width={120} alt="Logo" />
    </Box>
  );
};

export default memo(Logo);
