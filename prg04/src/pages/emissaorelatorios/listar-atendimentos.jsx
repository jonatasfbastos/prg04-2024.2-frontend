import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import './listar-atendimentos.css';

const ListarAtendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [filtros, setFiltros] = useState({
    paciente: '',
    funcionario: '',
    dataInicio: '',
    dataTermino: ''
  });

  useEffect(() => {
    carregarAtendimentos();
  }, []);

  const carregarAtendimentos = async () => {
    try {
      const response = await axios.get('/api/atendimentos');
      setAtendimentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
    }
  };

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleFiltrar = async () => {
    try {
      const response = await axios.get('/api/atendimentos', { params: filtros });
      setAtendimentos(response.data);
    } catch (error) {
      console.error('Erro ao filtrar atendimentos:', error);
    }
  };

  return (
    <div className="listar-atendimentos-container">
      <h1>Lista de Atendimentos</h1>
      <div className="filtros">
        <Form>
          <Form.Group>
            <Form.Label>Nome do Paciente</Form.Label>
            <Form.Control name="paciente" value={filtros.paciente} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nome do Funcionário</Form.Label>
            <Form.Control name="funcionario" value={filtros.funcionario} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Início</Form.Label>
            <Form.Control type="date" name="dataInicio" value={filtros.dataInicio} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Término</Form.Label>
            <Form.Control type="date" name="dataTermino" value={filtros.dataTermino} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleFiltrar}>Filtrar</Button>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Funcionário</th>
            <th>Tipo de Atendimento</th>
            <th>Data de Início</th>
            <th>Data de Término</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos.map((atendimento) => (
            <tr key={atendimento.id}>
              <td>{atendimento.paciente.nome}</td>
              <td>{atendimento.funcionario.nome}</td>
              <td>{atendimento.tipoAtendimento}</td>
              <td>{new Date(atendimento.dataHoraInicio).toLocaleString()}</td>
              <td>{new Date(atendimento.dataHoraTermino).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarAtendimentos;
