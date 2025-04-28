import { Stack, Typography, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h6" noWrap>
        Viajate Corporativo
      </Typography>
      <Tooltip title="Cuenta verificada">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}
