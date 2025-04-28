import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import CreateCommunityView from "@/app/views/community/CreateCommunityView";
import AuthLayout from "@/app/layouts/AuthLayout";
import LoginView from "@/app/views/auth/LoginView";
import HomeView from "@/app/views/HomeView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeView />} index />
          <Route path="/comunidad/crear" element={<CreateCommunityView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
