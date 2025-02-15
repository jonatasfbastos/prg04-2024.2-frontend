import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVisitaById } from "./visitaService/visitaService";
import "./visitas.css";

const VisitaDetalhes = () => {
  const [visita, setVisita] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVisita = async () => {
      setVisita(await getVisitaById(id));
    };
    fetchVisita();
  }, [id]);

  if (!visita) return <p>Carregando...</p>;

  return (
    <div className="visitas-container">
      <h2>Detalhes da Visita</h2>
      <p><strong>Digitado Por:</strong> {visita.digitadoPor}</p>
      <p><strong>Data:</strong> {visita.data}</p>
      <p><strong>Conferido Por:</strong> {visita.conferidoPor}</p>
    </div>
  );
};

export default VisitaDetalhes;





