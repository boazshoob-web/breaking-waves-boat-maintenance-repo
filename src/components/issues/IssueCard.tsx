'use client';

import { Card, CardContent, CardActionArea, Typography, Box, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import { IssueStatusChip } from './IssueStatusChip';
import type { MaintenanceIssue } from '@/hooks/api/useIssueQueries';

interface IssueCardProps {
  issue: MaintenanceIssue;
  onClick: () => void;
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const t = useTranslations('issues');

  return (
    <Card sx={{ mb: 1.5 }}>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{
                flex: 1,
                mr: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {issue.description}
            </Typography>
            <IssueStatusChip status={issue.status} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, gap: 0.5 }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Chip
                label={t(`severities.${issue.severity}`)}
                size="small"
                color={
                  issue.severity === 'CRITICAL' ? 'error' :
                  issue.severity === 'WARNING' ? 'warning' : 'info'
                }
                variant="outlined"
              />
              <Chip
                label={t(`handleByOptions.${issue.handleBy}`)}
                size="small"
                variant="outlined"
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {dayjs(issue.dateOpened).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
