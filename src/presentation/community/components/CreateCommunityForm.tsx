import { useEffect, useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateCommunityRequest } from "@/core/community/interface/community.interface";
import { useCommunityTypes } from "../hook/useCommunityTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommunity } from "@/core/community/actions/create-community.action";
import { toast } from "sonner";
import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";

// Hook para obtener países, provincias y localidades
const useCountries = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    viajateCorporationApi.get("/administracion/paises")
      .then(({ data }) => setCountries(data.data.paises))
      .catch(() => setError("Error al cargar países"))
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading, error };
};

export const CreateCommunityForm = () => {
  const queryClient = useQueryClient();
  const { communityTypesQuery } = useCommunityTypes();
  const { countries, loading: loadingCountries, error: errorCountries } = useCountries();

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
      numero_piso: 0,
    },
  });

  // Estado para el email del admin y el usuario encontrado
  const [adminEmail, setAdminEmail] = useState("");
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Valores por defecto: Corrientes
  const [lat, setLat] = useState<number | "">(-27.4746);
  const [lng, setLng] = useState<number | "">(-58.846699);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedLocalidadId, setSelectedLocalidadId] = useState<number | null>(null);

  useEffect(() => {
    const tipos = communityTypesQuery.data?.data?.TipoComunidades;
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

  // Buscar usuario por email
  const handleAdminEmailBlur = async () => {
    setAdminError(null);
    setAdminUser(null);
    if (!adminEmail) return;
    setIsSearching(true);
    try {
      const { data } = await viajateCorporationApi.get(`/administracion/user?Email=${adminEmail}`);
      console.log('Respuesta búsqueda usuario:', data);
      if (data?.data?.id) {
        setAdminUser(data.data);
      } else {
        setAdminError("No se encontró un usuario con ese email");
      }
    } catch (e) {
      setAdminError("No se encontró un usuario con ese email");
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = (data: CreateCommunityRequest) => {
    if (!adminUser?.id) {
      setAdminError("Debes buscar y seleccionar un administrador válido antes de crear la comunidad.");
      return;
    }
    if (!selectedLocalidadId) {
      alert("Debes seleccionar una localidad válida.");
      return;
    }
    if (lat === "" || lng === "") {
      alert("Debes ingresar latitud y longitud.");
      return;
    }
    createCommunityMutation.mutate({
      ...data,
      usuarios_id: adminUser.id,
      localidad_id: selectedLocalidadId,
      lat: Number(lat),
      lng: Number(lng),
    });
  };

  if (communityTypesQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (communityTypesQuery.isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar los tipos de comunidad: {communityTypesQuery.error instanceof Error ? communityTypesQuery.error.message : 'Error desconocido'}
      </Alert>
    );
  }

  const tiposComunidad = communityTypesQuery.data?.data?.TipoComunidades || [];

  return (
    <Card sx={{ p: 4, borderRadius: 4, boxShadow: 3, maxWidth: 900, minWidth: 400, width: '100%', mx: "auto", mt: 4 }}>
      <CardContent>
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
              {tiposComunidad.map((type) => (
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
            {...register("email", { required: "El email es requerido" })}
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
            label="URL del sitio web"
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
          <TextField
            label="Número de piso"
            type="number"
            defaultValue={0}
            {...register("numero_piso", {
              valueAsNumber: true,
              setValueAs: (value) => {
                if (value === "" || value === null || value === undefined) return 0;
                return Number(value);
              }
            })}
            error={!!errors.numero_piso}
            helperText={errors.numero_piso?.message}
            fullWidth
          />
          <TextField
            label="Email del administrador"
            value={adminEmail}
            onChange={e => setAdminEmail(e.target.value)}
            onBlur={handleAdminEmailBlur}
            error={!!adminError}
            helperText={adminError || "Ingresa el email y sal del campo para buscar"}
            fullWidth
            required
          />
          {isSearching && <Typography variant="body2">Buscando usuario...</Typography>}
          {adminUser && !adminError && (
            <Typography variant="body2" color="success.main">
              Usuario encontrado: {adminUser.nombre} {adminUser.apellido} ({adminUser.email})
            </Typography>
          )}
          <FormControl fullWidth required>
            <InputLabel>País</InputLabel>
            <Select
              value={selectedCountry}
              label="País"
              onChange={e => {
                setSelectedCountry(e.target.value);
                setSelectedProvince("");
                setSelectedLocalidadId(null);
              }}
            >
              {countries.map((pais) => (
                <MenuItem key={pais.nombre} value={pais.nombre}>{pais.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required disabled={!selectedCountry}>
            <InputLabel>Provincia</InputLabel>
            <Select
              value={selectedProvince}
              label="Provincia"
              onChange={e => {
                setSelectedProvince(e.target.value);
                setSelectedLocalidadId(null);
              }}
            >
              {countries.find(p => p.nombre === selectedCountry)?.provincias.map((prov: any) => (
                <MenuItem key={prov.nombre} value={prov.nombre}>{prov.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required disabled={!selectedProvince}>
            <InputLabel>Localidad</InputLabel>
            <Select
              value={selectedLocalidadId || ""}
              label="Localidad"
              onChange={e => {
                const id = Number(e.target.value);
                setSelectedLocalidadId(id);
                // Datos estáticos para demo
                if (id === 12) { // Corrientes
                  setLat(-27.4746);
                  setLng(-58.846699);
                } else if (id === 13) { // Goya
                  setLat(-29.1406);
                  setLng(-59.2626);
                }
              }}
            >
              {countries.find(p => p.nombre === selectedCountry)?.provincias.find((prov: any) => prov.nombre === selectedProvince)?.localidades.map((loc: any) => (
                <MenuItem key={loc.id} value={loc.id}>{loc.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Latitud"
            type="number"
            value={lat}
            onChange={e => setLat(e.target.value === "" ? "" : Number(e.target.value))}
            required
            fullWidth
          />
          <TextField
            label="Longitud"
            type="number"
            value={lng}
            onChange={e => setLng(e.target.value === "" ? "" : Number(e.target.value))}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={createCommunityMutation.isPending}
            sx={{ mt: 2 }}
          >
            {createCommunityMutation.isPending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Creando...
              </>
            ) : (
              "Crear Comunidad"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 