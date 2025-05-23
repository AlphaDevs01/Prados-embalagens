import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Categoria } from '../types';
import { api } from '../lib/api';
import { useAuthStore } from './authStore';

interface CategoriasState {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  fetchCategorias: () => Promise<void>;
  addCategoria: (categoria: Omit<Categoria, 'id'>) => Promise<void>;
  updateCategoria: (id: string, categoria: Partial<Categoria>) => Promise<void>;
  deleteCategoria: (id: string) => Promise<void>;
  getCategoriaById: (id: string) => Categoria | undefined;
}

export const useCategoriasStore = create<CategoriasState>()(
  persist(
    (set, get) => ({
      categorias: [],
      loading: false,
      error: null,
      fetchCategorias: async () => {
        set({ loading: true, error: null });
        try {
          const categorias = await api.categories.getAll();
          set({ categorias, loading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar categorias', loading: false });
        }
      },
      addCategoria: async (categoria) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          const novaCategoria = await api.categories.create(categoria, token);
          set((state) => ({
            categorias: [...state.categorias, novaCategoria],
          }));
        } catch (error) {
          throw new Error('Erro ao adicionar categoria');
        }
      },
      updateCategoria: async (id, categoria) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          const categoriaAtualizada = await api.categories.update(id, categoria, token);
          set((state) => ({
            categorias: state.categorias.map((c) =>
              c.id === id ? categoriaAtualizada : c
            ),
          }));
        } catch (error) {
          throw new Error('Erro ao atualizar categoria');
        }
      },
      deleteCategoria: async (id) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          await api.categories.delete(id, token);
          set((state) => ({
            categorias: state.categorias.filter((c) => c.id !== id),
          }));
        } catch (error) {
          throw new Error('Erro ao deletar categoria');
        }
      },
      getCategoriaById: (id) => {
        return get().categorias.find((c) => c.id === id);
      },
    }),
    {
      name: 'categorias-storage',
    }
  )
);