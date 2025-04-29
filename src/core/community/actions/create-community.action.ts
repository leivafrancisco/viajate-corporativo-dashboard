import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";

interface CommunmityData {
  nombre: string;
  descripcion: string;
}

interface CommunityDBResponse {
  message: string;
  status: boolean;
}

export const createMyCommunity = async (
  communityData: CommunmityData
): Promise<CommunityDBResponse> => {
  try {
    console.log(communityData);

    const { data } = await viajateCorporationApi.post<CommunityDBResponse>(
      "/comunidad/comunidad",
      communityData
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
        : "Error desconocido al crear una comunidad"
    );
  }
};
