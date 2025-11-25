import { useState } from "react";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";

export default function RegisterEstado() {
  const [form, setForm] = useState({ nome: "", sigla: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.nome) err.nome = ["O nome do estado é obrigatório."];
    if (!form.sigla) err.sigla = ["A sigla é obrigatória."];
    else if (form.sigla.length !== 2)
      err.sigla = ["A sigla deve ter exatamente 2 caracteres."];
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/estado", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Estado cadastrado com sucesso!");
          setForm({ nome: "", sigla: "" }); // Limpar o formulário
        } else {
          console.log("Erro de validação:", data.errors);
          setErrors(data.errors || {});
        }
      } catch (error) {
        alert("Erro ao cadastrar estado.");
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
          <h1>Cadastrar Estado</h1>
          <p>Preencha os dados abaixo:</p>
          <Form>
            <Input
              name="nome"
              placeholder="Nome do estado"
              value={form.nome}
              validateErrors={errors.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <Input
              name="sigla"
              placeholder="Sigla (2 letras)"
              value={form.sigla}
              validateErrors={errors.sigla}
              onChange={(e) =>
                setForm({ ...form, sigla: e.target.value.toUpperCase() })
              }
            />

            <Button
              className="button_confirm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Estado"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
