import React, { useState } from 'react';

const cadastrofuncionario = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/funcionarios', formData);
      console.log('Funcionário cadastrado:', response.data);
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar funcionário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="codigo" placeholder="Código" onChange={handleChange} required />
      <input type="text" name="login" placeholder="Login" onChange={handleChange} required />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
      <input type="text" name="categoria" placeholder="Categoria" onChange={handleChange} required />
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
      <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
      <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} required />
      <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default cadastrofuncionario;