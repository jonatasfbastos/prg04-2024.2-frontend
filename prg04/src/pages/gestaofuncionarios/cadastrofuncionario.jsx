import React, { useState } from 'react';

// Define o componente 'cadastrofuncionario'
const cadastrofuncionario = () => {
  // Hook useState para gerenciar o estado dos dados do formulário
  const [formData, setFormData] = useState({
    codigo: '',
    login: '',
    senha: '',
    categoria: '',
    nome: '',
    cpf: '',
    endereco: '',
    telefone: '',
  });

  // Função handleChange para atualizar os dados do formData quando um campo é alterado
  const handleChange = (e) => {
    // Atualiza o campo específico em formData com base no nome do campo de entrada
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função handleSubmit para enviar os dados do formulário para a API quando o formulário for enviado
  const handleSubmit = async (e) => {
    // Previne o comportamento padrão de envio do formulário
    e.preventDefault();

    try {
      // Envia uma requisição POST para a API com os dados do formulário
      const response = await api.post('/funcionarios', formData);
      // Exibe a resposta da API em caso de sucesso
      console.log('Funcionário cadastrado:', response.data);
      // Exibe um alerta de sucesso
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      // Exibe um erro no console se a requisição falhar
      console.error('Erro ao cadastrar funcionário:', error);
      // Exibe um alerta de erro
      alert('Erro ao cadastrar funcionário.');
    }
  };

  return (
    // Formulário que chama a função handleSubmit ao ser submetido
    <form onSubmit={handleSubmit}>
      {/* Campos de entrada para cada dado do formulário */}
      <input type="text" name="codigo" placeholder="Código" onChange={handleChange} required />
      <input type="text" name="login" placeholder="Login" onChange={handleChange} required />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
      <input type="text" name="categoria" placeholder="Categoria" onChange={handleChange} required />
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
      <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
      <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} required />
      <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
      {/* Botão de envio para submeter o formulário */}
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default cadastrofuncionario;
