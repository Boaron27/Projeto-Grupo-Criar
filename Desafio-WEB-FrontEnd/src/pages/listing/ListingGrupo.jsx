import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiGroup } from "react-icons/bi";
import Modal from "../../components/common/Modal";

function GrupoCidade() {
  const [grupos, setGrupos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingGrupo, setEditingGrupo] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadGrupos();
  }, [currentPage]);

  const loadGrupos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/grupo_cidade?page=${currentPage}`);
      if (
        response.data.grupo_cidade &&
        Array.isArray(response.data.grupo_cidade)
      ) {
        setGrupos(response.data.grupo_cidade);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Formato de dados inválido:", response.data);
        setGrupos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGrupo = async (id) => {
    await api.delete(`/grupo_cidade/${id}`);
    setGrupos((prev) => prev.filter((g) => g.id !== id));
  };

  const handleEditClick = (grupo) => {
    setEditingGrupo(grupo);
    setFormData({
      nome: grupo.nome,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/grupo_cidade/${editingGrupo.id}`, formData);
      setGrupos((prev) =>
        prev.map((g) => (g.id === editingGrupo.id ? { ...g, ...formData } : g))
      );
      setShowEditModal(false);
      setEditingGrupo(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingGrupo(null);
  };

  return (
    <div>
      <Navbar />
      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem dos Grupos de Cidade</h1>
          <p>Listagem de todos os grupos de cidade cadastrados.</p>

          {grupos.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Ops! Nenhum grupo cadastrado.</p>
            )
          ) : (
            <>
              {grupos.map((grupo) => (
                <BoxGeneric
                  key={grupo.id}
                  icon={<BiGroup />}
                  title={grupo.nome}
                  deleteMessage={
                    <>
                      Deseja remover o grupo <b>{grupo.nome}</b>?
                    </>
                  }
                  onEdit={() => handleEditClick(grupo)}
                  onDelete={() => deleteGrupo(grupo.id)}
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
            title="Editar Grupo"
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

export default GrupoCidade;
