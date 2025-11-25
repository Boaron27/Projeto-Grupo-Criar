import Navbar from "../components/layout/Navbar";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";

function Listagem() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>O que você deseja listar?</h1>
          <p>Selecione uma das opções abaixo.</p>

          <div className="options-menu" style={{ marginTop: "20px" }}>
            <Button onClick={() => navigate("/listar/estado")}>Estados</Button>

            <Button onClick={() => navigate("/listar/cidade")}>Cidades</Button>

            <Button onClick={() => navigate("/listar/grupo")}>
              Grupo de cidades
            </Button>

            <Button onClick={() => navigate("/listar/campanha")}>
              Campanhas
            </Button>

            <Button onClick={() => navigate("/listar/desconto")}>
              Descontos
            </Button>

            <Button onClick={() => navigate("/listar/produto")}>
              Produtos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listagem;
