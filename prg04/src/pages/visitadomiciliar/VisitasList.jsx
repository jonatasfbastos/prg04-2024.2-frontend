import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitas, deleteVisita } from "./visitaService/visitaService";
import "./visitas.css";

const VisitasList = () => {
  // Estado para armazenar a lista de visitas
  const [visitas, setVisitas] = useState([]);
  const navigate = useNavigate();

  // Carrega a lista de visitas ao montar o componente
  useEffect(() => {
    const fetchVisitas = async () => {
      const data = await getVisitas();
      if (data) setVisitas(data);
    };
    fetchVisitas();
  }, []);

  // Função para excluir uma visita
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta visita?")) {
      await deleteVisita(id);
      setVisitas(visitas.filter((visita) => visita.id !== id)); // Remove a visita da lista sem recarregar a página
    }
  };

  return (
    <div className="visitas-container">
      <h2>Lista de Visitas</h2>
      <button onClick={() => navigate("/visitadomiciliar/novo")}>Nova Visita</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Digitado Por</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {visitas.map((visita) => (
            <tr key={visita.id}>
              <td>{visita.id}</td>
              <td>{visita.digitadoPor}</td>
              <td>{new Date(visita.data).toLocaleDateString()}</td>
              <td>
                <button onClick={() => navigate(`/visitadomiciliar/${visita.id}`)}>Detalhes</button>
                <button onClick={() => navigate(`/visitadomiciliar/editar/${visita.id}`)}>Editar</button>
                <button onClick={() => handleDelete(visita.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitasList;







