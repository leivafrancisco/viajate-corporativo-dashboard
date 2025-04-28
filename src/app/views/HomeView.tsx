import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dataViajes = [
  { mes: "Ene", viajes: 20 },
  { mes: "Feb", viajes: 35 },
  { mes: "Mar", viajes: 50 },
  { mes: "Abr", viajes: 40 },
  { mes: "May", viajes: 70 },
  { mes: "Jun", viajes: 60 },
];

export default function DashboardInicioComunidad() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, Administrador de Comunidad UNNE 🚀
      </Typography>

      <Grid container spacing={3} mt={2}>
        {/* Tarjetas de métricas */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Usuarios registrados
              </Typography>
              <Typography variant="h5">328</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Vehículos registrados
              </Typography>
              <Typography variant="h5">102</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Viajes creados
              </Typography>
              <Typography variant="h5">212</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Distancia total recorrida
              </Typography>
              <Typography variant="h5">14.350 km</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                CO₂ evitado
              </Typography>
              <Typography variant="h5">2.430 kg</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de viajes creados por mes */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Viajes creados por mes
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataViajes} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="viajes" stroke="#1976d2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
