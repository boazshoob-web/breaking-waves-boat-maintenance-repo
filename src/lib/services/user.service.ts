import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import type { CreateUserInput, UpdateUserInput } from '@/schemas/user';

export const UserService = {
  async list() {
    return prisma.maintenanceAppUser.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getById(id: string) {
    return prisma.maintenanceAppUser.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async create(data: CreateUserInput) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return prisma.maintenanceAppUser.create({
      data: {
        name: data.name,
        phone: data.phone,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async update(id: string, data: UpdateUserInput) {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    return prisma.maintenanceAppUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async delete(id: string) {
    return prisma.maintenanceAppUser.delete({ where: { id } });
  },
};
