// src/core/community/actions/create-community.actions.ts

import { CommunityPostRequest } from "../interface/community.interface";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi"; // ajustá la ruta si es necesario

export const createCommunity = async (community: CommunityPostRequest): Promise<void> => {
  try {
    await viajateCorporationApi.post("/comunidad/comunidad", {
      nombre: community.name,
      descripcion: community.description,
      localidad_id: community.locationId,
      tipo_comunidad_id: community.communityTypeId,
      email: community.email,
      telefono: community.phone,
      cuit: community.cuit,
      web_url: community.website,
      calle: community.street,
      altura: community.streetNumber,
      numero_piso: community.floorNumber,
      lat: community.latitude,
      lng: community.longitude,
    });
  } catch (error) {
    console.error("Error al crear comunidad:", error);
    throw error;
  }
};
