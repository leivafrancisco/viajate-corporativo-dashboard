import { parseExpiresIn } from "../utils/parseExpiresIn";

type ExpirationOptions = {
  expiresIn?: string; // ej: "1h", "30m", "2d"
};

export class SecureStorageAdapter {
  static async setItem(
    key: string,
    value: string,
    options?: ExpirationOptions
  ) {
    try {
      const item = {
        value,
        expiresAt: options?.expiresIn
          ? Date.now() + parseExpiresIn(options.expiresIn)
          : null,
      };
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

      if (item.expiresAt && Date.now() > item.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
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
