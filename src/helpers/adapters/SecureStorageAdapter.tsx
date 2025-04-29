import { toast } from "sonner";

export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      const item = { value };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      window.alert("Error en guardar los datos: " + error);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const item = JSON.parse(raw);
      const token = item.value;

      // ✅ Si parece un JWT, validamos el campo "exp"
      if (typeof token === "string" && token.split(".").length === 3) {
        const [, payloadBase64] = token.split(".");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        if (payload.exp) {
          const expMillis = payload.exp * 1000;
          if (Date.now() >= expMillis) {
            localStorage.removeItem(key);
            toast.error(
              "Tu sesión ha expirado. Por favor, iniciá sesión nuevamente."
            );
            return null;
          }
        }
      }

      return token;
    } catch (error) {
      window.alert("Error en obtener los datos: " + error);
      return null;
    }
  }

  static async deleteItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      window.alert("Error en eliminar los datos: " + error);
    }
  }
}
