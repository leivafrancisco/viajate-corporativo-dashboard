interface Env {
  STAGE: "prod" | "dev";
  API_URL_PROD: string;
  API_URL_DEV: string;
}

export const env: Env = {
  STAGE: import.meta.env.VITE_STAGE || "dev",
  API_URL_PROD: import.meta.env.VITE_API_URL_PROD,
  API_URL_DEV: import.meta.env.VITE_API_URL_DEV,
};
