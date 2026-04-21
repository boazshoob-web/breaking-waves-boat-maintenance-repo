import { NextResponse } from 'next/server';
import { auth } from './index';

export async function getAuthUser() {
  const session = await auth();
  if (!session?.user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { user: session.user, error: null };
}

export async function getSuperAdmin() {
  const session = await auth();
  if (!session?.user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  if (!session.user.isSuperAdmin) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }
  return { user: session.user, error: null };
}
