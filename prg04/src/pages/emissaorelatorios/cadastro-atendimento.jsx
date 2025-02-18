import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const CadastroAtendimento = ({ show, onClose, onSubmit, funcionarios, pacientes }) => {
  const [data, setData] = useState({
    funcionario: '',
    paciente: '',
    dataInicio: '',
    dataTermino: '',
    tipoAtendimento: 'Consulta',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    if (data.funcionario && data.paciente && data.dataInicio && data.dataTermino && data.tipoAtendimento) {
      onSubmit(data);
      onClose();
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Atendimento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="funcionario">
            <Form.Label column sm={4}>Funcionário</Form.Label>
            <Col sm={8}>
              <Form.Select name="funcionario" value={data.funcionario} onChange={handleChange}>
                <option value="">Selecione um funcionário</option>
                {funcionarios.map((func) => (
                  <option key={func.id} value={func.id}>{func.nome}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="paciente">
            <Form.Label column sm={4}>Paciente</Form.Label>
            <Col sm={8}>
              <Form.Select name="paciente" value={data.paciente} onChange={handleChange}>
                <option value="">Selecione um paciente</option>
                {pacientes.map((pac) => (
                  <option key={pac.id} value={pac.id}>{pac.nome}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="dataInicio">
            <Form.Label column sm={4}>Data Início</Form.Label>
            <Col sm={8}>
              <Form.Control type="datetime-local" name="dataInicio" value={data.dataInicio} onChange={handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="dataTermino">
            <Form.Label column sm={4}>Data Término</Form.Label>
            <Col sm={8}>
              <Form.Control type="datetime-local" name="dataTermino" value={data.dataTermino} onChange={handleChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="tipoAtendimento">
            <Form.Label column sm={4}>Tipo de Atendimento</Form.Label>
            <Col sm={8}>
              <Form.Select name="tipoAtendimento" value={data.tipoAtendimento} onChange={handleChange}>
                <option value="Consulta">Consulta</option>
                <option value="Exame">Exame</option>
                <option value="Cirurgia">Cirurgia</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CadastroAtendimento;
