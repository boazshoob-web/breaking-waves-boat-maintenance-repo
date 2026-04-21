import { prisma } from '@/lib/db/prisma';
import type { CreateIssueInput, UpdateIssueInput } from '@/schemas/issue';

export const IssueService = {
  async list(filters?: { status?: string; handleBy?: string }) {
    return prisma.maintenanceIssue.findMany({
      where: {
        ...(filters?.status && { status: filters.status as any }),
        ...(filters?.handleBy && { handleBy: filters.handleBy as any }),
      },
      orderBy: { lastModified: 'desc' },
    });
  },

  async getById(id: string) {
    return prisma.maintenanceIssue.findUnique({
      where: { id },
    });
  },

  async create(data: CreateIssueInput) {
    return prisma.maintenanceIssue.create({
      data: {
        description: data.description,
        severity: data.severity as any,
        handleBy: data.handleBy as any,
        sourceLogId: data.sourceLogId || null,
      },
    });
  },

  async update(id: string, data: UpdateIssueInput) {
    return prisma.maintenanceIssue.update({
      where: { id },
      data: {
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status as any }),
        ...(data.severity && { severity: data.severity as any }),
        ...(data.handleBy && { handleBy: data.handleBy as any }),
      },
    });
  },

  async delete(id: string) {
    return prisma.maintenanceIssue.delete({ where: { id } });
  },
};
