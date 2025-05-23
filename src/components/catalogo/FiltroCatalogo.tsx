import { useState, useEffect } from 'react';
import { useCategoriasStore } from '../../store/categoriasStore';
import { Search } from 'lucide-react';

interface FiltroCatalogoProps {
  onFilterChange: (filtro: { termo: string; categoria: string }) => void;
}

const FiltroCatalogo: React.FC<FiltroCatalogoProps> = ({ onFilterChange }) => {
  const { categorias } = useCategoriasStore();
  const [termo, setTermo] = useState('');
  const [categoria, setCategoria] = useState('');
  
  // Atualiza os filtros quando os valores mudam
  useEffect(() => {
    onFilterChange({ termo, categoria });
  }, [termo, categoria, onFilterChange]);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-secondary-800 mb-4">Filtrar Produtos</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="termo" className="block text-sm font-medium text-secondary-600 mb-1">
            Buscar
          </label>
          <div className="relative">
            <input
              id="termo"
              type="text"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Digite para buscar..."
              className="w-full border border-secondary-200 rounded-md py-2 pl-10 pr-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
          </div>
        </div>
        
        <div className="w-full md:w-64">
          <label htmlFor="categoria" className="block text-sm font-medium text-secondary-600 mb-1">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border border-secondary-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700"
          >
            <option value="">Todas as Categorias</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nome.toLowerCase()}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-auto md:self-end">
          <button
            onClick={() => {
              setTermo('');
              setCategoria('');
            }}
            className="w-full md:w-auto bg-secondary-100 text-secondary-700 hover:bg-secondary-200 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltroCatalogo;