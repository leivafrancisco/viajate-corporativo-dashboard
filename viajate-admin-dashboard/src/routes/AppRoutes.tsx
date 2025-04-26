// src/dashboard/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from '../auth/pages/SignInPage';
import SignUpPage from '../auth/pages/SignUpPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import DashboardPage from '../dashboard/pages/DashboardPage';
import UsersPage from '../users/pages/UsersPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
                {/* Rutas públicas */}

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
         
          {/* Rutas privadas */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
