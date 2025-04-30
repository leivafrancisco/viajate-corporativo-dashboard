// src/core/community/interface/community.interface.ts

export interface CommunityPostRequest {
  name: string;
  description: string;
  locationId: number;
  communityTypeId: number;
  email: string;
  phone: string;
  cuit: string;
  website: string;
  street: string;
  streetNumber: number;
  floorNumber: number;
  latitude: number;
  longitude: number;
}


export interface CommunityGetRequest {
  id:             number;
  nombre:         string;
  descripcion:    string;
  codigo_acceso:  string;
  habilitada:     boolean;
  foto_perfil:    string;
  localidad:      string;
  provincia:      string;
  pais:           string;
  tipo_comunidad: string;
  email:          string;
  telefono:       string;
  cuit:           string;
  web_url:        string;
  calle:          string;
  altura:         number;
  numero_piso:    number;
  lat:            number;
  lng:            number;
}