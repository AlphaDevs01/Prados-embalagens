import { Shield, Truck, Recycle } from 'lucide-react';

const SobreEmpresa = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-secondary-800 mb-4">
              Conheça a Prados Embalagens
            </h2>
            <p className="text-secondary-600 mb-6">
              Há mais de 15 anos no mercado, somos especialistas em soluções personalizadas de embalagens 
              para empresas de todos os portes. Nossa missão é oferecer produtos de alta qualidade que 
              agregam valor à marca dos nossos clientes.
            </p>
            <p className="text-secondary-600 mb-6">
              Contamos com um parque industrial moderno e equipe qualificada, garantindo a produção 
              de embalagens que atendem às mais rigorosas exigências do mercado, sempre com compromisso 
              com a sustentabilidade e o meio ambiente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Shield size={24} className="text-primary-500 mb-2" />
                <h3 className="font-semibold text-secondary-800 mb-1">Qualidade</h3>
                <p className="text-sm text-secondary-600">Matérias-primas selecionadas e controle rigoroso</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Truck size={24} className="text-primary-500 mb-2" />
                <h3 className="font-semibold text-secondary-800 mb-1">Logística</h3>
                <p className="text-sm text-secondary-600">Entrega para todo o Brasil com rapidez</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Recycle size={24} className="text-primary-500 mb-2" />
                <h3 className="font-semibold text-secondary-800 mb-1">Sustentável</h3>
                <p className="text-sm text-secondary-600">Compromisso com práticas ecológicas</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative h-full">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Fábrica de Prados Embalagens" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white shadow-lg p-6 rounded-lg absolute -bottom-6 -right-6 max-w-xs">
                <p className="text-secondary-600 italic">
                  "Nosso compromisso é fornecer embalagens que não apenas protejam seu produto, 
                  mas também contem sua história através do design."
                </p>
                <p className="text-primary-500 font-semibold mt-4">
                  Maria Silva
                </p>
                <p className="text-sm text-secondary-500">
                  CEO, Prados Embalagens
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreEmpresa;