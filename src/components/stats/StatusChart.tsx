'use client';

import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslations } from 'next-intl';

const COLORS: Record<string, string> = {
  OPEN: '#d32f2f',
  IN_PROCESS: '#ed6c02',
  CLOSED: '#2e7d32',
  NON_ISSUE: '#9e9e9e',
  RE_OPENED: '#0288d1',
};

interface StatusChartProps {
  data: { name: string; value: number }[];
}

export function StatusChart({ data }: StatusChartProps) {
  const t = useTranslations('issues.statuses');
  const ts = useTranslations('stats');

  const chartData = data.map((d) => ({
    ...d,
    label: t(d.name),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {ts('byStatus')}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, value }: any) => `${name}: ${value}`}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#999'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
