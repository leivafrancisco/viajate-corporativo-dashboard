// src/dashboard/modules/auth/hooks/useAuth.ts
export const useAuth = () => {
    const signIn = (email: string, password: string) => {
      console.log('Iniciando sesión con', email, password);
      // Simular login
      localStorage.setItem('token', 'fake-token');
      window.location.href = '/';
    };
  
    const signUp = (email: string, password: string) => {
      console.log('Registrando con', email, password);
      // Simular registro
      localStorage.setItem('token', 'fake-token');
      window.location.href = '/';
    };
  
    return {
      signIn,
      signUp,
    };
  };
  