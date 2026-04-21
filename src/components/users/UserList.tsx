'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Switch,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslations } from 'next-intl';
import { useUsers, useCreateUser, useUpdateUser, type AppUser } from '@/hooks/api/useUserQueries';
import { UserForm } from './UserForm';

export function UserList() {
  const t = useTranslations('users');
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const [formOpen, setFormOpen] = useState(false);

  const handleCreate = async (data: { name: string; phone: string; password: string }) => {
    await createUser.mutateAsync(data);
  };

  const handleToggleActive = async (user: AppUser) => {
    await updateUser.mutateAsync({ id: user.id, isActive: !user.isActive });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {t('title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
          size="small"
        >
          {t('addUser')}
        </Button>
      </Box>

      {!users?.length ? (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
          {t('noUsers')}
        </Typography>
      ) : (
        <List disablePadding>
          {users.map((user, index) => (
            <Box key={user.id}>
              <ListItem
                secondaryAction={
                  <Switch
                    checked={user.isActive}
                    onChange={() => handleToggleActive(user)}
                    size="small"
                  />
                }
              >
                <ListItemText
                  primary={user.name}
                  secondary={user.phone}
                  primaryTypographyProps={{
                    sx: { opacity: user.isActive ? 1 : 0.5 },
                  }}
                />
              </ListItem>
              {index < users.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />
    </Box>
  );
}
