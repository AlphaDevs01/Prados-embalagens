import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fechar o menu ao mudar de página
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo192.png" alt="Prados Embalagens" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-primary-500">Prados Embalagens</span>
        </Link>
        
        {/* Menu para Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`font-medium hover:text-primary-500 transition-colors ${
              location.pathname === '/' ? 'text-primary-500' : 'text-secondary-700'
            }`}
          >
            Início
          </Link>
          <Link 
            to="/catalogo" 
            className={`font-medium hover:text-primary-500 transition-colors ${
              location.pathname === '/catalogo' ? 'text-primary-500' : 'text-secondary-700'
            }`}
          >
            Catálogo
          </Link>
          <Link 
            to="/contato" 
            className={`font-medium hover:text-primary-500 transition-colors ${
              location.pathname === '/contato' ? 'text-primary-500' : 'text-secondary-700'
            }`}
          >
            Contato
          </Link>
        </nav>
        
        {/* Botão do Menu Mobile */}
        <button 
          className="md:hidden text-secondary-700 hover:text-primary-500 transition-colors"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium hover:text-primary-500 transition-colors py-2 ${
                location.pathname === '/' ? 'text-primary-500' : 'text-secondary-700'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/catalogo" 
              className={`font-medium hover:text-primary-500 transition-colors py-2 ${
                location.pathname === '/catalogo' ? 'text-primary-500' : 'text-secondary-700'
              }`}
            >
              Catálogo
            </Link>
            <Link 
              to="/contato" 
              className={`font-medium hover:text-primary-500 transition-colors py-2 ${
                location.pathname === '/contato' ? 'text-primary-500' : 'text-secondary-700'
              }`}
            >
              Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;