'use client';

import { useEffect, useState } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PeopleIcon from '@mui/icons-material/People';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.isSuperAdmin;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname.startsWith('/issues')) setValue(0);
    else if (pathname.startsWith('/fueling')) setValue(1);
    else if (pathname.startsWith('/admin/users')) setValue(2);
  }, [pathname]);

  const handleChange = (_: unknown, newValue: number) => {
    setValue(newValue);
    const routes = ['/issues', '/fueling', '/admin/users'];
    router.push(routes[newValue]);
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label={t('issues')} icon={<ListAltIcon />} />
        <BottomNavigationAction label={t('fueling')} icon={<LocalGasStationIcon />} />
        {isSuperAdmin && (
          <BottomNavigationAction label={t('users')} icon={<PeopleIcon />} />
        )}
      </BottomNavigation>
    </Paper>
  );
}
