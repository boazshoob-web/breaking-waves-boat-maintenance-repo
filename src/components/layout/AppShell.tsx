'use client';

import { Box, Container } from '@mui/material';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          py: 2,
          pb: 10,
        }}
      >
        {children}
      </Container>
      <BottomNav />
    </Box>
  );
}
