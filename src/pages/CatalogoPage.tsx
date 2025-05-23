import { useState, useCallback } from 'react';
import { useProdutosStore } from '../store/produtosStore';
import FiltroCatalogo from '../components/catalogo/FiltroCatalogo';
import ProdutoCard from '../components/catalogo/ProdutoCard';

const CatalogoPage = () => {
  const { produtos } = useProdutosStore();
  const [filtros, setFiltros] = useState({ termo: '', categoria: '' });

  const handleFilterChange = useCallback((novosFiltros: { termo: string; categoria: string }) => {
    setFiltros(novosFiltros);
  }, []);

  const produtosFiltrados = produtos.filter(produto => {
    const matchTermo = produto.nome.toLowerCase().includes(filtros.termo.toLowerCase()) ||
                      produto.descricao.toLowerCase().includes(filtros.termo.toLowerCase());
    const matchCategoria = !filtros.categoria || produto.categoria.toLowerCase() === filtros.categoria.toLowerCase();
    return matchTermo && matchCategoria;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">
          Catálogo de Produtos
        </h1>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Explore nossa linha completa de embalagens profissionais. 
          Encontre a solução perfeita para o seu negócio.
        </p>
      </div>

      <FiltroCatalogo onFilterChange={handleFilterChange} />

      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary-600 text-lg">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
};

export default CatalogoPage;