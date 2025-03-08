import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitas, deleteVisita } from "./visitaService/visitaService";
import Botao from '../../components/button/button.jsx';
import "./visitas.css";

// Componente principal para a exibição da lista de visitas domiciliares
const VisitasList = () => {
  // Estados para armazenar as visitas, filtros e controle de navegação
  const [visitas, setVisitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const navigate = useNavigate();

   // Hook useEffect para carregar as visitas quando o componente é montado
  useEffect(() => {
    const fetchVisitas = async () => {
      setVisitas(await getVisitas());
    };
    fetchVisitas();
  }, []);

  // Função para excluir uma visita
  const handleDelete = async (id) => {
    await deleteVisita(id);
    setVisitas(await getVisitas());
  };

   // Filtra as visitas com base nos critérios de nome e data
  const visitasFiltradas = visitas.filter((visita) =>
    visita.digitadoPor.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (!filtroData || visita.data.startsWith(filtroData))
  );

  return (
    <div className="visitas-container">
      <h2>Gestão de Visitas Domiciliares</h2>
      
      {/* Campos de filtro para busca de visitas */}
      <div className="filtros">
        <input 
          type="text" 
          placeholder="Nome do profissional responsável" 
          value={filtroNome} 
          onChange={(e) => setFiltroNome(e.target.value)} 
        />
        <input 
          type="date" 
          value={filtroData} 
          onChange={(e) => setFiltroData(e.target.value)} 
        />
        <Botao texto="Nova Visita" onClick={() => navigate("/visitadomiciliar/novo")} />
      </div>
      <table className="visitas-table">
        <thead>
          <tr>
            <th>Digitado Por</th>
            <th>Data</th>
            <th>Paciente</th>
            <th>Conferido Por</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {visitasFiltradas.length > 0 ? (
            visitasFiltradas.map((visita) => (
              <tr key={visita.id}>
                <td>{visita.digitadoPor}</td>
                <td>{new Date(visita.data).toLocaleDateString()}</td>
                <td>{visita.paciente ? visita.paciente.nome : "Não informado"}</td>
                <td>{visita.conferidoPor}</td>
                <td>
                  <Botao texto="Detalhes" onClick={() => navigate(`/visitadomiciliar/detalhes/${visita.id}`)} />
                  <Botao texto="Editar" onClick={() => navigate(`/visitadomiciliar/editar/${visita.id}`)} />
                  <Botao texto="Excluir" onClick={() => handleDelete(visita.id)} className="delete-btn" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">Nenhuma visita encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitasList;






