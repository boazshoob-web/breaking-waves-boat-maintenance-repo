import { prisma } from '@/lib/db/prisma';

export const StatsService = {
  async getIssueByStatus() {
    const results = await prisma.maintenanceIssue.groupBy({
      by: ['status'],
      _count: { id: true },
    });
    return results.map((r) => ({
      name: r.status,
      value: r._count.id,
    }));
  },

  async getIssueBySeverity() {
    const results = await prisma.maintenanceIssue.groupBy({
      by: ['severity'],
      _count: { id: true },
    });
    return results.map((r) => ({
      name: r.severity,
      value: r._count.id,
    }));
  },

  async getIssueByTeam() {
    // Join through logs -> teams using raw SQL since those tables
    // aren't in this app's Prisma schema
    const results: { name: string; value: number }[] = await prisma.$queryRaw`
      SELECT
        COALESCE(t.name, 'Manual') as name,
        COUNT(mi.id)::int as value
      FROM maintenance_issues mi
      LEFT JOIN logs l ON l.id = mi.source_log_id
      LEFT JOIN teams t ON t.id = l.team_id
      GROUP BY t.name
      ORDER BY value DESC
    `;
    return results;
  },

  async getIssueByOpenPeriod() {
    // Only count non-closed issues and bucket by how long they've been open
    const results: { name: string; value: number }[] = await prisma.$queryRaw`
      SELECT
        CASE
          WHEN NOW() - date_opened < INTERVAL '7 days' THEN '< 1 week'
          WHEN NOW() - date_opened < INTERVAL '14 days' THEN '1-2 weeks'
          WHEN NOW() - date_opened < INTERVAL '30 days' THEN '2-4 weeks'
          WHEN NOW() - date_opened < INTERVAL '90 days' THEN '1-3 months'
          ELSE '3+ months'
        END as name,
        COUNT(*)::int as value
      FROM maintenance_issues
      WHERE status NOT IN ('CLOSED', 'NON_ISSUE')
      GROUP BY name
      ORDER BY MIN(date_opened) DESC
    `;
    return results;
  },
};
