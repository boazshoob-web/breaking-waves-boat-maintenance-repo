'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { Link } from '@/i18n/navigation';

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn('phone-credentials', {
        phone,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError(t('auth.invalidCredentials'));
      } else {
        router.push(`/${locale}/issues`);
        router.refresh();
      }
    } catch {
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const otherLocale = locale === 'he' ? 'en' : 'he';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Link href="/auth/login" locale={otherLocale}>
          <IconButton size="small">
            <TranslateIcon />
          </IconButton>
        </Link>
      </Box>

      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        {t('auth.loginTitle')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('auth.loginSubtitle')}
      </Typography>

      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label={t('auth.phone')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoFocus
              type="tel"
              sx={{ mb: 2 }}
            />
            <TextField
              label={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : t('auth.login')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
