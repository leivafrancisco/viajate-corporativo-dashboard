// src/core/community/mappers/community.mapper.ts

import { Comunidad } from "../interface/communityDBResponse.interface";
import { CommunityGetRequest } from "../interface/community.interface";

/**
 * Mapea un objeto de base de datos (Comunidad) al modelo del frontend (CommunityGetRequest)
 */
export const mapCommunity = (db: Comunidad): CommunityGetRequest => ({
  id: db.id,
  nombre: db.nombre,
  descripcion: db.descripcion,
  codigo_acceso: db.codigo_acceso,
  habilitada: db.habilitada,
  foto_perfil: db.foto_perfil,
  localidad: db.localidad,
  provincia: db.provincia,
  pais: db.pais,
  tipo_comunidad: db.tipo_comunidad,
  email: db.email,
  telefono: db.telefono,
  cuit: db.cuit,
  web_url: db.web_url,
  calle: db.calle,
  altura: db.altura,
  numero_piso: db.numero_piso,
  lat: db.lat,
  lng: db.lng,
});
