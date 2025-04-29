export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      const item = { value };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      window.alert("Error en guardar los datos: " + error);
    }
  }

  static async getItem(key: string) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const item = JSON.parse(raw);
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
