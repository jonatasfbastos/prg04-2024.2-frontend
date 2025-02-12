import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './requisicao.css';

const BuscarRequisicoes = ({ onSearch }) => {
  const [busca, setBusca] = useState(""); // Estado para armazenar a busca

  const handleSearch = () => {
    if (onSearch) {
      onSearch(busca); // Passa o termo de busca para a função
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Digite o nome ou CPF..."
        className="search-input"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default BuscarRequisicoes;
