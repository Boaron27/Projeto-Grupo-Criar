import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/">
            <img
                src={Logo}
                alt="Logo Grupo Criar"
                style={{ width: '35px', height: 'auto' }} //
            />
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
