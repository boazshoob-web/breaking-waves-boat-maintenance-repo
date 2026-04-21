'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

export function createEmotionCache(direction: 'ltr' | 'rtl') {
  if (direction === 'rtl') {
    return createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
  }
  return createCache({ key: 'mui' });
}

export function EmotionCacheProvider({
  direction,
  children,
}: {
  direction: 'ltr' | 'rtl';
  children: React.ReactNode;
}) {
  const cache = React.useMemo(() => createEmotionCache(direction), [direction]);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
