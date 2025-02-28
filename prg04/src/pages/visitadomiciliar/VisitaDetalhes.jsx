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
      
      {/* Se o paciente estiver presente, exibe as informações do paciente */}
      {visita.paciente && (
        <>
          <h3>Paciente</h3>
          <p><strong>Nome do Paciente:</strong> {visita.paciente.nome}</p>
          {/* Exiba outros dados do paciente conforme necessário */}
        </>
      )}

      <h3>Motivo da Visita</h3>
      <p>{visita.motivoVisita}</p>

      <h3>Acompanhamento</h3>
      <p>{visita.acompanhamento}</p>

      <h3>Controle Ambiental</h3>
      <p>{visita.controleAmbiental}</p>

      <h3>Antropometria</h3>
      <p>{visita.antropometria}</p>

      <h3>Sinais Vitais</h3>
      <p>{visita.sinaisVitais}</p>

      <h3>Glicemia</h3>
      <p>{visita.glicemia}</p>

      <h3>Desfecho</h3>
      <p>{visita.desfecho}</p>

      <button onClick={() => navigate("/visitadomiciliar")}>Voltar</button>
    </div>
  );
};

export default VisitaDetalhes;





