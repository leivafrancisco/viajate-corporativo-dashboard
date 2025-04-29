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

const dataViajes = [
  { mes: "Ene", viajes: 20 },
  { mes: "Feb", viajes: 35 },
  { mes: "Mar", viajes: 50 },
  { mes: "Abr", viajes: 40 },
  { mes: "May", viajes: 70 },
  { mes: "Jun", viajes: 60 },
];

const dataVehiculos = [
  { tipo: "Auto", cantidad: 65 },
  { tipo: "Moto", cantidad: 25 },
  { tipo: "Camioneta", cantidad: 12 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function DashboardInicioComunidad() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, Administrador de Comunidad UNNE 🚀
      </Typography>

      {/* Contenedor de tarjetas, usando flex */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 2,
        }}
      >
        {/* Tarjetas */}
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
              <Typography variant="h5">328</Typography>
            </CardContent>
          </Card>
        </Box>

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
              <Typography variant="h5">102</Typography>
            </CardContent>
          </Card>
        </Box>

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
              <Typography variant="h5">212</Typography>
            </CardContent>
          </Card>
        </Box>

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
              <Typography variant="h5">14.350 km</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: "1 1 calc(25% - 24px)", minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                CO₂ evitado
              </Typography>
              <Typography variant="h5">2.430 kg</Typography>
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

      {/* Gráfico de vehículos */}
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
