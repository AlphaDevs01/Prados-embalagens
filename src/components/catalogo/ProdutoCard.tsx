import { Box } from 'lucide-react';
import { Produto } from '../../types';

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        {produto.imagem ? (
          <img 
            src={produto.imagem} 
            alt={produto.nome}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary-100">
            <Box size={48} className="text-secondary-400" />
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-secondary-800 mb-2">
          {produto.nome}
        </h3>
        
        <p className="text-secondary-600 mb-4 flex-grow">
          {produto.descricao}
        </p>
        
        <div className="mt-auto">
          {produto.categoria && (
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
              {produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}
            </span>
          )}
          
          {produto.dimensoes && (
            <div className="text-sm text-secondary-500 mt-2">
              <span className="font-medium">Dimensões:</span> {produto.dimensoes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutoCard;