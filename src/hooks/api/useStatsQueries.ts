'use client';

import { useQuery } from '@tanstack/react-query';

interface ChartData {
  name: string;
  value: number;
}

interface StatsData {
  bySeverity: ChartData[];
  byTeam: ChartData[];
  byOpenPeriod: ChartData[];
}

export function useStats() {
  return useQuery<StatsData>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });
}
