'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';

export function TopBar() {
  const t = useTranslations('common');

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }} noWrap>
          {t('appName')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LanguageToggle />
          <IconButton
            color="inherit"
            onClick={() => signOut({ callbackUrl: '/' })}
            size="small"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
