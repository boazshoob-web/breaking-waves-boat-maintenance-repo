'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FuelingForm } from '@/components/fueling/FuelingForm';
import { FuelingList } from '@/components/fueling/FuelingList';

export default function FuelingPage() {
  const t = useTranslations('fueling');

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t('title')}
      </Typography>
      <FuelingForm />
      <FuelingList />
    </Box>
  );
}
