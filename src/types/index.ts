export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  categoria: string;
  dimensoes?: string;
  destaque: boolean;
  createdAt: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
}

export interface Usuario {
  email: string;
  senha: string;
}

export interface ContatoFormData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}