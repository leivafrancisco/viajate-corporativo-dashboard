import axios from "axios";
import { SecureStorageAdapter } from "@/helpers/adapters/SecureStorageAdapter";
import { env } from "@/config/env";

const STAGE = env.STAGE || "dev";

const API_URL = STAGE === "prod" ? env.API_URL_PROD : env.API_URL_DEV;

console.log(API_URL);

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
  }

  return config;
});

export { viajateCorporationApi };
