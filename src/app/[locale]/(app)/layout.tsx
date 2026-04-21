import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AppShell } from '@/components/layout/AppShell';

export default async function AppLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/auth/login`);
  }

  return <AppShell>{children}</AppShell>;
}
