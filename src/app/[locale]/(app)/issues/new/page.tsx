'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { IssueForm } from '@/components/issues/IssueForm';
import { useCreateIssue } from '@/hooks/api/useIssueQueries';

export default function NewIssuePage() {
  const t = useTranslations('issues');
  const router = useRouter();
  const createIssue = useCreateIssue();

  const handleSubmit = async (data: { description: string; handleBy: string }) => {
    await createIssue.mutateAsync(data);
    router.push('/issues');
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t('newIssue')}
      </Typography>
      <IssueForm onSubmit={handleSubmit} isSubmitting={createIssue.isPending} />
    </Box>
  );
}
