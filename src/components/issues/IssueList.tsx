'use client';

import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useIssues } from '@/hooks/api/useIssueQueries';
import { IssueCard } from './IssueCard';
import { IssueFilters } from './IssueFilters';
import { useRouter } from '@/i18n/navigation';

export function IssueList() {
  const t = useTranslations('issues');
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [handleBy, setHandleBy] = useState('');

  const filters = {
    ...(status && { status }),
    ...(handleBy && { handleBy }),
  };

  const { data: issues, isLoading } = useIssues(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <IssueFilters
        status={status}
        handleBy={handleBy}
        onStatusChange={setStatus}
        onHandleByChange={setHandleBy}
      />
      {!issues?.length ? (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
          {t('noIssues')}
        </Typography>
      ) : (
        issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => router.push(`/issues/${issue.id}/edit`)}
          />
        ))
      )}
    </Box>
  );
}
