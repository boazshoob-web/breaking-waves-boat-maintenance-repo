'use client';

import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';

interface IssueFiltersProps {
  status: string;
  handleBy: string;
  onStatusChange: (status: string) => void;
  onHandleByChange: (handleBy: string) => void;
}

export function IssueFilters({
  status,
  handleBy,
  onStatusChange,
  onHandleByChange,
}: IssueFiltersProps) {
  const t = useTranslations('issues');

  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>{t('status')}</InputLabel>
        <Select
          value={status}
          label={t('status')}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">{t('all')}</MenuItem>
          <MenuItem value="OPEN">{t('statuses.OPEN')}</MenuItem>
          <MenuItem value="IN_PROCESS">{t('statuses.IN_PROCESS')}</MenuItem>
          <MenuItem value="CLOSED">{t('statuses.CLOSED')}</MenuItem>
          <MenuItem value="NON_ISSUE">{t('statuses.NON_ISSUE')}</MenuItem>
          <MenuItem value="RE_OPENED">{t('statuses.RE_OPENED')}</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>{t('handleBy')}</InputLabel>
        <Select
          value={handleBy}
          label={t('handleBy')}
          onChange={(e) => onHandleByChange(e.target.value)}
        >
          <MenuItem value="">{t('all')}</MenuItem>
          <MenuItem value="INTERNAL">{t('handleByOptions.INTERNAL')}</MenuItem>
          <MenuItem value="SERVICE_PROVIDER">{t('handleByOptions.SERVICE_PROVIDER')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
