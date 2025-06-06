import axios from "axios";
import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import { CreateCommunityRequest, CreateCommunityResponse } from "../interface/community.interface";

export const createCommunity = async (
  communityData: CreateCommunityRequest
): Promise<CreateCommunityResponse> => {
  try {
    const { data } = await viajateCorporationApi.post<CreateCommunityResponse>(
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
        : "Error desconocido al crear la comunidad"
    );
  }
};
