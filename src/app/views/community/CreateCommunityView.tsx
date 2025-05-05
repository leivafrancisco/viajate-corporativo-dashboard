import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createMyCommunity } from "../../../core/community/actions/create-community.action";
import { getPaises } from "../../../core/api/getCountries";

interface FormValues {
  nombre: string;
  descripcion: string;
  email: string;
  telefono: string;
  cuit: string;
  web_url: string;
  calle: string;
  altura: number;
  numero_piso: number;
  lat: number;
  lng: number;
  localidad_id: number;
  tipo_comunidad_id: number;
  pais: string;
  provincia: string;
}

interface CommunmityData {
  nombre: string;
  descripcion: string;
  email: string;
  telefono: string;
  cuit: string;
  web_url: string;
  calle: string;
  altura: number;
  numero_piso: number;
  lat: number;
  lng: number;
  localidad_id: number;
  tipo_comunidad_id: number;
}

export default function CreateCommunityView() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paises, setPaises] = useState<any[]>([]);
  const [provinciaActual, setProvinciaActual] = useState<any[]>([]);

  const paisSeleccionado = watch("pais" as keyof FormValues);
  const provinciaSeleccionada = watch("provincia" as keyof FormValues);

  useEffect(() => {
    getPaises().then(setPaises).catch(() => setError("Error al obtener países"));
  }, []);

  useEffect(() => {
    const prov = paises.find((p) => p.nombre === paisSeleccionado)?.provincias || [];
    setProvinciaActual(prov);
  }, [paisSeleccionado, paises]);

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setMessage(null);
    try {
      const {
        nombre,
        descripcion,
        email,
        telefono,
        cuit,
        web_url,
        calle,
        altura,
        numero_piso,
        lat,
        lng,
        localidad_id,
        tipo_comunidad_id,
      } = data;

      const payload: CommunmityData = {
        nombre,
        descripcion,
        email,
        telefono,
        cuit,
        web_url,
        calle,
        altura,
        numero_piso,
        lat,
        lng,
        localidad_id,
        tipo_comunidad_id,
      };

      const response = await createMyCommunity(payload);
      if (response.status) {
        setMessage("¡Comunidad creada correctamente!");
        reset();
      } else {
        setError("Error al crear comunidad.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h4">Crear Comunidad</Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: "grid", gap: 2 }}>
        <TextField label="Nombre" {...register("nombre", { required: true })} />
        <TextField label="Descripción" {...register("descripcion", { required: true })} />
        <TextField label="Email" {...register("email", { required: true })} />
        <TextField label="Teléfono" {...register("telefono", { required: true })} />
        <TextField label="CUIT" {...register("cuit", { required: true })} />
        <TextField label="Sitio Web" {...register("web_url")} />
        <TextField label="Calle" {...register("calle", { required: true })} />
        <TextField type="number" label="Altura" {...register("altura", { required: true })} />
        <TextField type="number" label="Piso (0 si planta baja)" {...register("numero_piso")} />
        <TextField type="number" label="Latitud" {...register("lat", { required: true })} />
        <TextField type="number" label="Longitud" {...register("lng", { required: true })} />
        <TextField type="number" label="Tipo Comunidad ID" {...register("tipo_comunidad_id", { required: true })} />

        <FormControl fullWidth>
          <InputLabel>País</InputLabel>
          <Controller
            name="pais"
            control={control}
            render={({ field }) => (
              <Select {...field} label="País">
                {paises.map((p: { nombre: string }) => (
                  <MenuItem key={p.nombre} value={p.nombre}>
                    {p.nombre}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Provincia</InputLabel>
          <Controller
            name="provincia"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Provincia">
                {provinciaActual.map((prov: { nombre: string }) => (
                  <MenuItem key={prov.nombre} value={prov.nombre}>
                    {prov.nombre}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Localidad</InputLabel>
          <Controller
            name="localidad_id"
            control={control}
            render={({ field }) => {
              const localidades =
                provinciaActual.find((prov: { nombre: string }) => prov.nombre === provinciaSeleccionada)
                  ?.localidades || [];
              return (
                <Select {...field} label="Localidad">
                  {localidades.map((loc: { id: number; nombre: string }) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      {loc.nombre}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </FormControl>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Crear Comunidad"}
        </Button>
      </Box>
    </Box>
  );
}
