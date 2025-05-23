import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2, ListPlus, FolderPlus } from 'lucide-react';
import { useProdutosStore } from '../store/produtosStore';
import { useCategoriasStore } from '../store/categoriasStore';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { produtos } = useProdutosStore();
  const { categorias } = useCategoriasStore();
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('');

  useEffect(() => {
    // Encontra o produto mais recentemente atualizado
    const produtoMaisRecente = produtos.reduce((mais, atual) => {
      return new Date(atual.createdAt) > new Date(mais.createdAt) ? atual : mais;
    }, produtos[0]);

    if (produtoMaisRecente) {
      setUltimaAtualizacao(new Date(produtoMaisRecente.createdAt).toLocaleDateString('pt-BR'));
    }
  }, [produtos]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">
        Dashboard Administrativo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-700">Total de Produtos</h2>
            <Package2 size={24} className="text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-secondary-800">{produtos.length}</p>
          <p className="text-sm text-secondary-500 mt-2">
            Última atualização: {ultimaAtualizacao}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-700">Categorias</h2>
            <FolderPlus size={24} className="text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-secondary-800">{categorias.length}</p>
          <p className="text-sm text-secondary-500 mt-2">
            Categorias ativas no catálogo
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-700">Ações Rápidas</h2>
            <ListPlus size={24} className="text-primary-500" />
          </div>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/produtos/novo')}
              className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
            >
              Adicionar Novo Produto
            </button>
            <button
              onClick={() => navigate('/admin/categorias')}
              className="w-full border border-primary-500 text-primary-500 font-medium py-2 px-4 rounded-md hover:bg-primary-50 transition-colors"
            >
              Gerenciar Categorias
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-secondary-800 mb-4">
          Produtos Recentes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-secondary-600">Nome</th>
                <th className="text-left py-3 px-4 text-secondary-600">Categoria</th>
                <th className="text-left py-3 px-4 text-secondary-600">Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {produtos.slice(0, 5).map((produto) => (
                <tr key={produto.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{produto.nome}</td>
                  <td className="py-3 px-4">{produto.categoria}</td>
                  <td className="py-3 px-4">
                    {new Date(produto.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;