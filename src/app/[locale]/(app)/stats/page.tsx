'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useStats } from '@/hooks/api/useStatsQueries';
import { SeverityChart } from '@/components/stats/SeverityChart';
import { TeamChart } from '@/components/stats/TeamChart';
import { OpenPeriodChart } from '@/components/stats/OpenPeriodChart';

export default function StatsPage() {
  const t = useTranslations('stats');
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" fontWeight={700}>
        {t('title')}
      </Typography>
      <SeverityChart data={data.bySeverity} />
      <TeamChart data={data.byTeam} />
      <OpenPeriodChart data={data.byOpenPeriod} />
    </Box>
  );
}
