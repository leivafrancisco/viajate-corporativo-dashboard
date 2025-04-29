import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useCommunity } from "@/presentation/community/hook/useCommunity";

export default function DashboardInicioComunidad() {
  const { user } = useAuthStore();
  const { communitiesQuery } = useCommunity();

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No existe el usuario...</Typography>
      </Box>
    );
  }

  if (communitiesQuery.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  if (communitiesQuery.isError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Alert severity="error">
          Error al cargar las comunidades:{" "}
          {communitiesQuery.error instanceof Error
            ? communitiesQuery.error.message
            : "Error desconocido"}
        </Alert>
      </Box>
    );
  }

  const communities = communitiesQuery.data || [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user.nombre}
      </Typography>

      {/* Tarjetas */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
        }}
      >
        {/* Usuarios registrados */}
        <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Usuarios registrados
              </Typography>
              <Typography variant="h5">
                {user.total_pasajero + user.total_conductor}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Vehículos registrados */}
        <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Vehículos registrados
              </Typography>
              <Typography variant="h5">{user.total_conductor}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Viajes creados */}
        <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Viajes creados
              </Typography>
              <Typography variant="h5">
                {user.total_pasajero} {/* A falta de un campo mejor */}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Distancia total recorrida */}
        <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Distancia total recorrida
              </Typography>
              <Typography variant="h5">
                {Math.floor((user.total_pasajero + user.total_conductor) * 15)}{" "}
                km
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Comunidades Registradas
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
        }}
      >
        {communities.map((community) => (
          <Box
            key={community.id}
            sx={{
              flex: "1 1 calc(25% - 24px)", // Igual que las tarjetas de arriba
              minWidth: 250,
              maxWidth: 300,
            }}
          >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {community.foto_perfil && (
                <Box
                  component="img"
                  src={community.foto_perfil}
                  alt={community.nombre}
                  sx={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {community.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {community.descripcion}
                </Typography>
                <Typography
                  variant="caption"
                  color={community.habilitada ? "success.main" : "error.main"}
                >
                  {community.habilitada ? "Habilitada" : "No habilitada"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
