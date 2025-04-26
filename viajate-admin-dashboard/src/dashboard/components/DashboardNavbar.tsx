// src/dashboard/components/DashboardNavbar.tsx
import { AppBar, Toolbar, Typography } from '@mui/material';

export const DashboardNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'primary.main',
        width: { lg: `calc(100% - 280px)` },
        left: { lg: '280px' }
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Viajate Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
