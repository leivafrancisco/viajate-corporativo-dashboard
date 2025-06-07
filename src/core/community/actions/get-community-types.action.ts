import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import { TipoComunidadResponse } from "../interface/community.interface";

export const getCommunityTypes = async (): Promise<TipoComunidadResponse> => {
  try {
    const { data } = await viajateCorporationApi.get<TipoComunidadResponse>(
      "/comunidad/tipo-comunidad"
    );

    if (!data.data?.TipoComunidades) {
      throw new Error("No se encontraron tipos de comunidad");
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para ver los tipos de comunidad");
      }
      throw new Error(
        error.response?.data?.message || `Error al cargar tipos de comunidad: ${error.response?.status}`
      );
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al cargar tipos de comunidad"
    );
  }
}; 