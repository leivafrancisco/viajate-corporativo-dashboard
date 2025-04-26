// src/pages/DashboardPage.tsx
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard de Viajate Corporativo 🚀
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mt: 3,
        }}
      >
        {/* Tarjeta 1 */}
        <Paper
          elevation={3}
          sx={{
            flex: '1 1 300px',
            p: 3,
          }}
        >
          <Typography variant="h6">Usuarios activos</Typography>
          <Typography variant="h4" color="primary">
            128
          </Typography>
        </Paper>

        {/* Tarjeta 2 */}
        <Paper
          elevation={3}
          sx={{
            flex: '1 1 300px',
            p: 3,
          }}
        >
          <Typography variant="h6">Viajes próximos</Typography>
          <Typography variant="h4" color="secondary">
            32
          </Typography>
        </Paper>

        {/* Tarjeta 3 */}
        <Paper
          elevation={3}
          sx={{
            flex: '1 1 300px',
            p: 3,
          }}
        >
          <Typography variant="h6">Reportes Generados</Typography>
          <Typography variant="h4" color="success.main">
            18
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
