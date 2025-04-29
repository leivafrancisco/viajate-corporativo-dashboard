import { Stack, Typography, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // 👈 Importamos nuevo ícono
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

export default function CustomAppTitle() {
  const { user } = useAuthStore();

  const isVerified = user?.email_verified;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h6" noWrap>
        Viajate Corporativo
      </Typography>
      <Tooltip
        title={isVerified ? "Cuenta verificada" : "Cuenta no verificada"}
      >
        {isVerified ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <ErrorOutlineIcon color="error" fontSize="small" />
        )}
      </Tooltip>
    </Stack>
  );
}
