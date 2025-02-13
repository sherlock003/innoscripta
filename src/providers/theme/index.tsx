'use client';

import {
  createTheme,
  ThemeProvider as ThemeProviderMUI,
} from '@mui/material/styles';
import { JSX, memo, ReactNode } from 'react';

const lightTheme = createTheme({
  typography: {
    htmlFontSize: 18,
  },
  palette: {
    primary: {
      dark: '#000',
      main: '#000',
      light: '#333333',
    },
  },
});

type Props = {
  children: JSX.Element | ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  return <ThemeProviderMUI theme={lightTheme}>{children}</ThemeProviderMUI>;
};

export default memo(ThemeProvider);
