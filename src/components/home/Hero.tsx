import { ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-primary-500 text-white">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Soluções completas em embalagens para o seu negócio
            </h1>
            <p className="text-lg mb-8 text-primary-50">
              Oferecemos uma ampla variedade de embalagens personalizadas, 
              desde caixas e sacolas até soluções para e-commerce e delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalogo" 
                className="bg-white text-primary-600 font-medium py-3 px-6 rounded-md hover:bg-primary-50 transition-colors flex items-center justify-center"
              >
                Ver Catálogo <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/contato" 
                className="border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-xl">
              <Package size={120} className="text-white/80 mx-auto" />
              <div className="absolute -top-2 -left-2 bg-primary-400 text-white text-sm font-medium py-1 px-3 rounded-full">
                Produtos Personalizados
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white text-sm font-medium py-1 px-3 rounded-full">
                Entrega para Todo Brasil
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;