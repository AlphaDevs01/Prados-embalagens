import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, senha: string) => {
        try {
          const response = await api.auth.login(email, senha);
          set({ 
            isAuthenticated: true, 
            user: response.user,
            token: response.token
          });
          return true;
        } catch (error) {
          return false;
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);