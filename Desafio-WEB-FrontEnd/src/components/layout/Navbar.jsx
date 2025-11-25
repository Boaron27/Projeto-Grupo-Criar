import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/">
          <h3 className="logo">Grupo Criar</h3>
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/listar">Listagem</Link>
        </li>
        <li>
          <Link to="/cadastrar">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
