import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { FuelingService } from '@/lib/services/fueling.service';
import { createFuelingSchema } from '@/schemas/fueling';

export async function GET() {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const records = await FuelingService.list();
    return NextResponse.json(records);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch fueling records' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = createFuelingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const record = await FuelingService.create(parsed.data);
    return NextResponse.json(record, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create fueling record' }, { status: 500 });
  }
}
