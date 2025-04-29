import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createMyCommunity } from "../../../core/community/actions/create-community.action"; // Ajustá la ruta si cambia

interface FormValues {
  nombre: string;
  descripcion: string;
}

export default function CreateCommunityView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setMessage(null);
    setError(null);
    try {
      const response = await createMyCommunity(data);
      if (response.status) {
        setMessage("¡Comunidad creada exitosamente!");
        reset();
      } else {
        setError("No se pudo crear la comunidad.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Crear comunidad
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre de la comunidad"
          {...register("nombre", { required: "Este campo es obligatorio" })}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          fullWidth
        />

        <TextField
          label="Descripción"
          {...register("descripcion", { required: "Este campo es obligatorio" })}
          error={!!errors.descripcion}
          helperText={errors.descripcion?.message}
          multiline
          rows={3}
          fullWidth
        />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Crear Comunidad"}
        </Button>
      </Box>
    </Box>
  );
}
