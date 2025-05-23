import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Produto } from '../types';
import { api } from '../lib/api';
import { useAuthStore } from './authStore';

interface ProdutosState {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  fetchProdutos: () => Promise<void>;
  addProduto: (produto: Omit<Produto, 'id' | 'createdAt'>) => Promise<void>;
  updateProduto: (id: string, produto: Partial<Produto>) => Promise<void>;
  deleteProduto: (id: string) => Promise<void>;
  getProdutoById: (id: string) => Produto | undefined;
}

export const useProdutosStore = create<ProdutosState>()(
  persist(
    (set, get) => ({
      produtos: [],
      loading: false,
      error: null,
      fetchProdutos: async () => {
        set({ loading: true, error: null });
        try {
          const produtos = await api.products.getAll();
          set({ produtos, loading: false });
        } catch (error) {
          set({ error: 'Erro ao carregar produtos', loading: false });
        }
      },
      addProduto: async (produto) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          const novoProduto = await api.products.create(produto, token);
          set((state) => ({
            produtos: [...state.produtos, novoProduto],
          }));
        } catch (error) {
          throw new Error('Erro ao adicionar produto');
        }
      },
      updateProduto: async (id, produto) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          const produtoAtualizado = await api.products.update(id, produto, token);
          set((state) => ({
            produtos: state.produtos.map((p) =>
              p.id === id ? produtoAtualizado : p
            ),
          }));
        } catch (error) {
          throw new Error('Erro ao atualizar produto');
        }
      },
      deleteProduto: async (id) => {
        const token = useAuthStore.getState().token;
        if (!token) throw new Error('Não autorizado');
        try {
          await api.products.delete(id, token);
          set((state) => ({
            produtos: state.produtos.filter((p) => p.id !== id),
          }));
        } catch (error) {
          throw new Error('Erro ao deletar produto');
        }
      },
      getProdutoById: (id) => {
        return get().produtos.find((p) => p.id === id);
      },
    }),
    {
      name: 'produtos-storage',
    }
  )
);