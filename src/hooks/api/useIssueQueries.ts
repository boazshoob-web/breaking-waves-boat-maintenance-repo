'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface MaintenanceIssue {
  id: string;
  description: string;
  status: 'OPEN' | 'IN_PROCESS' | 'CLOSED' | 'NON_ISSUE' | 'RE_OPENED';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  handleBy: 'INTERNAL' | 'SERVICE_PROVIDER';
  dateOpened: string;
  lastModified: string;
  sourceLogId: string | null;
}

export function useIssues(filters?: { status?: string; handleBy?: string }) {
  const params = new URLSearchParams();
  if (filters?.status) params.set('status', filters.status);
  if (filters?.handleBy) params.set('handleBy', filters.handleBy);
  const qs = params.toString();

  return useQuery<MaintenanceIssue[]>({
    queryKey: ['issues', filters],
    queryFn: async () => {
      const res = await fetch(`/api/issues${qs ? '?' + qs : ''}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });
}

export function useIssue(id: string) {
  return useQuery<MaintenanceIssue>({
    queryKey: ['issues', id],
    queryFn: async () => {
      const res = await fetch(`/api/issues/${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { description: string; severity?: string; handleBy?: string }) => {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
}

export function useUpdateIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; description?: string; status?: string; severity?: string; handleBy?: string }) => {
      const res = await fetch(`/api/issues/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
}

export function useDeleteIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/issues/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
    },
  });
}
