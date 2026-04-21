import { NextResponse } from 'next/server';
import { getSuperAdmin } from '@/lib/auth/guard';
import { UserService } from '@/lib/services/user.service';
import { createUserSchema } from '@/schemas/user';

export async function GET() {
  const { error } = await getSuperAdmin();
  if (error) return error;

  try {
    const users = await UserService.list();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await getSuperAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const user = await UserService.create(parsed.data);
    return NextResponse.json(user, { status: 201 });
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Phone number already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
