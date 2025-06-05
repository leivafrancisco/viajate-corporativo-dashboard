import { useState, useEffect } from "react";
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
import { GooglePlacesAutocomplete } from "./GooglePlacesAutocomplete";

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
    <Card sx={{ overflow: 'visible' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Crear Nueva Comunidad
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("nombre", { required: "El nombre es requerido" })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                {...register("descripcion", { required: "La descripción es requerida" })}
                error={!!errors.descripcion}
                helperText={errors.descripcion?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
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
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                {...register("telefono", { required: "El teléfono es requerido" })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CUIT"
                {...register("cuit", { required: "El CUIT es requerido" })}
                error={!!errors.cuit}
                helperText={errors.cuit?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL del Sitio Web"
                {...register("web_url")}
                error={!!errors.web_url}
                helperText={errors.web_url?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                {...register("street_address", { required: "La dirección es requerida" })}
                error={!!errors.street_address}
                helperText={errors.street_address?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={createCommunityMutation.isPending}
              >
                {createCommunityMutation.isPending ? "Creando..." : "Crear Comunidad"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}; 