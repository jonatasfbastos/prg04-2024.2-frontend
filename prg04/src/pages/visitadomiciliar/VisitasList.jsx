import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitas, deleteVisita } from "./visitaService/visitaService";
import "./visitas.css";

const VisitasList = () => {
  const [visitas, setVisitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const navigate = useNavigate();

  // useEffect para buscar a lista de visitas ao carregar o componente
  useEffect(() => {
    const fetchVisitas = async () => {
      setVisitas(await getVisitas()); // Chama o serviço e atualiza o estado com os dados das visitas
    };
    fetchVisitas();
  }, []);

  /**
   * Função para excluir uma visita
   * @param {number} id - O ID da visita a ser excluída
   */
  const handleDelete = async (id) => {
    await deleteVisita(id); // Chama a função de exclusão do serviço
    setVisitas(await getVisitas()); // Atualiza a lista após a exclusão
  };

  // Filtra as visitas com base nos filtros digitados pelo usuário
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

      {/* Tabela para exibição da lista de visitas */}
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
          {/* Se houver visitas filtradas, exibe os dados na tabela */}
          {visitasFiltradas.length > 0 ? (
            visitasFiltradas.map((visita) => (
              <tr key={visita.id}>
                <td>{visita.digitadoPor}</td>
                <td>{visita.data}</td>
                <td>{visita.conferidoPor}</td>
                <td>
                  {/* Botão para visualizar detalhes da visita */}
                  <button onClick={() => navigate(`/visitadomiciliar/detalhes/${visita.id}`)}>Detalhes</button>
                  
                  {/* Botão para editar a visita */}
                  <button onClick={() => navigate(`/visitadomiciliar/editar/${visita.id}`)}>Editar</button>
                  
                  {/* Botão para excluir a visita */}
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






