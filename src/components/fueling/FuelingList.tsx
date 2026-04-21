'use client';

import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { useFuelingRecords, useDeleteFueling } from '@/hooks/api/useFuelingQueries';

export function FuelingList() {
  const t = useTranslations('fueling');
  const tc = useTranslations('common');
  const { data: records, isLoading } = useFuelingRecords();
  const deleteFueling = useDeleteFueling();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!records?.length) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
        {t('noRecords')}
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {records.map((record, index) => (
        <Box key={record.id}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  if (window.confirm(tc('areYouSure'))) {
                    deleteFueling.mutate(record.id);
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${record.amount} ${t('liters')}${record.engineHours != null ? ` | ${record.engineHours} ${t('hours')}` : ''}`}
              secondary={dayjs(record.date).format('DD/MM/YYYY')}
            />
          </ListItem>
          {index < records.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
}
