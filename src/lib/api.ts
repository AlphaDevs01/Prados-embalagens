const API_URL = 'http://localhost:3000/api';

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }
      
      return response.json();
    },
  },
  
  products: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      return response.json();
    },
    create: async (product: any, token: string) => {
      // product já está em camelCase
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      return response.json();
    },
    update: async (id: string, product: any, token: string) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      return response.json();
    },
    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Erro ao excluir produto');
      return response.json();
    },
  },
  
  categories: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) throw new Error('Erro ao buscar categorias');
      return response.json();
    },
    create: async (category: any, token: string) => {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error('Erro ao criar categoria');
      return response.json();
    },
    update: async (id: string, category: any, token: string) => {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error('Erro ao atualizar categoria');
      return response.json();
    },
    delete: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Erro ao excluir categoria');
      return response.json();
    },
  },
};