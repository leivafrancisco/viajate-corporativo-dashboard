import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useCommunity } from "@/presentation/community/hook/useCommunity";
import { useNavigate } from 'react-router-dom';

const sampleData = [
  { mes: 'Ene', valor: 0 },
  { mes: 'Feb', valor: 10 },
  { mes: 'Mar', valor: 20 },
  { mes: 'Abr', valor: 15 },
  { mes: 'May', valor: 30 },
  { mes: 'Jun', valor: 25 },
  { mes: 'Jul', valor: 40 },
  { mes: 'Ago', valor: 35 },
  { mes: 'Sep', valor: 50 },
  { mes: 'Oct', valor: 45 },
  { mes: 'Nov', valor: 60 },
  { mes: 'Dic', valor: 55 },
];

export default function DashboardInicioComunidad() {
  const { user } = useAuthStore();
  const { communitiesQuery } = useCommunity();
  const navigate = useNavigate();

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
    <Box sx={{ p: 4, minHeight: '100vh', background: '#f8f9fa' }}>
      <Typography variant="h4" fontWeight={700} mb={4} sx={{ color: '#222' }}>
        Bienvenido, {user.nombre}
      </Typography>
      {/* Estadísticas y gráfico */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2, alignItems: 'stretch' }}>
        {/* Estadísticas */}
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={0.5}>
              Usuarios registrados
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {user.total_pasajero + user.total_conductor}
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={0.5}>
              Vehículos registrados
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {user.total_conductor}
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 180px', minWidth: 180 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={0.5}>
              Viajes creados
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {user.total_pasajero}
            </Typography>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 220px', minWidth: 220 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={0.5}>
              Distancia total recorrida
            </Typography>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {Math.floor((user.total_pasajero + user.total_conductor) * 15)} km
            </Typography>
          </Card>
        </Box>
        {/* Gráfico */}
        <Box sx={{ flex: '2 1 400px', minWidth: 320, maxWidth: 600 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, minHeight: 110, height: '100%' }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
              Ejemplo de Gráfico de Actividad
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={sampleData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#2d6cdf" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mt: 4, color: '#222' }}>
        Comunidades Registradas
      </Typography>
      {communities.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No hay comunidades registradas.
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
          {communities.map((community) => (
            <Box
              key={community.id}
              sx={{
                flex: '1 1 260px',
                minWidth: 220,
                maxWidth: 320,
                background: '#fff',
                borderRadius: 2,
                boxShadow: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mb: 2,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: 6,
                  background: '#f5f6fa',
                },
              }}
              onClick={() => navigate(`/comunidad/estadisticas/${community.id}`)}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: '#2d6cdf' }}>
                {community.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                {community.descripcion}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
