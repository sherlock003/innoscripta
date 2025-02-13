'use client';

import { Button, styled } from '@mui/material';

type RootProps = {
  active?: boolean;
};

const NavItem = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<RootProps>(({ theme, active = false }) => ({
  textTransform: 'none',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? theme.palette.common.white : theme.palette.common.black,
  borderRadius: 24,
  padding: '8px 24px',
  marginLeft: theme.spacing(0.25),
  marginRight: theme.spacing(0.25),
  fontSize: 14,
  '&.Mui-disabled': {
    color: active ? theme.palette.common.white : theme.palette.common.black,
  },
}));

export default NavItem;
