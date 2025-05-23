import { useState } from 'react';
import { ContatoFormData } from '../../types';
import { Send } from 'lucide-react';

interface ContatoFormProps {
  onSubmit: (data: ContatoFormData) => void;
}

const ContatoForm: React.FC<ContatoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContatoFormData>({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });
  
  const [errors, setErrors] = useState<Partial<ContatoFormData>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof ContatoFormData]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<ContatoFormData> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
      
      // Reseta o formulário após o envio
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-secondary-800 mb-6">Entre em Contato</h2>
      
      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-secondary-700 mb-1">
          Nome Completo *
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={`w-full border ${
            errors.nome ? 'border-red-500' : 'border-secondary-200'
          } rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700`}
        />
        {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border ${
            errors.email ? 'border-red-500' : 'border-secondary-200'
          } rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="telefone" className="block text-sm font-medium text-secondary-700 mb-1">
          Telefone *
        </label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          className={`w-full border ${
            errors.telefone ? 'border-red-500' : 'border-secondary-200'
          } rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700`}
        />
        {errors.telefone && <p className="mt-1 text-sm text-red-500">{errors.telefone}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="mensagem" className="block text-sm font-medium text-secondary-700 mb-1">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows={4}
          className={`w-full border ${
            errors.mensagem ? 'border-red-500' : 'border-secondary-200'
          } rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500 text-secondary-700`}
        ></textarea>
        {errors.mensagem && <p className="mt-1 text-sm text-red-500">{errors.mensagem}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full bg-primary-500 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-600 transition-colors flex items-center justify-center"
      >
        Enviar Mensagem <Send size={18} className="ml-2" />
      </button>
    </form>
  );
};

export default ContatoForm;