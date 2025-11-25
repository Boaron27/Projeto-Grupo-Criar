import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ children, isOpen, title, onClose }) {
  if (!isOpen) return null;

  // Função para fechar o modal ao clicar fora da área
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Fecha o modal quando clicar fora dele
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`box_dark ${isOpen ? "opened" : ""}`}
      onClick={handleClickOutside}
    >
      <div className="modal">
        <div className="header">
          <h1>{title}</h1>
          <IoMdCloseCircleOutline onClick={onClose} />
        </div>

        <div className="content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Certifique-se de ter esse elemento no seu HTML
  );
}

export default Modal;
