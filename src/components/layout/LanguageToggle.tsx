'use client';

import { IconButton, Typography } from '@mui/material';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === 'he' ? 'en' : 'he';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <IconButton color="inherit" onClick={toggleLocale} size="small">
      <Typography variant="body2" fontWeight={600}>
        {locale === 'he' ? 'EN' : 'HE'}
      </Typography>
    </IconButton>
  );
}
