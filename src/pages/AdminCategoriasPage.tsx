import { useState } from "react";
import { useCategoriasStore } from "../store/categoriasStore";
import { useProdutosStore } from "../store/produtosStore";
import { Plus, Edit2, Trash2 } from "lucide-react";

const AdminCategoriasPage = () => {
  const { categorias, addCategoria, updateCategoria, deleteCategoria } =
    useCategoriasStore();
  const { produtos } = useProdutosStore();
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [editando, setEditando] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!novaCategoria.trim()) {
      setErro("O nome da categoria é obrigatório");
      return;
    }

    if (
      categorias.some(
        (cat) => cat.nome.toLowerCase() === novaCategoria.toLowerCase()
      )
    ) {
      setErro("Esta categoria já existe");
      return;
    }

    addCategoria({
      nome: novaCategoria,
      descricao: novaDescricao,
    });

    setNovaCategoria("");
    setNovaDescricao("");
  };

  const handleDelete = (id: string) => {
    const categoriaNome = categorias
      .find((cat) => cat.id === id)
      ?.nome.toLowerCase();
    const produtosNaCategoria = produtos.filter(
      (p) => p.categoria.toLowerCase() === categoriaNome
    );

    if (produtosNaCategoria.length > 0) {
      setErro(
        `Não é possível excluir esta categoria pois existem ${produtosNaCategoria.length} produtos vinculados a ela.`
      );
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      deleteCategoria(id);
      setErro("");
    }
  };

  const handleUpdate = (id: string) => {
    const categoria = categorias.find((cat) => cat.id === id);
    if (!categoria) return;

    updateCategoria(id, {
      nome: novaCategoria || categoria.nome,
      descricao: novaDescricao || categoria.descricao,
    });

    setEditando(null);
    setNovaCategoria("");
    setNovaDescricao("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">
        Gerenciar Categorias
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">
            {editando ? "Editar Categoria" : "Nova Categoria"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Nome da Categoria
              </label>
              <input
                type="text"
                id="nome"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                className="w-full border border-secondary-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: Caixas, Sacolas, etc."
              />
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Descrição (opcional)
              </label>
              <textarea
                id="descricao"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                className="w-full border border-secondary-200 rounded-md py-2 px-3 focus:ring-primary-500 focus:border-primary-500"
                rows={3}
                placeholder="Descreva brevemente esta categoria..."
              />
            </div>

            {erro && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {erro}
              </div>
            )}

            <div className="flex space-x-3">
              {editando ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleUpdate(editando)}
                    className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditando(null);
                      setNovaCategoria("");
                      setNovaDescricao("");
                    }}
                    className="border border-secondary-300 text-secondary-700 px-4 py-2 rounded-md hover:bg-secondary-50"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Adicionar Categoria
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Categorias */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">
            Categorias Existentes
          </h2>

          <div className="space-y-4">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-secondary-800">
                      {categoria.nome}
                    </h3>
                    {categoria.descricao && (
                      <p className="text-sm text-secondary-600 mt-1">
                        {categoria.descricao}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditando(categoria.id);
                        setNovaCategoria(categoria.nome);
                        setNovaDescricao(categoria.descricao || "");
                      }}
                      className="text-secondary-600 hover:text-secondary-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(categoria.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {categorias.length === 0 && (
              <p className="text-secondary-500 text-center py-4">
                Nenhuma categoria cadastrada
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriasPage;
