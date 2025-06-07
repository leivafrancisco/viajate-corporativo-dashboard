import { Community } from "../interface/community.interface";
import { CommunityDBResponse } from "../interface/communityDBResponse.interface";

// Mapper seguro
export const mapCommunity = (
  response: CommunityDBResponse
): Community[] => {
  const comunidades = response?.data?.comunidades;
  if (!Array.isArray(comunidades)) {
    return [];
  }
  return comunidades.map((community) => ({
    id: community.id,
    nombre: community.nombre,
    descripcion: community.descripcion,
    codigo_acceso: community.codigo_acceso,
    habilitada: community.habilitada,
    foto_perfil: community.foto_perfil,
  }));
};
