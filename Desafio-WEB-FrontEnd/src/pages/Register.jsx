import Navbar from "../components/layout/Navbar";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>O que você deseja cadastrar?</h1>
          <p>Selecione uma das opções abaixo.</p>

          <div className="options-menu" style={{ marginTop: "20px" }}>
            <Button onClick={() => navigate("/cadastrar/estado")}>
              Estados
            </Button>

            <Button onClick={() => navigate("/cadastrar/cidade")}>
              Cidades
            </Button>

            <Button onClick={() => navigate("/cadastrar/grupo")}>
              Grupo de cidades
            </Button>

            <Button onClick={() => navigate("/cadastrar/campanha")}>
              Campanhas
            </Button>

            <Button onClick={() => navigate("/cadastrar/desconto")}>
              Descontos
            </Button>

            <Button onClick={() => navigate("/cadastrar/produto")}>
              Produtos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
