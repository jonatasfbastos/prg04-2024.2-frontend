import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./visitas.css";

const VisitaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visita, setVisita] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/visitas/${id}`)
      .then((response) => response.json())
      .then((data) => setVisita(data))
      .catch((error) => console.error("Erro ao buscar visita:", error));
  }, [id]);

  if (!visita) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="visitas-container">
      <h2>Detalhes da Visita</h2>
      <p><strong>Digitado por:</strong> {visita.digitadoPor}</p>
      <p><strong>Data:</strong> {visita.data}</p>
      <p><strong>Conferido por:</strong> {visita.conferidoPor}</p>
      <p><strong>Número da Folha:</strong> {visita.numeroFolha}</p>

      <button onClick={() => navigate(`/visitadomiciliar/editar/${id}`)}>Editar</button>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default VisitaDetalhes;




