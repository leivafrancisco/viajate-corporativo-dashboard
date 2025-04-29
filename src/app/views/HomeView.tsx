import { Box, Typography, Card, CardContent } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function DashboardInicioComunidad() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No existe el usuario...</Typography>
      </Box>
    );
  }

  // Simulamos datos para los gráficos, basados en el usuario
  const dataViajes = [
    { mes: "Ene", viajes: Math.floor(Math.random() * 20) + 10 },
    { mes: "Feb", viajes: Math.floor(Math.random() * 30) + 20 },
    { mes: "Mar", viajes: Math.floor(Math.random() * 40) + 30 },
    { mes: "Abr", viajes: Math.floor(Math.random() * 50) + 40 },
    { mes: "May", viajes: Math.floor(Math.random() * 60) + 50 },
    { mes: "Jun", viajes: Math.floor(Math.random() * 70) + 60 },
  ];

  const dataVehiculos = [
    { tipo: "Auto", cantidad: user.total_conductor || 0 },
    { tipo: "Moto", cantidad: Math.floor(user.total_conductor / 3) || 0 },
    { tipo: "Camioneta", cantidad: Math.floor(user.total_conductor / 4) || 0 },
  ];

  return (
    <Box >
      <Typography variant="h3" gutterBottom>
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

      {/* Gráfico de viajes */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Viajes creados por mes
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dataViajes}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="viajes"
              stroke="#1976d2"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Gráfico de tipos de vehículos */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Tipos de vehículos registrados
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataVehiculos}
              dataKey="cantidad"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dataVehiculos.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
