'use client';

import AppBar from '@/components/AppBar';
import ThemeProvider from '@/providers/theme';
import { persistor, store } from '@/rtk/configureStore';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AppBar />
                {children}
                <Toaster position="top-right" theme="dark" />
              </LocalizationProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
