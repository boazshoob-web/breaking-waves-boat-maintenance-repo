import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';

const SUPER_ADMIN_PHONE = process.env.SUPER_ADMIN_PHONE;

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      id: 'phone-credentials',
      name: 'Phone',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;

        const phone = credentials.phone as string;
        const password = credentials.password as string;

        // Check if this is the super admin
        if (SUPER_ADMIN_PHONE && phone === SUPER_ADMIN_PHONE) {
          const crew = await prisma.crewMember.findUnique({
            where: { phone },
          });

          if (!crew || !crew.passwordHash || !crew.isActive) return null;

          const isValid = await bcrypt.compare(password, crew.passwordHash);
          if (!isValid) return null;

          return {
            id: crew.id,
            name: `${crew.firstName}${crew.lastName ? ' ' + crew.lastName : ''}`,
            role: 'superAdmin' as const,
            isSuperAdmin: true,
          };
        }

        // Check maintenance app users
        const appUser = await prisma.maintenanceAppUser.findUnique({
          where: { phone },
        });

        if (!appUser || !appUser.isActive) return null;

        const isValid = await bcrypt.compare(password, appUser.passwordHash);
        if (!isValid) return null;

        return {
          id: appUser.id,
          name: appUser.name,
          role: 'user' as const,
          isSuperAdmin: false,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isSuperAdmin = user.isSuperAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as any;
      session.user.isSuperAdmin = token.isSuperAdmin as boolean;
      return session;
    },
  },
};
