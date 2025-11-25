import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import api from "../../services/api";
import BoxGeneric from "../../components/layout/BoxGeneric";
import { BiPurchaseTagAlt } from "react-icons/bi";
import Modal from "../../components/common/Modal";

function Desconto() {
  const [descontos, setDescontos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDesconto, setEditingDesconto] = useState(null);
  const [formData, setFormData] = useState({
    campanha_id: "",
    valor_desconto: "",
    percentual_desconto: "",
  });

  useEffect(() => {
    loadDescontos();
  }, [currentPage]);

  const loadDescontos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/desconto?page=${currentPage}`);
      if (response.data && Array.isArray(response.data.descontos)) {
        setDescontos(response.data.descontos);
        setTotalPages(Number(response.data.totalPages));
      } else {
        setDescontos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar descontos:", error);
      setDescontos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDesconto = async (id) => {
    await api.delete(`/desconto/${id}`);
    setDescontos((prev) => prev.filter((d) => d.id !== id));
  };

  const handleEditClick = (desconto) => {
    setEditingDesconto(desconto);
    setFormData({
      campanha_id: desconto.campanha_id,
      valor_desconto: desconto.valor_desconto ?? "",
      percentual_desconto: desconto.percentual_desconto ?? "",
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/desconto/${editingDesconto.id}`, formData);

      setDescontos((prev) =>
        prev.map((d) =>
          d.id === editingDesconto.id ? { ...d, ...formData } : d
        )
      );

      setShowEditModal(false);
      setEditingDesconto(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Descontos</h1>
          <p>Listagem de todos os descontos cadastrados.</p>

          {descontos.length === 0 ? (
            isLoading ? (
              <Loader />
            ) : (
              <p>Nenhum desconto cadastrado.</p>
            )
          ) : (
            descontos.map((desconto) => (
              <BoxGeneric
                key={desconto.id}
                icon={<BiPurchaseTagAlt />}
                title={`Campanha ID: ${desconto.campanha_id}`}
                subtitle={
                  desconto.valor_desconto
                    ? `Valor: R$ ${desconto.valor_desconto}`
                    : `Percentual: ${desconto.percentual_desconto}%`
                }
                deleteMessage={<>Deseja remover este desconto?</>}
                onEdit={() => handleEditClick(desconto)}
                onDelete={() => deleteDesconto(desconto.id)}
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
            title="Editar Desconto"
            onClose={() => setShowEditModal(false)}
          >
            <label>
              <h4>Campanha ID:</h4>
              <input
                type="text"
                value={formData.campanha_id}
                onChange={(e) =>
                  setFormData({ ...formData, campanha_id: e.target.value })
                }
              />
            </label>

            <label>
              <h4>Valor (opcional):</h4>
              <input
                type="text"
                value={formData.valor_desconto}
                onChange={(e) =>
                  setFormData({ ...formData, valor_desconto: e.target.value })
                }
              />
            </label>

            <label>
              <h4>Percentual (opcional):</h4>
              <input
                type="text"
                value={formData.percentual_desconto}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    percentual_desconto: e.target.value,
                  })
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

export default Desconto;
