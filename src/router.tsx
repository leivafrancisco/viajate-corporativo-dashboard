import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import DashboardView from "@/app/views/DashboardView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
