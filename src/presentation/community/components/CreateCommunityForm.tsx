import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateCommunityRequest } from "@/core/community/interface/community.interface";
import { useCommunityTypes } from "../hook/useCommunityTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommunity } from "@/core/community/actions/create-community.action";
import { toast } from "sonner";

export const CreateCommunityForm = () => {
  const queryClient = useQueryClient();
  const { communityTypesQuery } = useCommunityTypes();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateCommunityRequest>({
    defaultValues: {
      localidad_id: 12,
      tipo_comunidad_id: undefined,
    },
  });

  useEffect(() => {
    const tipos = communityTypesQuery.data?.data.TipoComunidades;
    if (tipos && tipos.length > 0) {
      setValue('tipo_comunidad_id', tipos[0].id);
    }
  }, [communityTypesQuery.data, setValue]);

  const createCommunityMutation = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      toast.success("Comunidad creada exitosamente");
      queryClient.invalidateQueries({ queryKey: ["community"] });
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CreateCommunityRequest) => {
    createCommunityMutation.mutate(data);
  };

  return (
    <Card sx={{ p: 4, borderRadius: 4, boxShadow: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Crear Nueva Comunidad
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Nombre"
            {...register("nombre", { required: "El nombre es requerido" })}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            fullWidth
          />
          <TextField
            label="Descripción"
            multiline
            rows={2}
            {...register("descripcion", { required: "La descripción es requerida" })}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
            fullWidth
          />
          <FormControl fullWidth error={!!errors.tipo_comunidad_id}>
            <InputLabel>Tipo de Comunidad</InputLabel>
            <Select
              label="Tipo de Comunidad"
              value={watch('tipo_comunidad_id') || ''}
              {...register("tipo_comunidad_id", {
                required: "El tipo de comunidad es requerido",
              })}
              onChange={e => setValue('tipo_comunidad_id', Number(e.target.value))}
            >
              {communityTypesQuery.data?.data.TipoComunidades.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.tipo}
                </MenuItem>
              ))}
            </Select>
            {errors.tipo_comunidad_id && (
              <FormHelperText>{errors.tipo_comunidad_id.message}</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Teléfono"
            {...register("telefono", { required: "El teléfono es requerido" })}
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
            fullWidth
          />
          <TextField
            label="CUIT"
            {...register("cuit", { required: "El CUIT es requerido" })}
            error={!!errors.cuit}
            helperText={errors.cuit?.message}
            fullWidth
          />
          <TextField
            label="URL del Sitio Web"
            {...register("web_url")}
            error={!!errors.web_url}
            helperText={errors.web_url?.message}
            fullWidth
          />
          <TextField
            label="Dirección"
            {...register("street_address", { required: "La dirección es requerida" })}
            error={!!errors.street_address}
            helperText={errors.street_address?.message}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, fontWeight: 600, py: 1.5 }}
            disabled={createCommunityMutation.isPending}
          >
            {createCommunityMutation.isPending ? "Creando..." : "Crear Comunidad"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 