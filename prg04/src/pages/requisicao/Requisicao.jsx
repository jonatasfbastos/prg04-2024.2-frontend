import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa o axios
import "./requisicao.css";

const Requisicao = () => {
  const navigate = useNavigate();
  const [cpfPaciente, setCpfPaciente] = useState(""); // Estado para CPF do paciente
  const [nomePaciente, setNomePaciente] = useState("");
  const [exame, setExame] = useState("");
  const [listaExames, setListaExames] = useState([]);
  const [dataRequisicao, setDataRequisicao] = useState(""); // Adicionando data da requisição

  const adicionarExame = () => {
    if (exame.trim()) {
      setListaExames([...listaExames, exame]);
      setExame("");
    }
  };

  const removerExame = (index) => {
    setListaExames(listaExames.filter((_, i) => i !== index));
  };

  // Função para emitir a requisição
  const emitirRequisicao = async () => {
    try {
      const data = {
        cpfPaciente, // Envia o CPF do paciente
        nomePaciente, // Envia o nome do paciente
        exames: listaExames,
        dataRequisicao: dataRequisicao ? dataRequisicao : null, // Envia null se não houver data
      };

      const response = await axios.post("http://localhost:8080/requisicoes", data);

      console.log(response.data);

      navigate("/BuscarRequisicoes");
    } catch (error) {
      console.error("Erro ao emitir requisição:", error);
      alert("Erro ao emitir requisição. Tente novamente.");
    }
  };

  return (
    <div className="requisicao-container">
      <h2>Emitir Requisição de Exames</h2>

      <label>CPF do Paciente:</label>
      <input
        type="text"
        className="input-requisicao"
        value={cpfPaciente}
        onChange={(e) => setCpfPaciente(e.target.value)}
        placeholder="Digite o CPF do paciente"
      />

      <label>Nome do Paciente:</label>
      <input
        type="text"
        className="input-requisicao"
        value={nomePaciente}
        onChange={(e) => setNomePaciente(e.target.value)}
        placeholder="Digite o nome do paciente"
      />

      <label>Nome do Exame:</label>
      <input
        type="text"
        className="input-requisicao"
        value={exame}
        onChange={(e) => setExame(e.target.value)}
        placeholder="Digite o nome do exame"
      />
      <button className="botao-requisicao" onClick={adicionarExame}>Adicionar Exame</button>
      
      {listaExames.length > 0 && (
        <div className="lista-exames">
          <h3>Exames Adicionados:</h3>
          <ul>
            {listaExames.map((item, index) => (
              <li key={index}>
                {item}
                <button className="botao-requisicao remover-btn" onClick={() => removerExame(index)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Adicionando o campo de data */}
      <label>Data da Requisição:</label>
      <input
        type="datetime-local"
        className="input-requisicao"
        value={dataRequisicao}
        onChange={(e) => setDataRequisicao(e.target.value)}
      />

      <button className="botao-requisicao" onClick={emitirRequisicao}>
        Emitir Requisição
      </button>
      <button className="botao-requisicao" onClick={() => navigate("/BuscarRequisicoes")}>
        Voltar
      </button>
    </div>
  );
};

export default Requisicao;
