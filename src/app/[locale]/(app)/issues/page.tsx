'use client';

import { Box, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { IssueList } from '@/components/issues/IssueList';

export default function IssuesPage() {
  const t = useTranslations('issues');
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        {t('title')}
      </Typography>
      <IssueList />
      <Fab
        color="secondary"
        onClick={() => router.push('/issues/new')}
        sx={{ right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
