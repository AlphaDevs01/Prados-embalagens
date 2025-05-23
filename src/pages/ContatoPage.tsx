import ContatoForm from '../components/contato/ContatoForm';
import ContatoInfo from '../components/contato/ContatoInfo';
import { ContatoFormData } from '../types';

const ContatoPage = () => {
  const handleSubmit = (data: ContatoFormData) => {
    // Aqui você pode implementar a lógica de envio do formulário
    // Por exemplo, enviar para um endpoint de API ou WhatsApp
    console.log('Dados do formulário:', data);
    
    // Exemplo de redirecionamento para WhatsApp
    const message = `Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone}\nMensagem: ${data.mensagem}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">
          Entre em Contato
        </h1>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Estamos aqui para ajudar! Preencha o formulário abaixo ou utilize 
          um de nossos canais de atendimento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContatoForm onSubmit={handleSubmit} />
        <ContatoInfo />
      </div>
    </div>
  );
};

export default ContatoPage;