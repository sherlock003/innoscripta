'use client';

import {
  AppBar as AppBarMUI,
  Box,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { routes } from '@/utils/routes';

import Logo from '@/components/Logo';
import NavItem from '@/components/NavItem';
import SideBar from '@/components/SideBar';

const AppBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const renderMenu = () => {
    if (isSmUp) return <Logo />;
    return <SideBar />;
  };

  return (
    <AppBarMUI
      position="fixed"
      elevation={trigger ? 4 : 0}
      sx={{ bgcolor: trigger ? '#fff' : 'transparent' }}
    >
      <Toolbar>
        <Box mr={2}>{renderMenu()}</Box>
        <Box flexGrow={1} display="flex">
          {routes.map((page) => (
            <NavItem
              LinkComponent={Link}
              href={page.link}
              disabled={page.link === pathname}
              active={page.link === pathname}
              key={page.label}
              sx={{ my: 1.5, display: 'block' }}
            >
              {page.label}
            </NavItem>
          ))}
        </Box>
      </Toolbar>
    </AppBarMUI>
  );
};

export default memo(AppBar);
