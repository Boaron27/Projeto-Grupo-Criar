import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiMap } from "react-icons/bi";
import Modal from "../../components/common/Modal"; // Importa o modal

function Estado() {
  const [estados, setEstados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingEstado, setEditingEstado] = useState(null); // Estado para o estado sendo editado
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
  }); // Dados do formulário de edição
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadEstados();
  }, [currentPage]);

  const loadEstados = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/estado?page=${currentPage}`);
      if (response.data.estados && Array.isArray(response.data.estados)) {
        setEstados(response.data.estados);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Formato de dados inválido:", response.data);
        setEstados([]);
      }
    } catch (error) {
      console.error("Erro ao carregar estados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEstado = async (id) => {
    await api.delete(`/estado/${id}`);
    setEstados((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEditClick = (estado) => {
    setEditingEstado(estado);
    setFormData({
      nome: estado.nome,
      sigla: estado.sigla,
    });
    setShowEditModal(true); // Exibe o modal de edição
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/estado/${editingEstado.id}`, formData); // Envia os dados para a API
      setEstados((prev) =>
        prev.map((e) => (e.id === editingEstado.id ? { ...e, ...formData } : e))
      );
      setShowEditModal(false); // Fecha o modal após salvar
      setEditingEstado(null); // Limpa o estado de edição
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Fecha o modal sem salvar
    setEditingEstado(null); // Limpa o estado de edição
  };

  return (
    <div>
      <Navbar />
      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem dos estados</h1>
          <p>Listagem de todos os estados cadastrados.</p>

          {estados.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Ops! Nenhum estado cadastrado.</p>
            )
          ) : (
            <>
              {estados.map((estado) => (
                <BoxGeneric
                  key={estado.id}
                  icon={<BiMap />}
                  title={estado.nome}
                  subtitle={`Sigla: ${estado.sigla}`}
                  deleteMessage={
                    <>
                      Deseja remover o estado <b>{estado.nome}</b>?
                    </>
                  }
                  onEdit={() => handleEditClick(estado)} // Abre o modal para editar
                  onDelete={() => deleteEstado(estado.id)}
                />
              ))}
            </>
          )}

          {/* Navegação de páginas */}
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

          {/* Modal de edição */}
          <Modal
            isOpen={showEditModal}
            title="Editar Estado"
            onClose={handleCancelEdit} // Fecha o modal
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
              <h4>Sigla:</h4>
              <input
                type="text"
                value={formData.sigla}
                onChange={(e) =>
                  setFormData({ ...formData, sigla: e.target.value })
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

export default Estado;
