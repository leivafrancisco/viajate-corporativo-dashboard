// src/dashboard/components/DashboardSidebar.tsx
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
  } from '@mui/material';
  import { Dashboard, People } from '@mui/icons-material';
  import { Link } from 'react-router-dom';
  
  const drawerWidth = 280;
  
  export const DashboardSidebar = () => {
    return (
      <Drawer
        anchor="left"
        open
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
  
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/users">
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    );
  };
  