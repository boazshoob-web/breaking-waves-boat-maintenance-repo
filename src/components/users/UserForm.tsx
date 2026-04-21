'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useState } from 'react';

const userFormSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  password: z.string().min(4),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  initialData?: { name: string; phone: string };
  isEdit?: boolean;
}

export function UserForm({ open, onClose, onSubmit, initialData, isEdit }: UserFormProps) {
  const t = useTranslations('users');
  const tc = useTranslations('common');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(
      isEdit
        ? userFormSchema.extend({ password: z.string().min(4).or(z.literal('')) })
        : userFormSchema
    ),
    defaultValues: {
      name: initialData?.name || '',
      phone: initialData?.phone || '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: UserFormData) => {
    setError('');
    setSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (e: any) {
      setError(e.message || tc('error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{isEdit ? t('editUser') : t('addUser')}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            {...register('name')}
            label={t('name')}
            error={!!errors.name}
            helperText={errors.name ? tc('required') : ''}
            autoFocus
          />
          <TextField
            {...register('phone')}
            label={t('phone')}
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone ? tc('required') : ''}
          />
          <TextField
            {...register('password')}
            label={isEdit ? t('newPassword') : t('password')}
            type="password"
            error={!!errors.password}
            helperText={errors.password ? t('passwordMin') : isEdit ? t('passwordLeaveEmpty') : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{tc('cancel')}</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? <CircularProgress size={20} /> : tc('save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
