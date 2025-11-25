import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiFlag } from "react-icons/bi";
import Modal from "../../components/common/Modal";

function Campanha() {
  const [campanhas, setCampanhas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCampanha, setEditingCampanha] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    grupo_id: "",
    ativa: true,
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadCampanhas();
  }, [currentPage]);

  const loadCampanhas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/campanha?page=${currentPage}`);
      if (response.data.campanhas && Array.isArray(response.data.campanhas)) {
        setCampanhas(response.data.campanhas);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Formato de dados inválido:", response.data);
        setCampanhas([]);
      }
    } catch (error) {
      console.error("Erro ao carregar campanhas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCampanha = async (id) => {
    await api.delete(`/campanha/${id}`);
    setCampanhas((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditClick = (campanha) => {
    setEditingCampanha(campanha);
    setFormData({
      nome: campanha.nome,
      grupo_id: campanha.grupo_id,
      ativa: campanha.ativa,
    });
    setShowEditModal(true); // Exibe o modal de edição
  };

  const handleSaveEdit = async () => {
    try {
      // Atualizando os dados da campanha na API
      await api.put(`/campanha/${editingCampanha.id}`, formData);
      setCampanhas((prev) =>
        prev.map((c) =>
          c.id === editingCampanha.id ? { ...c, ...formData } : c
        )
      );
      setShowEditModal(false); // Fecha o modal após salvar
      setEditingCampanha(null); // Limpa o estado de edição
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Fecha o modal sem salvar
    setEditingCampanha(null); // Limpa o estado de edição
  };

  return (
    <div>
      <Navbar />
      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem das campanhas</h1>
          <p>Listagem de todas as campanhas cadastradas.</p>

          {campanhas.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Ops! Nenhuma campanha cadastrada.</p>
            )
          ) : (
            <>
              {campanhas.map((campanha) => (
                <BoxGeneric
                  key={campanha.id}
                  icon={<BiFlag />}
                  title={campanha.nome}
                  subtitle={`Grupo ID: ${campanha.grupo_id}`}
                  status={campanha.ativa ? "Ativa" : "Inativa"}
                  deleteMessage={
                    <>
                      Deseja remover a campanha <b>{campanha.nome}</b>?
                    </>
                  }
                  onEdit={() => handleEditClick(campanha)} // Abre o modal para editar
                  onDelete={() => deleteCampanha(campanha.id)}
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
            title="Editar Campanha"
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
              <h4>Grupo ID:</h4>
              <input
                type="text"
                value={formData.grupo_id}
                onChange={(e) =>
                  setFormData({ ...formData, grupo_id: e.target.value })
                }
              />
            </label>
            <label className="form-row">
              <h4>Ativa :</h4>
              <input
                type="checkbox"
                checked={formData.ativa}
                onChange={(e) =>
                  setFormData({ ...formData, ativa: e.target.checked })
                }
                id="checkboxAtiva"
              />
              <label htmlFor="checkboxAtiva"></label>{" "}
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

export default Campanha;
