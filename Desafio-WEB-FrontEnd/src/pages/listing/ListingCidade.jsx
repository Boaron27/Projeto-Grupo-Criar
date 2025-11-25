import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiBuildings } from "react-icons/bi";
import Modal from "../../components/common/Modal";

function Cidade() {
  const [cidades, setCidades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCidade, setEditingCidade] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    estado_id: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadCidades();
  }, [currentPage]);

  const loadCidades = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/cidade?page=${currentPage}`);
      if (response.data.cidades && Array.isArray(response.data.cidades)) {
        setCidades(response.data.cidades);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Formato de dados inválido:", response.data);
        setCidades([]);
      }
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCidade = async (id) => {
    await api.delete(`/cidade/${id}`);
    setCidades((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditClick = (cidade) => {
    setEditingCidade(cidade);
    setFormData({
      nome: cidade.nome,
      estado_id: cidade.estado_id,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/cidade/${editingCidade.id}`, formData);
      setCidades((prev) =>
        prev.map((c) => (c.id === editingCidade.id ? { ...c, ...formData } : c))
      );
      setShowEditModal(false);
      setEditingCidade(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingCidade(null);
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Cidades</h1>
          <p>Listagem de todas as cidades cadastradas.</p>

          {cidades.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Ops! Nenhuma cidade cadastrada.</p>
            )
          ) : (
            <>
              {cidades.map((cidade) => (
                <BoxGeneric
                  key={cidade.id}
                  icon={<BiBuildings />}
                  title={cidade.nome}
                  subtitle={`Estado ID: ${cidade.estado_id}`}
                  deleteMessage={
                    <>
                      Deseja remover a cidade <b>{cidade.nome}</b>?
                    </>
                  }
                  onEdit={() => handleEditClick(cidade)}
                  onDelete={() => deleteCidade(cidade.id)}
                />
              ))}
            </>
          )}

          {!isLoading && (
            <div>
              <div>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            </div>
          )}

          {/* Modal de edição */}
          <Modal
            isOpen={showEditModal}
            title="Editar Cidade"
            onClose={handleCancelEdit}
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
              <h4>Estado ID:</h4>
              <input
                type="text"
                value={formData.estado_id}
                onChange={(e) =>
                  setFormData({ ...formData, estado_id: e.target.value })
                }
              />
            </label>

            <div>
              <Button onClick={handleSaveEdit}>Salvar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Cidade;
