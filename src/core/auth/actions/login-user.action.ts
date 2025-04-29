import { viajateCorporationApi } from "@/core/api/viajateCorporationApi";
import axios from "axios";
import { mapUserResponse } from "../mapper/auth.mapper";
import { AuthDBResponse } from "../interface/authDBResponse.interface";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await viajateCorporationApi.post<AuthDBResponse>(
      "/auth/login",
      {
        email,
        password,
      }
    );

    return mapUserResponse(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || `API Error: ${error.response?.status}`
      );
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al iniciar sesión"
    );
  }
};
