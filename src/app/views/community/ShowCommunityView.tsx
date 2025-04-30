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
import { useCommunity } from "@/presentation/community/hooks/useCommunity";
import { Community } from "@/core/community/interface/community.interface";

export default function ShowCommunityView() {
  const navigate = useNavigate();

  const { communitiesQuery } = useCommunity();

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
        <Typography variant="subtitle1">{params.value}</Typography>
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

  if (communitiesQuery.isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Cargando comunidades...</Typography>
      </Box>
    );
  }

  if (communitiesQuery.isError) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error al cargar las comunidades: {communitiesQuery.error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Mensaje si no hay comunidades */}
      {communitiesQuery.data && communitiesQuery.data.length === 0 && (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 2, mb: 2 }}
        >
          No hay comunidades disponibles.
        </Typography>
      )}

      {/* Tabla siempre visible */}
      <DataGrid
        rows={communitiesQuery.data ?? []} // <- corregido
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        autoHeight
      />

      {/* Modal de confirmación de eliminación */}
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
