import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "@/presentation/theme/components/Logo";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import VisibilityIcon from "@mui/icons-material/Visibility";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "General",
  },
  {
    segment: "", // raíz
    title: "Inicio",
    icon: <HomeIcon />,
  },
  {
    kind: "header",
    title: "Comunidad",
  },
  {
    segment: "comunidad", // este es el padre
    title: "Comunidad",
    icon: <GroupsIcon />,
    children: [
      {
        segment: "mostrar",
        title: "Mostrar",
        icon: <VisibilityIcon />,
      },
      {
        segment: "crear",
        title: "Crear",
        icon: <AddCircleIcon />,
      },
    ],
  },
];

const viajateTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Hook para conectar tu navegador real
function useCustomRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  return React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path: string | URL) => {
        navigate(typeof path === "string" ? path : path.toString());
      },
    }),
    [navigate, location]
  );
}

export default function AppLayout() {
  const router = useCustomRouter();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={viajateTheme}
      branding={{
        title: "Viajate",
        logo: <Logo />,
      }}
    >
      <DashboardLayout>
        {/* Renderiza las páginas */}
        <PageContainer>
          <Outlet />
        </PageContainer>

        {/* Footer */}
        <Box component="footer" sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Viajate
          </Typography>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
