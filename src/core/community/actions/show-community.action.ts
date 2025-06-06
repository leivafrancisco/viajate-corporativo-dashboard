import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import { CommunityDBResponse } from "../interface/communityDBResponse.interface";
import { Community } from "../interface/community.interface";
import { mapCommunity } from "../mappers/community.mapper";

export const getCommunities = async (): Promise<Community[]> => {
  try {
    const { data } = await viajateCorporationApi.get<CommunityDBResponse>(
      "/comunidad/comunidades"
    );

    return mapCommunity(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para ver las comunidades. Por favor, verifica tu rol y permisos.");
      }
      throw new Error(
        error.response?.data?.message || `Error al cargar comunidades: ${error.response?.status}`
      );
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al cargar comunidades"
    );
  }
};
