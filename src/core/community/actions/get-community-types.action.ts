import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import { TipoComunidadResponse } from "../interface/community.interface";

export const getCommunityTypes = async (): Promise<TipoComunidadResponse> => {
  try {
    const { data } = await viajateCorporationApi.get<TipoComunidadResponse>(
      "/comunidad/tipo-comunidad"
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || `API Error: ${error.response?.status}`
      );
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al cargar tipos de comunidad"
    );
  }
}; 