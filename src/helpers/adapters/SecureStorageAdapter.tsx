export class SecureStorageAdapter {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      const item = { value };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
      throw new Error("Error al guardar los datos");
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const item = JSON.parse(raw);
      return item.value;
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      return null;
    }
  }

  static async deleteItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error al eliminar de localStorage:", error);
      throw new Error("Error al eliminar los datos");
    }
  }
}
