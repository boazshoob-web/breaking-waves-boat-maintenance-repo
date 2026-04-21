'use client';

import { Chip } from '@mui/material';
import { useTranslations } from 'next-intl';

const statusColors: Record<string, 'error' | 'warning' | 'success' | 'default' | 'info'> = {
  OPEN: 'error',
  IN_PROCESS: 'warning',
  CLOSED: 'success',
  NON_ISSUE: 'default',
  RE_OPENED: 'info',
};

export function IssueStatusChip({ status }: { status: string }) {
  const t = useTranslations('issues.statuses');

  return (
    <Chip
      label={t(status)}
      color={statusColors[status] || 'default'}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  );
}
