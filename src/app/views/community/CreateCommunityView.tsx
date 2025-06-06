import { Box, Typography } from "@mui/material";
import { CreateCommunityForm } from "@/presentation/community/components/CreateCommunityForm";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

export default function CreateCommunityView() {
  const { user } = useAuthStore();
  if (user?.rol !== "SUPERADMIN") {
    return <Typography color="error" sx={{ mt: 8, textAlign: 'center' }}>No tienes permisos para crear comunidades.</Typography>;
  }
  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: '#222' }}>
        Crear Nueva Comunidad
      </Typography>
      <CreateCommunityForm />
    </Box>
  );
}
