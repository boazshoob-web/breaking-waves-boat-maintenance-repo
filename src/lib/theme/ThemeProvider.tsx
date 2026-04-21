'use client';

import * as React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './theme';
import { EmotionCacheProvider } from './EmotionCache';

export function AppThemeProvider({
  direction,
  children,
}: {
  direction: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  const theme = React.useMemo(() => createAppTheme(direction), [direction]);

  return (
    <EmotionCacheProvider direction={direction}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </EmotionCacheProvider>
  );
}
