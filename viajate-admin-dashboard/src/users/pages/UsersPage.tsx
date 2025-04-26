// src/users/pages/UsersPage.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UsersTable } from '../components/UserTable';
const UsersPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios 👤
      </Typography>

      <UsersTable />
    </Box>
  );
};

export default UsersPage;
