import { Box, Typography } from "@mui/material";
import { CreateCommunityForm } from "@/presentation/community/components/CreateCommunityForm";

export default function CreateCommunityView() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Nueva Comunidad
      </Typography>
      <CreateCommunityForm />
    </Box>
  );
}
