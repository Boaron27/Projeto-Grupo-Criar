import { useState } from "react";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
const PRODUTO_LINK_API = import.meta.env.VITE_PRODUTO_LINK_API;

export default function CadastroProduto() {
  const [form, setForm] = useState({ nome: "", preco: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.nome) err.nome = ["O nome do produto é obrigatório."];
    if (!form.preco) err.preco = ["O preço é obrigatório."];
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(PRODUTO_LINK_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Produto cadastrado com sucesso!");
          setForm({ nome: "", preco: "" }); // Limpar o formulário
        } else {
          console.log("Erro de validação:", data.errors);
          setErrors(data.errors || {});
        }
      } catch (error) {
        alert("Erro ao cadastrar produto.");
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
          <h1>Cadastrar Produto</h1>
          <p>Preencha os dados abaixo:</p>

          <Form>
            <Input
              name="nome"
              placeholder="Nome do Produto"
              value={form.nome}
              validateErrors={errors.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <Input
              name="preco"
              placeholder="Preço"
              value={form.preco}
              validateErrors={errors.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
            />

            <Button
              className="button_confirm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Produto"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
