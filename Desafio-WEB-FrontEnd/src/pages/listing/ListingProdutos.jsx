import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiCart } from "react-icons/bi";
import Modal from "../../components/common/Modal";

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
  });

  useEffect(() => {
    loadProdutos();
  }, [currentPage]);

  const loadProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/produto?page=${currentPage}`);
      if (response.data.produtos && Array.isArray(response.data.produtos)) {
        setProdutos(response.data.produtos);
        setTotalPages(Number(response.data.totalPages));
      } else {
        setProdutos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduto = async (id) => {
    await api.delete(`/produto/${id}`);
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditClick = (produto) => {
    setEditingProduto(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/produto/${editingProduto.id}`, formData);

      setProdutos((prev) =>
        prev.map((p) =>
          p.id === editingProduto.id ? { ...p, ...formData } : p
        )
      );

      setShowEditModal(false);
      setEditingProduto(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Produtos</h1>
          <p>Listagem de todos os produtos cadastrados.</p>

          {produtos.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Nenhum produto cadastrado.</p>
            )
          ) : (
            produtos.map((produto) => (
              <BoxGeneric
                key={produto.id}
                icon={<BiCart />}
                title={produto.nome}
                subtitle={`Preço: R$ ${produto.preco}`}
                deleteMessage={
                  <>
                    Remover produto <b>{produto.nome}</b>?
                  </>
                }
                onEdit={() => handleEditClick(produto)}
                onDelete={() => deleteProduto(produto.id)}
              />
            ))
          )}

          {!isLoading && (
            <div>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}

          <Modal
            isOpen={showEditModal}
            title="Editar Produto"
            onClose={() => setShowEditModal(false)}
          >
            <label>
              <h4>Nome:</h4>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
            </label>

            <label>
              <h4>Preço:</h4>
              <input
                type="text"
                value={formData.preco}
                onChange={(e) =>
                  setFormData({ ...formData, preco: e.target.value })
                }
              />
            </label>

            <div>
              <Button onClick={handleSaveEdit}>Salvar</Button>
              <Button onClick={() => setShowEditModal(false)}>Cancelar</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Produto;
