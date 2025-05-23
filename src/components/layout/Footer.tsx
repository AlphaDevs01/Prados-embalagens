import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const anoAtual = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Logo e Sobre */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo192.png" alt="Prados Embalagens" className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold text-white">Prados Embalagens</span>
            </div>
            <p className="text-secondary-200 mb-4">
              Soluções completas em embalagens para o seu negócio.
              Trabalhamos com materiais de alta qualidade e tecnologia
              de ponta para garantir o melhor para nossos clientes.
            </p>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-secondary-600 pb-2">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-200 hover:text-primary-300 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-secondary-200 hover:text-primary-300 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-secondary-200 hover:text-primary-300 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-secondary-600 pb-2">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="text-primary-400 mr-2" />
                <span className="text-secondary-200">
                  Av. Paulista, 1000, São Paulo - SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary-400 mr-2" />
                <a 
                  href="tel:+551199999999" 
                  className="text-secondary-200 hover:text-primary-300 transition-colors"
                >
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary-400 mr-2" />
                <a 
                  href="mailto:contato@pradosembalagens.com.br" 
                  className="text-secondary-200 hover:text-primary-300 transition-colors"
                >
                  contato@pradosembalagens.com.br
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Siga-nos</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-secondary-200 hover:text-primary-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-secondary-200 hover:text-primary-300 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-secondary-200 hover:text-primary-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-600 mt-10 pt-6 text-center text-secondary-300 text-sm">
          <p>&copy; {anoAtual} Prados Embalagens. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;