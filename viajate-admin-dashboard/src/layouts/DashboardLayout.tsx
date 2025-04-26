// src/layouts/DashboardLayout.tsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from '../dashboard/components/DashboardNavbar';
import { DashboardSidebar } from '../dashboard/components/DashboardSidebar';

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <DashboardSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <DashboardNavbar />
        <Box component="main" sx={{ mt: 8, p: 3 }}>
          <Outlet />
        </Box>
      </Box>  
    </Box>
  );
};
