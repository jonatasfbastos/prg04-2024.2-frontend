import React, { useState } from "react";
import axios from "axios";
import "./requisicao.css";

const BuscarRequisicoes = () => {
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicoes, setRequisicoes] = useState([]); // Estado para armazenar os dados das requisições

  const handleSearch = async () => {
    setErro("");
    setCarregando(true);

    if (!busca.trim()) {
      setErro("Por favor, digite um nome ou CPF.");
      setCarregando(false);
      return;
    }

    try {
      let response;
      const isCpf = /^\d{11}$/.test(busca); // Verifica se tem exatamente 11 dígitos numéricos

      if (isCpf) {
        response = await axios.get(`http://localhost:8080/requisicoes/buscar/cpf/${busca}`);
      } else {
        response = await axios.get(`http://localhost:8080/requisicoes/buscar/nome/${busca}`);
      }
      console.log("Resultado da busca:", response.data);

      // Atualiza o estado com os dados recebidos
      setRequisicoes(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErro("Nenhuma requisição encontrada.");
      } else {
        setErro("Erro ao buscar requisições. Tente novamente.");
      }
      console.error("Erro na busca:", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/requisicoes/${id}`);
      // Após deletar, removemos a requisição da lista
      setRequisicoes(requisicoes.filter((requisicao) => requisicao.id !== id));
      alert("Requisição removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover requisição", error);
      alert("Erro ao remover a requisição. Tente novamente.");
    }
  };

  const irParaRequisicao = () => {
    window.location.href = "/requisicao";
  };

  return (
    <div className="search-container">
      <h2>Buscar Requisição</h2>
      <input
        type="text"
        placeholder="Digite o nome ou CPF..."
        className="search-input"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch} disabled={carregando}>
        {carregando ? "Buscando..." : "Buscar"}
      </button>

      <button className="create-button" onClick={irParaRequisicao}>
        Emitir Requisição
      </button>

      {erro && <div className="error-message">{erro}</div>}

      {requisicoes.length > 0 && (
        <div className="results">
          <h3>Requisições Encontradas:</h3>
          <ul>
            {requisicoes.map((requisicao, index) => (
              <li key={index}>
                <h4>Paciente: {requisicao.paciente.nome}</h4>
                <p>CPF: {requisicao.paciente.cpf}</p>
                <h5>Exames:</h5>
                {requisicao.exames.length > 0 ? (
                  <ul>
                    {requisicao.exames.map((exame, exameIndex) => (
                      <li key={exameIndex}>
                        <p>Exame: {exame}</p>
                        <p>
                          Data: {new Date(requisicao.dataRequisicao[0], requisicao.dataRequisicao[1] - 1, requisicao.dataRequisicao[2]).toLocaleDateString('pt-BR')}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum exame encontrado.</p>
                )}
                {/* Botão para remover a requisição */}
                <button onClick={() => handleDelete(requisicao.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuscarRequisicoes;
