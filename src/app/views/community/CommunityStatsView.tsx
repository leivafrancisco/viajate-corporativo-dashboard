import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Avatar, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { useCommunity } from '@/presentation/community/hook/useCommunity';

const kpiData = [
  { label: 'Usuarios activos', value: 26000, diff: '+10%' },
  { label: 'Viajes exitosos', value: 26000, diff: '+8%' },
  { label: 'Total kilómetros', value: 750000, diff: '+150,000 km' },
];

const lineData = [
  { mes: 'Ene', valor: 10000 },
  { mes: 'Feb', valor: 12000 },
  { mes: 'Mar', valor: 15000 },
  { mes: 'Abr', valor: 12500 },
  { mes: 'May', valor: 18000 },
  { mes: 'Jun', valor: 20000 },
  { mes: 'Jul', valor: 22000 },
  { mes: 'Ago', valor: 21000 },
  { mes: 'Sep', valor: 25000 },
  { mes: 'Oct', valor: 27000 },
  { mes: 'Nov', valor: 30000 },
  { mes: 'Dic', valor: 32000 },
];

const trafficData = [
  { fuente: 'Directo', valor: 21400 },
  { fuente: 'Referidos', valor: 14500 },
  { fuente: 'Redes Sociales', valor: 10700 },
  { fuente: 'Orgánico', valor: 5600 },
];

const tripsData = [
  { estado: 'Completado', usuario: 'Ahmed Z.', fecha: '18/04/2025', viaje: 'Corrientes → Resistencia', precio: '800 ARS' },
  { estado: 'Esperando Conductor', usuario: 'Hiba M.', fecha: '16/04/2025', viaje: 'Corrientes → Chaco', precio: '600 ARS' },
  { estado: 'Completado', usuario: 'Sami B.', fecha: '17/04/2025', viaje: 'Corrientes → Formosa', precio: '1200 ARS' },
  { estado: 'Cancelado por usuario', usuario: 'Lina R.', fecha: '15/04/2025', viaje: 'Corrientes → Posadas', precio: '1500 ARS' },
];

const users = [
  { nombre: 'Sami B.', email: 'B.Sami22@gmail.com' },
  { nombre: 'Ahmed Z.', email: 'Z.Ahmed@gmail.com' },
  { nombre: 'Salsabil', email: 'Jsalsabil13@gmail.com' },
  { nombre: 'Dianne Russell', email: 'curtis.d@gmail.com' },
];

const estadoColor = {
  'Completado': 'success',
  'Esperando Conductor': 'warning',
  'Cancelado por usuario': 'error',
};

export default function CommunityStatsView() {
  const { id } = useParams();
  const { communitiesQuery } = useCommunity();
  const comunidad = communitiesQuery.data?.find((c) => String(c.id) === String(id));

  if (communitiesQuery.isLoading) {
    return <Typography sx={{ mt: 8, textAlign: 'center' }}>Cargando comunidad...</Typography>;
  }
  if (!comunidad) {
    return <Typography color="error" sx={{ mt: 8, textAlign: 'center' }}>Comunidad no encontrada.</Typography>;
  }

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: '#f8f9fa' }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary.main">
        {comunidad.nombre}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        {comunidad.descripcion}
      </Typography>
      {/* KPIs */}
      <Grid container spacing={3} mb={2}>
        {kpiData.map((kpi) => (
          <Grid item xs={12} sm={4} md={4} key={kpi.label}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                {kpi.label}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {kpi.value.toLocaleString('es-AR')}
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight={600}>
                {kpi.diff}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Gráficos y fuentes de tráfico */}
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
              Reporte de Ventas / Actividad
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#2d6cdf" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
              Fuentes de Tráfico (últimos 7 días)
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={trafficData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="fuente" type="category" width={90} tick={{ fontSize: 13 }} />
                <Tooltip />
                <Bar dataKey="valor" fill="#2d6cdf" barSize={16} radius={[8, 8, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
            {trafficData.map((t) => (
              <Box key={t.fuente} sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="body2">{t.fuente}</Typography>
                <Typography variant="body2" fontWeight={600}>{t.valor.toLocaleString('es-AR')}</Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
      {/* Tabla de viajes */}
      <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
          Viajes recientes
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Condición</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Viaje</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tripsData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Chip label={row.estado} color={estadoColor[row.estado]} size="small" />
                  </TableCell>
                  <TableCell>{row.usuario}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.viaje}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {/* Usuarios satisfechos */}
      <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2, maxWidth: 400 }}>
        <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1}>
          Usuarios Satisfechos
        </Typography>
        {users.map((u, idx) => (
          <Box key={u.email} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>{u.nombre[0]}</Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>{u.nombre}</Typography>
              <Typography variant="caption" color="text.secondary">{u.email}</Typography>
            </Box>
          </Box>
        ))}
      </Card>
    </Box>
  );
} 