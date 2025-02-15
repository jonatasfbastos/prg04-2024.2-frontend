import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./visitas.css";

const VisitaForm = () => {
  const [visita, setVisita] = useState({
    digitadoPor: "",
    data: "",
    conferidoPor: "",
    numeroFolha: "",
    cns: "",
    cbo: "",
    cnes: "",
    ine: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/visitas/${id}`)
        .then((response) => response.json())
        .then((data) => setVisita(data))
        .catch((error) => console.error("Erro ao buscar visita:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setVisita({ ...visita, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos antes de enviar
    for (const key in visita) {
      if (!visita[key]) {
        alert(`O campo ${key.toUpperCase()} é obrigatório.`);
        return;
      }
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:8080/visitas/${id}` : "http://localhost:8080/visitas";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    })
      .then(() => navigate("/visitadomiciliar"))
      .catch((error) => console.error("Erro ao salvar visita:", error));
  };

  return (
    <div className="visitas-container">
      <h2>{id ? "Editar Visita" : "Nova Visita"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Digitado Por: <span className="required">*</span></label>
        <input type="text" name="digitadoPor" value={visita.digitadoPor} onChange={handleChange} required />

        <label>Data: <span className="required">*</span></label>
        <input type="date" name="data" value={visita.data} onChange={handleChange} required />

        <label>Conferido Por: <span className="required">*</span></label>
        <input type="text" name="conferidoPor" value={visita.conferidoPor} onChange={handleChange} required />

        <label>Número da Folha: <span className="required">*</span></label>
        <input type="text" name="numeroFolha" value={visita.numeroFolha} onChange={handleChange} required />

        <label>CNS (Cartão Nacional de Saúde): <span className="required">*</span></label>
        <input type="text" name="cns" value={visita.cns} onChange={handleChange} required />

        <label>CBO (Código Brasileiro de Ocupações): <span className="required">*</span></label>
        <input type="text" name="cbo" value={visita.cbo} onChange={handleChange} required />

        <label>CNES (Cadastro Nacional de Estabelecimentos de Saúde): <span className="required">*</span></label>
        <input type="text" name="cnes" value={visita.cnes} onChange={handleChange} required />

        <label>INE (Identificação Nacional do Estabelecimento): <span className="required">*</span></label>
        <input type="text" name="ine" value={visita.ine} onChange={handleChange} required />

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/visitadomiciliar")}>Cancelar</button>
      </form>
    </div>
  );
};

export default VisitaForm;






