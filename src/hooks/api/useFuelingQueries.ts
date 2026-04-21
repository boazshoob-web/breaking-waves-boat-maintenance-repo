'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface FuelingRecord {
  id: string;
  amount: number;
  engineHours: number | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export function useFuelingRecords() {
  return useQuery<FuelingRecord[]>({
    queryKey: ['fueling'],
    queryFn: async () => {
      const res = await fetch('/api/fueling');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });
}

export function useCreateFueling() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { amount: number; engineHours?: number | null; date: string }) => {
      const res = await fetch('/api/fueling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fueling'] });
    },
  });
}

export function useDeleteFueling() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/fueling/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fueling'] });
    },
  });
}
