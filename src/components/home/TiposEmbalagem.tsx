import { Box, ShoppingBag, Coffee, FileText } from 'lucide-react';

const TiposEmbalagem = () => {
  const tipos = [
    {
      id: 1,
      nome: 'Caixas',
      descricao: 'Diversos tamanhos e materiais para suas necessidades',
      icone: <Box size={40} className="text-primary-500 group-hover:text-white transition-colors" />,
    },
    {
      id: 2,
      nome: 'Sacolas',
      descricao: 'Papel, plástico e tecido em várias cores e tamanhos',
      icone: <ShoppingBag size={40} className="text-primary-500 group-hover:text-white transition-colors" />,
    },
    {
      id: 3,
      nome: 'Alimentação',
      descricao: 'Embalagens específicas para alimentos e delivery',
      icone: <Coffee size={40} className="text-primary-500 group-hover:text-white transition-colors" />,
    },
    {
      id: 4,
      nome: 'Papelaria',
      descricao: 'Produtos personalizados para sua identidade visual',
      icone: <FileText size={40} className="text-primary-500 group-hover:text-white transition-colors" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">
            Soluções para Todos os Segmentos
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Oferecemos uma ampla variedade de embalagens para atender 
            às necessidades específicas de cada segmento do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tipos.map((tipo) => (
            <div 
              key={tipo.id}
              className="group bg-white p-6 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-primary-500 hover:text-white border border-gray-100"
            >
              <div className="mb-4">
                {tipo.icone}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary-800 group-hover:text-white transition-colors">
                {tipo.nome}
              </h3>
              <p className="text-secondary-600 group-hover:text-white/90 transition-colors">
                {tipo.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiposEmbalagem;