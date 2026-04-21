'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import dayjs from 'dayjs';

const issueFormSchema = z.object({
  description: z.string().min(1),
  severity: z.enum(['CRITICAL', 'WARNING', 'INFO']),
  handleBy: z.enum(['INTERNAL', 'SERVICE_PROVIDER']),
  status: z.enum(['OPEN', 'IN_PROCESS', 'CLOSED', 'NON_ISSUE', 'RE_OPENED']).optional(),
});

type IssueFormData = z.infer<typeof issueFormSchema>;

interface IssueFormProps {
  initialData?: {
    description: string;
    severity: string;
    handleBy: string;
    status: string;
    dateOpened?: string;
    lastModified?: string;
  };
  isEdit?: boolean;
  onSubmit: (data: IssueFormData) => void;
  isSubmitting?: boolean;
}

export function IssueForm({ initialData, isEdit, onSubmit, isSubmitting }: IssueFormProps) {
  const t = useTranslations('issues');
  const tc = useTranslations('common');

  const { control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      description: initialData?.description || '',
      severity: (initialData?.severity as any) || 'INFO',
      handleBy: (initialData?.handleBy as any) || 'INTERNAL',
      status: (initialData?.status as any) || 'OPEN',
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t('description')}
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description ? tc('required') : ''}
            autoFocus={!isEdit}
          />
        )}
      />

      <Controller
        name="severity"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>{t('severity')}</InputLabel>
            <Select {...field} label={t('severity')}>
              <MenuItem value="CRITICAL">{t('severities.CRITICAL')}</MenuItem>
              <MenuItem value="WARNING">{t('severities.WARNING')}</MenuItem>
              <MenuItem value="INFO">{t('severities.INFO')}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="handleBy"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>{t('handleBy')}</InputLabel>
            <Select {...field} label={t('handleBy')}>
              <MenuItem value="INTERNAL">{t('handleByOptions.INTERNAL')}</MenuItem>
              <MenuItem value="SERVICE_PROVIDER">{t('handleByOptions.SERVICE_PROVIDER')}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      {isEdit && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel>{t('status')}</InputLabel>
              <Select {...field} label={t('status')}>
                <MenuItem value="OPEN">{t('statuses.OPEN')}</MenuItem>
                <MenuItem value="IN_PROCESS">{t('statuses.IN_PROCESS')}</MenuItem>
                <MenuItem value="CLOSED">{t('statuses.CLOSED')}</MenuItem>
                <MenuItem value="NON_ISSUE">{t('statuses.NON_ISSUE')}</MenuItem>
                <MenuItem value="RE_OPENED">{t('statuses.RE_OPENED')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      )}

      {isEdit && initialData?.dateOpened && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('dateOpened')}: {dayjs(initialData.dateOpened).format('DD/MM/YYYY')}
          </Typography>
          {initialData?.lastModified && (
            <Typography variant="body2" color="text.secondary">
              {t('lastModified')}: {dayjs(initialData.lastModified).format('DD/MM/YYYY')}
            </Typography>
          )}
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{ py: 1.5 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : tc('save')}
      </Button>
    </Box>
  );
}
