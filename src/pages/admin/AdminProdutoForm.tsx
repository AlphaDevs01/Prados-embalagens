import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProdutosStore } from '../../store/produtosStore';
import { useCategoriasStore } from '../../store/categoriasStore';
import { ArrowLeft, Upload } from 'lucide-react';

const AdminProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduto, updateProduto, getProdutoById } = useProdutosStore();
  const { categorias } = useCategoriasStore();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: '',
    categoria: '',
    dimensoes: '',
    destaque: false,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      const produto = getProdutoById(id);
      if (produto) {
        setFormData({
          nome: produto.nome,
          descricao: produto.descricao,
          imagem: produto.imagem,
          categoria: produto.categoria,
          dimensoes: produto.dimensoes || '',
          destaque: produto.destaque,
        });
        setPreviewImage(produto.imagem);
      }
    }
  }, [id, getProdutoById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!formData.nome.trim() || !formData.descricao.trim() || !formData.categoria || !formData.imagem) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      if (id) {
        updateProduto(id, formData);
      } else {
        addProduto(formData);
      }
      navigate('/admin/produtos');
    } catch (error) {
      setErro('Erro ao salvar o produto. Tente novamente.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, imagem: result });
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/produtos')}
          className="text-secondary-600 hover:text-secondary-800 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-secondary-800">
          {id ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-secondary-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full border border-gray-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Digite o nome do produto"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-secondary-700 mb-1">
                Categoria *
              </label>
              <select
                id="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full border border-gray-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.nome.toLowerCase()}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-secondary-700 mb-1">
                Descrição *
              </label>
              <textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Descreva o produto"
              />
            </div>

            <div>
              <label htmlFor="dimensoes" className="block text-sm font-medium text-secondary-700 mb-1">
                Dimensões
              </label>
              <input
                type="text"
                id="dimensoes"
                value={formData.dimensoes}
                onChange={(e) => setFormData({ ...formData, dimensoes: e.target.value })}
                className="w-full border border-gray-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: 20cm x 15cm x 10cm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Destaque
              </label>
              <label className="inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-primary-500 rounded border-gray-300"
                />
                <span className="ml-2 text-secondary-600">Exibir na página inicial</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Imagem do Produto *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {previewImage ? (
                    <div className="mb-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded-md"
                      />
                    </div>
                  ) : (
                    <Upload
                      size={48}
                      className="mx-auto text-secondary-400"
                    />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imagem"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Carregar imagem</span>
                      <input
                        id="imagem"
                        name="imagem"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF até 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {erro && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {erro}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/produtos')}
              className="px-4 py-2 border border-gray-300 rounded-md text-secondary-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              {id ? 'Salvar Alterações' : 'Criar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProdutoForm;