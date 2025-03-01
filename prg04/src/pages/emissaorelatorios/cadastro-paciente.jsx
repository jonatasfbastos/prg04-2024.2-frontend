import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CadastroPaciente = ({ show, onClose, onSubmit }) => {
  const [paciente, setPaciente] = useState({ nome: '', cpf: '', dataNascimento: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = () => {
    if (paciente.nome && paciente.cpf && paciente.dataNascimento) {
      onSubmit(paciente);
      onClose();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={paciente.nome} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="dataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" name="dataNascimento" value={paciente.dataNascimento} onChange={handleChange} />
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

export default CadastroPaciente;
