import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import AuthLayout from "@/app/layouts/AuthLayout";

import HomeView from "@/app/views/HomeView";
import LoginView from "@/app/views/auth/LoginView";
import ShowCommunityView from "@/app/views/community/ShowCommunityView";
import CreateCommunityView from "@/app/views/community/CreateCommunityView";
import EditCommunityView from "@/app/views/community/EditCommunityView";
import CommunityStatsView from "@/app/views/community/CommunityStatsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas dentro del AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeView />} index />
          <Route path="/comunidad/crear" element={<CreateCommunityView />} />
          <Route path="/comunidad/mostrar" element={<ShowCommunityView />} />
          <Route path="/comunidad/editar/:id" element={<EditCommunityView />} />
          <Route path="/comunidad/miembros/:id" element={<EditCommunityView />} />
          <Route path="/comunidad/estadisticas/:id" element={<CommunityStatsView />} />
        </Route>

        {/* Rutas dentro del AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
