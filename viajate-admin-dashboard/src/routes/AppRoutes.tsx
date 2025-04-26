// src/dashboard/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from '../auth/pages/SignInPage';
import SignUpPage from '../auth/pages/SignUpPage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
         
      </Routes>
    </BrowserRouter>
  );
};
