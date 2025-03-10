import React, { useState } from "react";
import axios from "axios";
import "./requisicao.css";

const BuscarRequisicoes = () => {
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [requisicoes, setRequisicoes] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRequisicoes = async (pageToFetch = 0) => {
    setErro("");
    setCarregando(true);

    if (!busca.trim()) {
      setErro("Por favor, digite um nome ou CPF.");
      setCarregando(false);
      return;
    }

    try {
      let url;
      const isCpf = /^\d{11}$/.test(busca);
      if (isCpf) {
        url = `http://localhost:8080/requisicoes/buscar/cpf/${busca}?page=${pageToFetch}&size=${size}&sort=dataRequisicao,desc`;
      } else {
        url = `http://localhost:8080/requisicoes/buscar/nome/${busca}?page=${pageToFetch}&size=${size}&sort=dataRequisicao,desc`;
      }
      const response = await axios.get(url);
      console.log("Dados recebidos do backend:", response.data);
      setRequisicoes(response.data.content);
      setTotalPages(response.data.totalPages);
      setPage(response.data.number);
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

  const handleSearch = () => {
    fetchRequisicoes(0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/requisicoes/${id}`);
      setRequisicoes(requisicoes.filter((req) => req.id !== id));
      alert("Requisição removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover requisição", error);
      alert("Erro ao remover a requisição. Tente novamente.");
    }
  };

  const irParaRequisicao = () => {
    window.location.href = "/requisicao";
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      fetchRequisicoes(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      fetchRequisicoes(page - 1);
    }
  };

  // Função ajustada para exibir a data como string bruta
  const formatarData = (dataStr) => {
    if (!dataStr) return "Não informada";
    console.log("Data recebida:", dataStr); // Depuração
    return dataStr.replace("T", " ").substring(0, 16); // Exibe como "2025-03-21 22:02"
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
      <button className="button-requisicao" onClick={handleSearch} disabled={carregando}>
        {carregando ? "Buscando..." : "Buscar"}
      </button>
      <button className="button-requisicao" onClick={irParaRequisicao}>
        Emitir Requisição
      </button>

      {erro && <div className="error-message">{erro}</div>}

      {requisicoes.length > 0 && (
        <div className="results">
          <h3>Requisições Encontradas:</h3>
          <ul>
            {requisicoes.map((requisicao) => (
              <li key={requisicao.id}>
                <h4>
                  Paciente: {requisicao.paciente?.nome || "Nome não disponível"}
                </h4>
                <p>Data: {formatarData(requisicao.dataRequisicao)}</p>
                <h5>Exames:</h5>
                {requisicao.exames && requisicao.exames.length > 0 ? (
                  <ul>
                    {requisicao.exames.map((exame, index) => (
                      <li key={index}>
                        <p>Exame: {exame}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Nenhum exame encontrado.</p>
                )}
                <button className="remover-btn" onClick={() => handleDelete(requisicao.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Anterior
            </button>
            <span>
              Página {page + 1} de {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscarRequisicoes;