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
        <Alert severity="error">
          No existe el usuario o no has iniciado sesión correctamente.
        </Alert>
      </Box>
    );
  }

  if (communitiesQuery.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          minHeight: "60vh",
          p: 4,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Cargando comunidades...</Typography>
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
          p: 4,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Error al cargar las comunidades
          </Typography>
          <Typography>
            {communitiesQuery.error instanceof Error
              ? communitiesQuery.error.message
              : "Error desconocido al cargar las comunidades"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Por favor, intenta recargar la página o contacta con soporte si el problema persiste.
          </Typography>
        </Alert>
      </Box>
    );
  }

  const communities = communitiesQuery.data || [];

  return (
    <Box sx={{ p: 4 }}>
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
                {user.total_pasajero}
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

      {communities.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No hay comunidades registradas.
        </Alert>
      ) : (
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
                flex: "1 1 calc(25% - 24px)",
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
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
