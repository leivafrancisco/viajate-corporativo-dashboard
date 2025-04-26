// src/users/components/UsersTable.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'fullName',
    headerName: 'Nombre Completo',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Correo Electrónico',
    width: 250,
  },
  {
    field: 'role',
    headerName: 'Rol',
    width: 150,
  },
];

const rows = [
  { id: 1, fullName: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
  { id: 2, fullName: 'Ana García', email: 'ana@example.com', role: 'User' },
  { id: 3, fullName: 'Luis Torres', email: 'luis@example.com', role: 'User' },
];

export const UsersTable = () => {
  return (
    <Box sx={{ height: 400, width: '100%', mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
    </Box>
  );
};
