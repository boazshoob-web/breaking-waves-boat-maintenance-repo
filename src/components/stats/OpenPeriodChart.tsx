'use client';

import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslations } from 'next-intl';

const PERIOD_ORDER = ['< 1 week', '1-2 weeks', '2-4 weeks', '1-3 months', '3+ months'];

interface OpenPeriodChartProps {
  data: { name: string; value: number }[];
}

export function OpenPeriodChart({ data }: OpenPeriodChartProps) {
  const t = useTranslations('stats');
  const tp = useTranslations('stats.periods');

  // Sort by period order and translate labels
  const sorted = PERIOD_ORDER
    .map((period) => {
      const match = data.find((d) => d.name === period);
      return { name: tp(period), value: match?.value || 0 };
    })
    .filter((d) => d.value > 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {t('byOpenPeriod')}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sorted} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={11} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#00897b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
