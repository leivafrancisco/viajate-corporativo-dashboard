import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Importamos Link de react-router-dom

export default function DashboardView() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >

      <Typography variant="body1" color="text.secondary">
        Aquí podrás gestionar tus comunidades, miembros y mucho más.
      </Typography>

      <MuiLink
        component={RouterLink}
        to="/comunidad/crear"
        underline="none"
        sx={{
          mt: 2,
          bgcolor: 'primary.main',
          color: 'white',
          px: 3,
          py: 1.5,
          borderRadius: 1,
          fontWeight: 500,
          textAlign: "center",
          display: "inline-block",
        }}
      >
        Nueva comunidad
      </MuiLink>
    </Box>
  );
}
