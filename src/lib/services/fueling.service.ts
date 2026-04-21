import { prisma } from '@/lib/db/prisma';
import type { CreateFuelingInput, UpdateFuelingInput } from '@/schemas/fueling';

export const FuelingService = {
  async list() {
    return prisma.fuelingRecord.findMany({
      orderBy: { date: 'desc' },
    });
  },

  async getById(id: string) {
    return prisma.fuelingRecord.findUnique({
      where: { id },
    });
  },

  async create(data: CreateFuelingInput) {
    return prisma.fuelingRecord.create({
      data: {
        amount: data.amount,
        engineHours: data.engineHours ?? null,
        date: new Date(data.date),
      },
    });
  },

  async update(id: string, data: UpdateFuelingInput) {
    return prisma.fuelingRecord.update({
      where: { id },
      data: {
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.engineHours !== undefined && { engineHours: data.engineHours ?? null }),
        ...(data.date && { date: new Date(data.date) }),
      },
    });
  },

  async delete(id: string) {
    return prisma.fuelingRecord.delete({ where: { id } });
  },
};
