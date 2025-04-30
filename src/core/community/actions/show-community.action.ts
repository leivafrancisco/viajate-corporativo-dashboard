// src/core/community/actions/show-community.actions.ts

import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import { CommunityDBResponse } from "../interface/communityDBResponse.interface";
import { CommunityGetRequest } from "../interface/community.interface";
import { mapCommunity } from "../mappers/community.mapper";

export const getCommunities = async (): Promise<CommunityGetRequest[]> => {
  try {
    const { data } = await viajateCorporationApi.get<CommunityDBResponse>(
      "/comunidad/comunidades"
    );

    const comunidades = data.data.comunidades.map(mapCommunity);

    console.log("Comunidades obtenidas:", comunidades); // <-- Aquí ves el resultado

    return comunidades;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || `Error de API: ${error.response?.status}`
      );
    }

    throw new Error(
      error instanceof Error ? error.message : "Error desconocido al obtener comunidades"
    );
  }
};
