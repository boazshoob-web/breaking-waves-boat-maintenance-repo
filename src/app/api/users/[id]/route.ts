import { NextResponse } from 'next/server';
import { getSuperAdmin } from '@/lib/auth/guard';
import { UserService } from '@/lib/services/user.service';
import { updateUserSchema } from '@/schemas/user';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getSuperAdmin();
  if (error) return error;

  try {
    const user = await UserService.getById(params.id);
    if (!user) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getSuperAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const user = await UserService.update(params.id, parsed.data);
    return NextResponse.json(user);
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Phone number already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getSuperAdmin();
  if (error) return error;

  try {
    await UserService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
