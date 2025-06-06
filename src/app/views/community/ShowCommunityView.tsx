import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDialog from "@/presentation/alert/components/ConfirmDialog";
import { useCommunity } from "@/presentation/community/hook/useCommunity";
import { Community } from "@/core/community/interface/community.interface";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

export default function ShowCommunityView() {
  const navigate = useNavigate();
  const { communitiesQuery } = useCommunity();
  const { user } = useAuthStore();
  const isSuperAdmin = user?.rol === "SUPERADMIN";
  const isAdmin = user?.rol === "ADMINISTRADOR";
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Community | null>(null);

  const handleEdit = (row: Community) => {
    navigate(`/comunidad/editar/${row.id}`);
  };

  const handleDelete = (row: Community) => {
    setSelectedRow(row);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Eliminando comunidad:", selectedRow);
    setOpenDeleteModal(false);
    setSelectedRow(null);
    // Aquí iría la lógica real para eliminar
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setSelectedRow(null);
  };

  const columns: GridColDef<Community>[] = [
    {
      field: "foto_perfil",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={params.value || "https://via.placeholder.com/50"}
            alt="Imagen comunidad"
            sx={{ width: 50, height: 50, borderRadius: 2, objectFit: "cover" }}
          />
        </Box>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="subtitle1" fontWeight={600}>{params.value}</Typography>
      ),
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 2,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  let comunidades: Community[] = [];
  if (isSuperAdmin) {
    comunidades = communitiesQuery.data || [];
  } else if (isAdmin) {
    comunidades = user?.comunidades || [];
  }

  if (!isSuperAdmin && !isAdmin) {
    return <Typography color="error" sx={{ mt: 8, textAlign: 'center' }}>No tienes permisos para ver comunidades.</Typography>;
  }

  if (communitiesQuery.isLoading) {
    return <Typography sx={{ mt: 8, textAlign: 'center' }}>Cargando comunidades...</Typography>;
  }

  if (communitiesQuery.isError) {
    return (
      <Typography color="error" sx={{ mt: 8, textAlign: 'center' }}>
        Error al cargar comunidades: {communitiesQuery.error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: '#f8f9fa' }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: '#222' }}>
        Comunidades Registradas
      </Typography>
      <Box sx={{ background: '#fff', borderRadius: 4, boxShadow: 3, p: 3, maxWidth: 1100, mx: 'auto' }}>
        <DataGrid
          rows={comunidades}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 3,
            background: '#fff',
            boxShadow: 0,
            fontSize: 16,
            minHeight: 400,
            '& .MuiDataGrid-columnHeaders': {
              background: '#f5f6fa',
              fontWeight: 700,
              fontSize: 16,
            },
            '& .MuiDataGrid-row': {
              borderRadius: 2,
              mb: 1,
            },
          }}
        />
      </Box>
      <ConfirmDialog
        open={openDeleteModal}
        title="Confirmar eliminación"
        description={
          selectedRow
            ? `¿Seguro que deseas eliminar ${selectedRow.nombre}?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Box>
  );
}
