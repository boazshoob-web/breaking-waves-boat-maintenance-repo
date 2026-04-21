'use client';

import { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { useCreateFueling } from '@/hooks/api/useFuelingQueries';

export function FuelingForm() {
  const t = useTranslations('fueling');
  const tc = useTranslations('common');
  const createFueling = useCreateFueling();
  const [amount, setAmount] = useState('');
  const [engineHours, setEngineHours] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date) return;

    await createFueling.mutateAsync({
      amount: parseFloat(amount),
      engineHours: engineHours ? parseFloat(engineHours) : null,
      date,
    });
    setAmount('');
    setEngineHours('');
    setDate(dayjs().format('YYYY-MM-DD'));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label={t('amount')}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          size="small"
          sx={{ flex: 1 }}
          inputProps={{ min: 0, step: 0.1 }}
        />
        <TextField
          label={t('engineHours')}
          type="number"
          value={engineHours}
          onChange={(e) => setEngineHours(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          inputProps={{ min: 0, step: 0.1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label={t('date')}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          size="small"
          sx={{ flex: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={createFueling.isPending}
          sx={{ minWidth: 80, height: 40 }}
        >
          {createFueling.isPending ? <CircularProgress size={20} /> : tc('add')}
        </Button>
      </Box>
    </Box>
  );
}
