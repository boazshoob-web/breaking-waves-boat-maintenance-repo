import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { StatsService } from '@/lib/services/stats.service';

export async function GET() {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const [byStatus, bySeverity, byTeam, byOpenPeriod] = await Promise.all([
      StatsService.getIssueByStatus(),
      StatsService.getIssueBySeverity(),
      StatsService.getIssueByTeam(),
      StatsService.getIssueByOpenPeriod(),
    ]);

    return NextResponse.json({ byStatus, bySeverity, byTeam, byOpenPeriod });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
