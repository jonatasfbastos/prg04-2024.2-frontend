import React from 'react';

const CampanhaTable = ({ campanhas, onEditar, onExcluir }) => {
  return (
    <table className="campanha-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Vacina</th>
          <th>Público Alvo</th>
          <th>Data Início</th>
          <th>Data Fim</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {campanhas.map((campanha) => (
          <tr key={campanha.id}>
            <td>{campanha.id}</td>
            <td>{campanha.nomec}</td>
            <td>{campanha.vacina}</td>
            <td>{campanha.publicoAlvo}</td>
            <td>{campanha.dataInicio}</td>
            <td>{campanha.dataFim}</td>
            <td>
              <button onClick={() => onEditar(campanha)}>Editar</button>
              <button onClick={() => onExcluir(campanha.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampanhaTable;