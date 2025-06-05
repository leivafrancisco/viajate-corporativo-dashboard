import { create } from "zustand";
import { Usuario } from "@/core/auth/interface/auth.interface";
import { SecureStorageAdapter } from "@/helpers/adapters/SecureStorageAdapter";
import { loginUser } from "@/core/auth/actions/login-user.action";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: Usuario;
  refreshToken?: string;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (
    token?: string,
    user?: Usuario,
    refreshToken?: string
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  refreshToken: undefined,

  /**
   * Cambia el estado y guarda en storage.
   */
  changeStatus: async (
    token?: string,
    user?: Usuario,
    refreshToken?: string
  ): Promise<boolean> => {
    try {
      if (!token || !user || !refreshToken) {
        await get().logout();
        return false;
      }

      set({ status: "authenticated", token, user, refreshToken });

      await SecureStorageAdapter.setItem("token", token);
      await SecureStorageAdapter.setItem("refreshToken", refreshToken);
      await SecureStorageAdapter.setItem("user", JSON.stringify(user));

      return true;
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      await get().logout();
      return false;
    }
  },

  /**
   * Inicia sesión y guarda en storage.
   */
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const resp = await loginUser(email, password);
      return await get().changeStatus(resp.token, resp.usuario, resp.refreshToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Valida sesión desde el storage.
   */
  checkStatus: async (): Promise<void> => {
    try {
      const storedToken = await SecureStorageAdapter.getItem("token");
      const storedRefreshToken = await SecureStorageAdapter.getItem("refreshToken");
      const storedUser = await SecureStorageAdapter.getItem("user");

      if (!storedToken || !storedRefreshToken || !storedUser) {
        await get().logout();
        return;
      }

      const parsedUser: Usuario = JSON.parse(storedUser);
      await get().changeStatus(storedToken, parsedUser, storedRefreshToken);
    } catch (error) {
      console.error("Error al verificar estado:", error);
      await get().logout();
    }
  },

  /**
   * Cierra sesión y limpia storage.
   */
  logout: async (): Promise<void> => {
    try {
      await SecureStorageAdapter.deleteItem("token");
      await SecureStorageAdapter.deleteItem("refreshToken");
      await SecureStorageAdapter.deleteItem("user");

      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
        refreshToken: undefined,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Forzar el estado de logout incluso si hay error
      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
        refreshToken: undefined,
      });
    }
  },
}));
