import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { toast } from "sonner"; 

import { Button, TextField, Paper, CircularProgress } from "@mui/material";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore"; 

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login } = useAuthStore(); 
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false); 

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true); 

    try {
      const success = await login(data.email, data.password);

      if (success) {
        toast.success("Inicio de sesión exitoso");
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al iniciar sesión";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <TextField
          label="Correo electrónico"
          type="email"
          {...register("email", { required: "El correo es obligatorio" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          label="Contraseña"
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          disabled={isLoading} 
          startIcon={isLoading ? <CircularProgress size={20} /> : null} 
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </form>
    </Paper>
  );
}
