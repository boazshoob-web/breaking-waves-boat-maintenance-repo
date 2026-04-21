import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { FuelingService } from '@/lib/services/fueling.service';
import { updateFuelingSchema } from '@/schemas/fueling';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const record = await FuelingService.getById(params.id);
    if (!record) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch fueling record' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = updateFuelingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const record = await FuelingService.update(params.id, parsed.data);
    return NextResponse.json(record);
  } catch {
    return NextResponse.json({ error: 'Failed to update fueling record' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    await FuelingService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete fueling record' }, { status: 500 });
  }
}
