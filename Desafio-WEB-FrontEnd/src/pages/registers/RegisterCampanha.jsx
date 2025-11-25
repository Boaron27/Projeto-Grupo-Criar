import { useState } from "react";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
const LINK_API = import.meta.env.VITE_LINK_API;

export default function RegisterCampanha() {
  const [form, setForm] = useState({ grupo_id: "", nome: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.grupo_id) err.grupo_id = ["O ID do grupo é obrigatório."];
    if (!form.nome) err.nome = ["O nome da campanha é obrigatório."];
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    setErrors(v);

    if (Object.keys(v).length !== 0) return;

    setLoading(true);

    try {
      const response = await fetch(LINK_API + "campanha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        // erros de validação do Laravel (422)
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || "Erro ao cadastrar campanha");
        }
        return;
      }

      alert("Campanha cadastrada com sucesso!");

      // limpa formulário
      setForm({ grupo_id: "", nome: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main_feed">
        <div className="feed_form">
          <h1>Cadastrar Campanha</h1>
          <p>Preencha os dados abaixo:</p>

          <form onSubmit={handleSubmit}>
            <Input
              name="grupo_id"
              placeholder="ID do Grupo"
              value={form.grupo_id}
              validateErrors={errors.grupo_id}
              onChange={(e) => setForm({ ...form, grupo_id: e.target.value })}
            />

            <Input
              name="nome"
              placeholder="Nome da Campanha"
              value={form.nome}
              validateErrors={errors.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <button className="button_confirm" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar Campanha"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
