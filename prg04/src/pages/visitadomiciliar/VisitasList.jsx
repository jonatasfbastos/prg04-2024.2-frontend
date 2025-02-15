import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitas, deleteVisita } from "./visitaService/visitaService";
import "./visitas.css";

const VisitasList = () => {
  const [visitas, setVisitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitas = async () => {
      setVisitas(await getVisitas());
    };
    fetchVisitas();
  }, []);

  const handleDelete = async (id) => {
    await deleteVisita(id);
    setVisitas(await getVisitas());
  };

  const visitasFiltradas = visitas.filter((visita) =>
    visita.digitadoPor.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (!filtroData || visita.data.startsWith(filtroData))
  );

  return (
    <div className="visitas-container">
      <h2>Gestão de Visitas Domiciliares</h2>
      <div className="filtros">
        <input type="text" placeholder="Filtrar por nome" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />
        <input type="date" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} />
        <button onClick={() => navigate("/visitadomiciliar/novo")}>Nova Visita</button>
      </div>
      <table className="visitas-table">
        <thead>
          <tr>
            <th>Digitado Por</th>
            <th>Data</th>
            <th>Conferido Por</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {visitasFiltradas.length > 0 ? (
            visitasFiltradas.map((visita) => (
              <tr key={visita.id}>
                <td>{visita.digitadoPor}</td>
                <td>{visita.data}</td>
                <td>{visita.conferidoPor}</td>
                <td>
                  <button onClick={() => navigate(`/visitadomiciliar/detalhes/${visita.id}`)}>Detalhes</button>
                  <button onClick={() => navigate(`/visitadomiciliar/editar/${visita.id}`)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(visita.id)}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">Nenhuma visita encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitasList;







