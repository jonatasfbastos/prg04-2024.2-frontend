import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./visitas.css";

const VisitasList = () => {
  const [visitas, setVisitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/visitas")
      .then((response) => response.json())
      .then((data) => setVisitas(data))
      .catch((error) => console.error("Erro ao buscar visitas:", error));
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/visitas/${id}`, { method: "DELETE" });
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Erro ao deletar visita:", error);
    }
  };

  const visitasFiltradas = visitas.filter((visita) =>
    visita.digitadoPor.toLowerCase().includes(filtroNome.toLowerCase()) &&
    (!filtroData || visita.data.startsWith(filtroData))
  );

  return (
    <div className="visitas-container">
      <h2>Gestão de Visitas Domiciliares</h2>
      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />
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




