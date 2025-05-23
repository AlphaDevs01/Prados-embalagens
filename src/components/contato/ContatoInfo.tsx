import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContatoInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h2 className="text-2xl font-semibold text-secondary-800 mb-6">Informações de Contato</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin size={24} className="text-primary-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-secondary-800 mb-1">Endereço</h3>
            <p className="text-secondary-600">
              Av. Paulista, 1000<br />
              Bela Vista, São Paulo - SP<br />
              CEP: 01310-100
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone size={24} className="text-primary-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-secondary-800 mb-1">Telefone</h3>
            <p className="text-secondary-600">
              <a href="tel:+551199999999" className="hover:text-primary-500 transition-colors">
                (11) 9999-9999
              </a><br />
              <a href="tel:+551132323232" className="hover:text-primary-500 transition-colors">
                (11) 3232-3232
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail size={24} className="text-primary-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-secondary-800 mb-1">E-mail</h3>
            <p className="text-secondary-600">
              <a href="mailto:contato@embalagenspro.com.br" className="hover:text-primary-500 transition-colors">
                contato@embalagenspro.com.br
              </a><br />
              <a href="mailto:vendas@embalagenspro.com.br" className="hover:text-primary-500 transition-colors">
                vendas@embalagenspro.com.br
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock size={24} className="text-primary-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-secondary-800 mb-1">Horário de Atendimento</h3>
            <p className="text-secondary-600">
              Segunda a Sexta: 8h às 18h<br />
              Sábado: 9h às 13h
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-secondary-800 mb-4">Localização</h3>
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976401071385!2d-46.65390338502164!3d-23.563403884681652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1628001111111!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Embalagens Pro"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContatoInfo;