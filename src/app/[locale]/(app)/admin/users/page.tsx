import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { UserList } from '@/components/users/UserList';

export default async function UsersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    redirect(`/${locale}/issues`);
  }

  return <UserList />;
}
