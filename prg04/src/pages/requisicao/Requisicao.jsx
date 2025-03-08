import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./requisicao.css";

const Requisicao = () => {
  const navigate = useNavigate();
  const [cpfPaciente, setCpfPaciente] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [selectedExameId, setSelectedExameId] = useState(""); // Para o dropdown de exames
  const [listaExameIds, setListaExameIds] = useState([]); // Lista de IDs dos exames selecionados
  const [examesDisponiveis, setExamesDisponiveis] = useState([]); // Lista de exames do backend
  const [dataRequisicao, setDataRequisicao] = useState("");

  // Buscar exames disponíveis ao carregar o componente
  useEffect(() => {
    const fetchExames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/exames");
        setExamesDisponiveis(response.data); // Ex.: [{id: 1, descricao: "Hemograma"}, {id: 2, descricao: "Glicemia"}]
      } catch (error) {
        console.error("Erro ao buscar exames:", error);
        alert("Erro ao carregar exames disponíveis.");
      }
    };
    fetchExames();
  }, []);

  const adicionarExame = () => {
    if (selectedExameId) {
      // Evitar duplicatas
      if (!listaExameIds.includes(Number(selectedExameId))) {
        setListaExameIds([...listaExameIds, Number(selectedExameId)]);
      }
      setSelectedExameId(""); // Limpar o dropdown
    }
  };

  const removerExame = (index) => {
    setListaExameIds(listaExameIds.filter((_, i) => i !== index));
  };

  // Função para emitir a requisição
  const emitirRequisicao = async () => {
    try {
      const data = {
        cpfPaciente,
        nomePaciente,
        exameIds: listaExameIds, // Envia como [1, 2, 3]
        dataRequisicao: dataRequisicao ? dataRequisicao : null,
      };

      const response = await axios.post("http://localhost:8080/requisicoes", data);

      console.log(response.data);

      navigate("/BuscarRequisicoes");
    } catch (error) {
      console.error("Erro ao emitir requisição:", error);
      alert("Erro ao emitir requisição. Tente novamente.");
    }
  };

  // Função auxiliar para obter a descrição do exame pelo ID
  const getDescricaoExame = (id) => {
    const exame = examesDisponiveis.find(exame => exame.id === id);
    return exame ? exame.descricao : "Desconhecido";
  };

  return (
    <div className="requisicao-container">
      <h2>Emitir Requisição de Exames</h2>

      <label>CPF do Paciente:</label>
      <input
        type="text"
        value={cpfPaciente}
        onChange={(e) => setCpfPaciente(e.target.value)}
        placeholder="Digite o CPF do paciente"
      />

      <label>Nome do Paciente:</label>
      <input
        type="text"
        value={nomePaciente}
        onChange={(e) => setNomePaciente(e.target.value)}
        placeholder="Digite o nome do paciente"
      />

      <label>Selecione o Exame:</label>
      <select className="exame-select"
        value={selectedExameId}
        onChange={(e) => setSelectedExameId(e.target.value)}
      >
        <option className="exame-option" value="">Selecione um exame</option>
        {examesDisponiveis.map((exame) => (
          <option key={exame.id} value={exame.id}>
            {exame.descricao}
          </option>
        ))}
      </select>
      <button  className="exame-btn" onClick={adicionarExame}>Adicionar Exame</button>

      {listaExameIds.length > 0 && (
        <div className="lista-exames">
          <h3>Exames Selecionados:</h3>
          <ul>
            {listaExameIds.map((exameId, index) => (
              <li key={index}>
                {getDescricaoExame(exameId)}
                <button className="remover-btn" onClick={() => removerExame(index)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <label className="data-label">Data da Requisição:</label>
      <input className="data-input"
        type="datetime-local"
        value={dataRequisicao}
        onChange={(e) => setDataRequisicao(e.target.value)}
      />

      <button className="button-requisicao" onClick={emitirRequisicao}>
        Emitir Requisição
      </button>
      <button className="button-requisicao" onClick={() => navigate("/BuscarRequisicoes")}>
        Voltar
      </button>
    </div>
  );
};

export default Requisicao;