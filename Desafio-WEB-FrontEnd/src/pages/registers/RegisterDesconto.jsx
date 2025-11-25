import { useState } from "react";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import { Button } from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
const DESCONTO_LINK_API = import.meta.env.VITE_DESCONTO_LINK_API;

export default function RegisterDesconto() {
  const [form, setForm] = useState({
    campanha_id: "",
    valor: "",
    percentual: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};

    if (!form.campanha_id)
      err.campanha_id = ["O ID da campanha é obrigatório."];

    // Regra: apenas valor OU percentual
    if (!form.valor && !form.percentual)
      err.valor = ["Informe valor OU percentual."];

    if (form.valor && form.percentual)
      err.valor = [
        "Só é permitido preencher um dos dois: valor OU percentual.",
      ];

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(DESCONTO_LINK_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Desconto cadastrado com sucesso!");
          setForm({ campanha_id: "", valor: "", percentual: "" }); // Limpar o formulário
        } else {
          console.log("Erro de validação:", data.errors);
          setErrors(data.errors || {});
        }
      } catch (error) {
        alert("Erro ao cadastrar desconto.");
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
          <h1>Cadastrar Desconto</h1>
          <p>Preencha os dados abaixo:</p>
          <Form>
            <Input
              name="campanha_id"
              placeholder="ID da Campanha"
              value={form.campanha_id}
              validateErrors={errors.campanha_id}
              onChange={(e) =>
                setForm({ ...form, campanha_id: e.target.value })
              }
            />

            <Input
              name="valor"
              placeholder="Valor do Desconto"
              value={form.valor}
              validateErrors={errors.valor}
              onChange={(e) =>
                setForm({ ...form, valor: e.target.value, percentual: "" })
              }
            />

            <Input
              name="percentual"
              placeholder="Percentual do Desconto"
              value={form.percentual}
              validateErrors={errors.valor}
              onChange={(e) =>
                setForm({ ...form, percentual: e.target.value, valor: "" })
              }
            />

            <Button
              className="button_confirm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Desconto"}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
