import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { IssueService } from '@/lib/services/issue.service';
import { createIssueSchema } from '@/schemas/issue';

export async function GET(request: Request) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const handleBy = searchParams.get('handleBy') || undefined;

    const issues = await IssueService.list({ status, handleBy });
    return NextResponse.json(issues);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await getAuthUser();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = createIssueSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const issue = await IssueService.create(parsed.data);
    return NextResponse.json(issue, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}
