import  { useEffect, useState } from 'react';
import api from '../funcionarios/services/api'; // Importa a instância configurada do axios

const tablefuncionario = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [funcionarios, setFuncionarios] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios');
        setFuncionarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchFuncionarios();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.codigo}>
            <td>{funcionario.codigo}</td>
            <td>{funcionario.nome}</td>
            <td>{funcionario.cpf}</td>
            <td>{funcionario.categoria}</td>
            <td>
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