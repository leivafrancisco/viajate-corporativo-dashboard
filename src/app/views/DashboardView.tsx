import { Box, Button, Typography } from "@mui/material";

export default function DashboardView() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        mt: 4,
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        Bienvenido al Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Aquí podrás gestionar tus comunidades, miembros y mucho más.
      </Typography>

      <Button variant="contained" color="primary">
        Crear una comunidad
      </Button>
    </Box>
  );
}
