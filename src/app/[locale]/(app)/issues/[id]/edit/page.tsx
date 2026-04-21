'use client';

import { Box, Typography, CircularProgress, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { IssueForm } from '@/components/issues/IssueForm';
import { useIssue, useUpdateIssue, useDeleteIssue } from '@/hooks/api/useIssueQueries';

export default function EditIssuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = useTranslations('issues');
  const tc = useTranslations('common');
  const router = useRouter();
  const { data: issue, isLoading } = useIssue(id);
  const updateIssue = useUpdateIssue();
  const deleteIssue = useDeleteIssue();

  if (isLoading || !issue) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (data: { description?: string; handleBy?: string; status?: string }) => {
    await updateIssue.mutateAsync({ id, ...data });
    router.push('/issues');
  };

  const handleDelete = async () => {
    if (window.confirm(tc('areYouSure'))) {
      await deleteIssue.mutateAsync(id);
      router.push('/issues');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {t('editIssue')}
        </Typography>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          size="small"
        >
          {tc('delete')}
        </Button>
      </Box>
      <IssueForm
        initialData={issue}
        isEdit
        onSubmit={handleSubmit}
        isSubmitting={updateIssue.isPending}
      />
    </Box>
  );
}
