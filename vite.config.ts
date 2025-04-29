import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@/core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@/presentation": fileURLToPath(new URL("./src/presentation", import.meta.url)),
    },
  },
});
