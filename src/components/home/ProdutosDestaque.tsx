import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Produto } from '../../types';
import { useProdutosStore } from '../../store/produtosStore';
import { ArrowRight } from 'lucide-react';

const ProdutosDestaque = () => {
  const { produtos } = useProdutosStore();
  const [produtosDestaque, setProdutosDestaque] = useState<Produto[]>([]);
  
  useEffect(() => {
    // Filtra produtos marcados como destaque
    const destaques = produtos.filter(produto => produto.destaque);
    setProdutosDestaque(destaques);
  }, [produtos]);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-800">
            Produtos em Destaque
          </h2>
          <Link 
            to="/catalogo" 
            className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
          >
            Ver todos <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtosDestaque.map((produto) => (
            <div 
              key={produto.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-secondary-600 line-clamp-2 mb-4">
                  {produto.descricao}
                </p>
                <div className="flex items-center justify-between">
                  <span className="bg-primary-100 text-primary-600 text-sm font-medium px-3 py-1 rounded-full">
                    {produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}
                  </span>
                  <Link 
                    to={`/catalogo`} 
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdutosDestaque;