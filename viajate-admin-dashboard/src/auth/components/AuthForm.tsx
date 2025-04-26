// src/dashboard/modules/auth/components/AuthForm.tsx
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '300px',
        mx: 'auto',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" textAlign="center">
        {mode === 'signin' ? 'Iniciar sesión' : 'Registrarse'}
      </Typography>
      <TextField
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" type="submit">
        {mode === 'signin' ? 'Entrar' : 'Registrarse'}
      </Button>
    </Box>
  );
};
