import * as React from "react";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, Stack, Typography, Tooltip, Chip } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "@/presentation/theme/components/Logo";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "@/theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "General",
  },
  {
    segment: "",
    title: "Inicio",
    icon: <HomeIcon />,
  },
  {
    kind: "header",
    title: "Comunidad",
  },
  {
    segment: "comunidad",
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

// Hook para la navegación con React Router
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


// Componente de título (con logo, nombre de app y check de producción)
function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2} >
      <Typography variant="h6" noWrap>
        Viajate Corporativo
      </Typography>
     
      <Tooltip title="Cuenta verificada">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
      <Chip size="small" label="ADMIN" color="info" />
    </Stack>
  );
}

// Footer lateral del sidebar
function SidebarFooter({ mini }: { mini: boolean }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© Viajate" : `© ${new Date().getFullYear()} - Viajate`}
    </Typography>
  );
}

export default function AppLayout() {
  const router = useCustomRouter();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      branding={{
        title: "",
        logo: <Logo />,
        homeUrl: "/",
      }}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: SidebarFooter,
        }}
        sx={{
          "& .MuiBreadcrumbs-root": {
            display: "none", // Ocultar breadcrumbs
          },
        }}
      >
        <PageContainer>
          <Outlet />
        </PageContainer>

      
      </DashboardLayout>
    </AppProvider>
  );
}
