import React, { useEffect, useState } from 'react';

// Componente para exibir a tabela de funcionários
const tablefuncionario = () => {
  // Hook useState para gerenciar a lista de funcionários
  const [funcionarios, setFuncionarios] = useState([]);

  // useEffect para buscar os funcionários da API assim que o componente for montado
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        // Faz uma requisição GET para buscar os dados dos funcionários da API
        const response = await api.get('/funcionarios');
        // Atualiza o estado 'funcionarios' com os dados retornados da API
        setFuncionarios(response.data);
      } catch (error) {
        // Exibe um erro no console caso a requisição falhe
        console.error('Erro ao buscar funcionários:', error);
      }
    };
    // Chama a função para buscar os funcionários quando o componente for montado
    fetchFuncionarios();
  }, []); // O array vazio [] significa que esse efeito é executado apenas uma vez, na montagem inicial do componente

  return (
    // Tabela para exibir os dados dos funcionários
    <table>
      <thead>
        <tr>
          {/* Cabeçalhos das colunas */}
          <th>Código</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapeia a lista de funcionários e cria uma linha para cada um */}
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.codigo}>
            <td>{funcionario.codigo}</td>
            <td>{funcionario.nome}</td>
            <td>{funcionario.cpf}</td>
            <td>{funcionario.categoria}</td>
            <td>
              {/* Botões para editar ou remover o funcionário */}
              <button>Editar</button>
              <button>Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default tablefuncionario;
