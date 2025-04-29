import { Button, TextField, Paper } from "@mui/material";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Datos enviados:", data);
    // Aquí harías el login real (API call, etc.)
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar sesión
        </Button>
      </form>
    </Paper>
  );
}
