import { z } from 'zod';

export const createIssueSchema = z.object({
  description: z.string().min(1),
  severity: z.enum(['CRITICAL', 'WARNING', 'INFO']).default('INFO'),
  handleBy: z.enum(['INTERNAL', 'SERVICE_PROVIDER']).default('INTERNAL'),
  sourceLogId: z.string().uuid().optional().nullable(),
});

export const updateIssueSchema = z.object({
  description: z.string().min(1).optional(),
  status: z.enum(['OPEN', 'IN_PROCESS', 'CLOSED', 'NON_ISSUE', 'RE_OPENED']).optional(),
  severity: z.enum(['CRITICAL', 'WARNING', 'INFO']).optional(),
  handleBy: z.enum(['INTERNAL', 'SERVICE_PROVIDER']).optional(),
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;
