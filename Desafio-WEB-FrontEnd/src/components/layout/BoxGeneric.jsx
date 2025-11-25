import { useState } from "react";
import { Button, ButtonSmall } from "../common/Button";
import "./BoxGeneric.css";
import { BiTrash, BiEdit } from "react-icons/bi";
import Modal from "../common/Modal";

function BoxGeneric({
  icon,
  title,
  subtitle,
  extraInfo,
  status,
  onEdit,
  onDelete,
  deleteMessage,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete();
    setIsLoading(false);
    setModalIsOpen(false);
  };

  return (
    <div className="box_user">
      <div className="box_picture">{icon}</div>

      <div className="box_infos">
        <div className="infos">
          <div>
            <h2>{title}</h2>
            <span>{subtitle}</span>
          </div>

          {extraInfo && (
            <div className="birthday">
              <span>{extraInfo}</span>
            </div>
          )}
        </div>

        {status && (
          <p>
            <b>Status:</b> {status}
          </p>
        )}

        <div className="actions">
          {onEdit && (
            <ButtonSmall
              className="updt"
              tooltipContent="Editar"
              onClick={onEdit}
            >
              <BiEdit />
            </ButtonSmall>
          )}

          {onDelete && (
            <ButtonSmall
              className="rmv"
              tooltipContent="Remover"
              onClick={() => setModalIsOpen(true)}
            >
              <BiTrash />
            </ButtonSmall>
          )}
        </div>
      </div>

      <Modal
        title="Remover"
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <p>{deleteMessage}</p>

        <Button onClick={handleDelete}>
          {isLoading ? "Removendo..." : "Confirmar remoção"}
        </Button>
      </Modal>
    </div>
  );
}

export default BoxGeneric;
