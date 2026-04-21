import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { IssueService } from '@/lib/services/issue.service';
import { updateIssueSchema } from '@/schemas/issue';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const issue = await IssueService.getById(params.id);
    if (!issue) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(issue);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 });
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
    const parsed = updateIssueSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const issue = await IssueService.update(params.id, parsed.data);
    return NextResponse.json(issue);
  } catch {
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    await IssueService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
  }
}
