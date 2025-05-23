import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProdutosStore } from '../store/produtosStore';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

const AdminProdutosPage = () => {
  const { produtos, deleteProduto } = useProdutosStore();
  const [busca, setBusca] = useState('');

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduto(id);
    }
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">
          Gerenciar Produtos
        </h1>
        <Link
          to="/admin/produtos/novo"
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary-600">Imagem</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary-600">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary-600">Categoria</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary-600">Dimensões</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-secondary-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {produtosFiltrados.map((produto) => (
                <tr key={produto.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-secondary-800">{produto.nome}</p>
                      <p className="text-sm text-secondary-500 line-clamp-1">{produto.descricao}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary-600">
                    {produto.dimensoes || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/produtos/${produto.id}`}
                        className="text-secondary-600 hover:text-secondary-800"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(produto.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {produtosFiltrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-secondary-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProdutosPage;