import * as React from "react";
import { AppProvider, Navigation, Router, type Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Logo from "@/presentation/theme/components/Logo";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import theme from "@/theme";

import CustomAppTitle from "@/presentation/layout/components/CustomAppTitle";
import SidebarFooterAccount from "@/presentation/layout/components/SidebarFooterAccount";


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
      },
      {
        segment: "crear",
        title: "Crear",
      },
    ],
  },
];

// Hook para navegación
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

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Francisco Emanuel",
      email: "francisco@viajate.com",
      image: "https://ui-avatars.com/api/?name=Francisco+Emanuel",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Francisco Emanuel",
            email: "francisco@viajate.com",
            image: "https://ui-avatars.com/api/?name=Francisco+Emanuel",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

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
