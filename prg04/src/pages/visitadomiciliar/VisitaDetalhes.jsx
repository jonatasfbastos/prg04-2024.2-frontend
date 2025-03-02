import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVisitaById } from "./visitaService/visitaService";
import "./visitas.css";

const VisitaDetalhes = () => {
  // Estado para armazenar os detalhes da visita
  const [visita, setVisita] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Busca os detalhes da visita ao montar o componente
  useEffect(() => {
    const fetchVisita = async () => {
      const data = await getVisitaById(id);
      if (data) setVisita(data);
    };
    fetchVisita();
  }, [id]);

  if (!visita) return <p>Carregando...</p>;

  return (
    <div className="visitas-container">
      <h2>Detalhes da Visita</h2>
      <p><strong>Digitado Por:</strong> {visita.digitadoPor}</p>
      <p><strong>Data:</strong> {new Date(visita.data).toLocaleDateString()}</p>
      <p><strong>Conferido Por:</strong> {visita.conferidoPor}</p>
      <p><strong>Número da Folha:</strong> {visita.numeroFolha}</p>
      <p><strong>CNS:</strong> {visita.cns}</p>
      <p><strong>CBO:</strong> {visita.cbo}</p>
      <p><strong>CNES:</strong> {visita.cnes}</p>
      <p><strong>INE:</strong> {visita.ine}</p>
      <p><strong>Motivo da Visita:</strong> {visita.motivoVisita}</p>
      <p><strong>Acompanhamento:</strong> {visita.acompanhamento}</p>
      <p><strong>Controle Ambiental:</strong> {visita.controleAmbiental}</p>
      <p><strong>Antropometria:</strong> {visita.antropometria}</p>
      <p><strong>Sinais Vitais:</strong> {visita.sinaisVitais}</p>
      <p><strong>Glicemia:</strong> {visita.glicemia}</p>
      <p><strong>Desfecho:</strong> {visita.desfecho}</p>

      <button onClick={() => navigate("/visitadomiciliar")}>Voltar</button>
    </div>
  );
};

export default VisitaDetalhes;





