import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/presentation/alert/components/ConfirmDialog";

// Datos de ejemplo
const comunidades = [
  {
    id: 1,
    nombre: "Comunidad UNNE",
    descripcion: "Carpooling para estudiantes y profesores.",
    imagenUrl:
      "https://th.bing.com/th/id/OIP.njUxD-EZXD83FX32wjycXwHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    nombre: "Comunidad DevLight",
    descripcion: "Viajes compartidos para empleados de la empresa.",
    imagenUrl:
      "https://th.bing.com/th/id/OIP.8TNsdIjCZiT2A-UZFQ3K6gAAAA?rs=1&pid=ImgDetMain",
  },
];

export default function ShowCommunityView() {
  const navigate = useNavigate();

  // Estados para el modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleEdit = (row: any) => {
    navigate(`/comunidad/editar/${row.id}`);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row); // Guardamos el que quiere eliminar
    setOpenDeleteModal(true); // Abrimos el modal
  };

  const confirmDelete = () => {
    console.log("Eliminando comunidad:", selectedRow);
    setOpenDeleteModal(false);
    setSelectedRow(null);
    // Aquí iría la lógica real para eliminar (por ejemplo, llamar a un API)
  };

  const cancelDelete = () => {
    setOpenDeleteModal(false);
    setSelectedRow(null);
  };

  const columns: GridColDef<(typeof comunidades)[number]>[] = [
    {
      field: "imagenUrl",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={params.value}
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

  return (
    <Box>
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
