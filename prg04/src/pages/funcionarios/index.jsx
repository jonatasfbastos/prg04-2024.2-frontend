import 'react';
import CadastroFuncionario from './cadastrofuncionario';
import TableFuncionario from './tablefuncionario';


const Funcionarios = () => {
  return (
    <div>
      <h1>Gestão de Funcionários</h1>
      <CadastroFuncionario />
      <TableFuncionario />
    </div>
  );
};

export default Funcionarios;