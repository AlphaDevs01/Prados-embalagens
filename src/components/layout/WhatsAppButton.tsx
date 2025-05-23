import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '5511999999999'; // Número de exemplo (ajuste para o número real)
  const message = 'Olá! Gostaria de saber mais sobre os produtos.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;