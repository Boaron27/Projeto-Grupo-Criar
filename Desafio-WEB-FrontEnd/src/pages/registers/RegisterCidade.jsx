import { useState } from "react";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
const LINK_API = import.meta.env.VITE_LINK_API;

export default function RegisterCidade() {
  const [form, setForm] = useState({ nome: "", estado_id: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.nome) err.nome = ["O nome da cidade é obrigatório."];
    if (!form.estado_id) err.estado_id = ["O ID do estado é obrigatório."];
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(LINK_API + "cidade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Cidade cadastrada com sucesso!");
          setForm({ nome: "", estado_id: "" });
        } else {
          console.log("Erro de validação:", data.errors);
          setErrors(data.errors || {});
        }
      } catch (error) {
        alert("Erro ao cadastrar cidade.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="main_feed">
        <div className="feed_form">
          <h1>Cadastrar Cidade</h1>
          <p>Preencha os dados abaixo:</p>

          <Form>
            <Input
              name="nome"
              placeholder="Nome da cidade"
              value={form.nome}
              validateErrors={errors.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <Input
              name="estado_id"
              placeholder="ID do Estado"
              value={form.estado_id}
              validateErrors={errors.estado_id}
              onChange={(e) => setForm({ ...form, estado_id: e.target.value })}
            />

            <Button
              className="button_confirm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Cidade"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
