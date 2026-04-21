'use client';

import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslations } from 'next-intl';

const COLORS: Record<string, string> = {
  CRITICAL: '#d32f2f',
  WARNING: '#ed6c02',
  INFO: '#0288d1',
};

interface SeverityChartProps {
  data: { name: string; value: number }[];
}

export function SeverityChart({ data }: SeverityChartProps) {
  const t = useTranslations('issues.severities');
  const ts = useTranslations('stats');

  const chartData = data.map((d) => ({
    ...d,
    label: t(d.name),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {ts('bySeverity')}
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
