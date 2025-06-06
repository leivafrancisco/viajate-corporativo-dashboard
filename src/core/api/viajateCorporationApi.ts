import axios from "axios";
import { SecureStorageAdapter } from "@/helpers/adapters/SecureStorageAdapter";
import { env } from "@/config/env";

const STAGE = env.STAGE || "dev";

const API_URL = STAGE === "prod" ? env.API_URL_PROD : env.API_URL_DEV;

console.log("API URL:", API_URL);

// Conectar mediante envs vars
const viajateCorporationApi = axios.create({
  baseURL: API_URL,
});

// Interceptores
viajateCorporationApi.interceptors.request.use(async (config) => {
  // Verificar si tenemos un token en el secure storage
  const token = await SecureStorageAdapter.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token enviado en la petición:", token.substring(0, 20) + "...");
  } else {
    console.warn("No se encontró token para la petición a:", config.url);
  }

  return config;
});

// Interceptor de respuesta para manejar errores
viajateCorporationApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Error 403 - Acceso denegado:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      });
    }
    return Promise.reject(error);
  }
);

export { viajateCorporationApi };
