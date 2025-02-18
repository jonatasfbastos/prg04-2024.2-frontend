import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CadastroFuncionario = ({ show, onClose, onSubmit }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    if (!nome.trim()) {
      alert('O nome do funcionário é obrigatório!');
      return;
    }
    onSubmit({ nome });
    setNome('');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Funcionário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nomeFuncionario">
            <Form.Label>Nome do Funcionário</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome"
            />
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

export default CadastroFuncionario;