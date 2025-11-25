import { Routes as RoutesManager, Route } from "react-router-dom";
import Home from "../pages/Home";
import Listing from "../pages/Listing";
import Register from "../pages/Register";
import RegisterEstado from "../pages/registers/RegisterEstado";
import RegisterCidade from "../pages/registers/RegisterCidade";
import RegisterCampanha from "../pages/registers/RegisterCampanha";
import RegisterDesconto from "../pages/registers/RegisterDesconto";
import RegisterGrupo from "../pages/registers/RegisterGrupo";
import RegisterProdutos from "../pages/registers/RegisterProdutos";
import ListingEstado from "../pages/listing/ListingEstado";
import ListingCidade from "../pages/listing/ListingCidade";
import ListingCampanha from "../pages/listing/ListingCampanha";
import ListingDesconto from "../pages/listing/ListingDesconto";
import ListingGrupo from "../pages/listing/ListingGrupo";
import ListingProdutos from "../pages/listing/ListingProdutos";

function Routes() {
  return (
    <>
      <RoutesManager>
        <Route path="/" element={<Home />} />
        <Route path="/listar" element={<Listing />} />
        <Route path="/listar/campanha" element={<ListingCampanha />} />
        <Route path="/listar/cidade" element={<ListingCidade />} />
        <Route path="/listar/desconto" element={<ListingDesconto />} />
        <Route path="/listar/estado" element={<ListingEstado />} />
        <Route path="/listar/grupo" element={<ListingGrupo />} />
        <Route path="/listar/produto" element={<ListingProdutos />} />
        <Route path="/cadastrar" element={<Register />} />
        <Route path="/cadastrar/estado" element={<RegisterEstado />} />
        <Route path="/cadastrar/cidade" element={<RegisterCidade />} />
        <Route path="/cadastrar/campanha" element={<RegisterCampanha />} />
        <Route path="/cadastrar/desconto" element={<RegisterDesconto />} />
        <Route path="/cadastrar/grupo" element={<RegisterGrupo />} />
        <Route path="/cadastrar/produto" element={<RegisterProdutos />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
