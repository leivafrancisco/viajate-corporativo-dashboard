import * as React from "react";
import {
  AppProvider,
  Navigation,
  Router,
  type Session,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Logo from "@/presentation/theme/components/Logo";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import theme from "@/theme";
import CustomAppTitle from "@/presentation/layout/components/CustomAppTitle";
import SidebarFooterAccount from "@/presentation/layout/components/SidebarFooterAccount";

import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { toast } from "sonner";
import { CircularProgress, Box } from "@mui/material"; // 👉 Loading

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
  const navigate = useNavigate();

  const { user, status, checkStatus, logout } = useAuthStore();

  React.useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  console.log('Usuario logueado:', user);
  console.log('Rol del usuario:', user?.rol);

  const isSuperAdmin = user?.rol === "SUPERADMIN";
  const isAdmin = user?.rol === "ADMINISTRADOR";

  // Menú dinámico según el rol
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
      title: isSuperAdmin ? "Comunidades" : "Comunidad",
    },
    isSuperAdmin
      ? {
          segment: "comunidad",
          title: "Comunidades",
          icon: <GroupsIcon />,
          children: [
            { segment: "mostrar", title: "Mostrar" },
            { segment: "crear", title: "Crear comunidad" },
          ],
        }
      : {
          segment: "comunidad",
          title: "Comunidad",
          icon: <GroupsIcon />,
          children: [
            { segment: "mostrar", title: "Mostrar" },
          ],
        },
    {
      segment: "miembros",
      title: "Miembros",
      children: [
        { segment: "unne", title: "UNNE" },
        { segment: "Devlight", title: "Devlight" },
        { segment: "comunidad-3", title: "Comunidad Viajate" },
      ],
    },
  ];

  // ✅ Definí primero todo antes de hacer returns
  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        navigate("/auth/login");
      },
      signOut: async () => {
        await logout();
        toast.info("Sesión cerrada");
        navigate("/auth/login");
      },
    }),
    [logout, navigate]
  );

  const session: Session | null = user
    ? {
        user: {
          name: `${user.nombre} ${user.apellido}`,
          email: user.email,
          image:
            user.foto_perfil ||
            `https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}`,
        },
      }
    : null;

  // ✅ Después hacés los returns condicionales
  if (status === "checking") {
    return (
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "unauthenticated") {
    navigate("/auth/login");
    return null;
  }

  // ✅ Render normal si autenticado
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
      session={session}
      authentication={authentication}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          sidebarFooter: SidebarFooterAccount,
          toolbarAccount: () => null,
        }}
        sx={{
          "& .MuiBreadcrumbs-root": {
            display: "none",
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
