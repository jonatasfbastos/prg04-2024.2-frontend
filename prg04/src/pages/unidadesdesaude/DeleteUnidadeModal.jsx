import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteUnidadeModal = ({ show, onClose, onConfirm, unidade }) => {
  const handleDelete = () => {
    onConfirm(unidade);
    onClose();
  };

  if (!unidade) {
    return null; // Ou renderize algo como um carregamento até os dados estarem disponíveis
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Deseja realmente excluir essa unidade {unidade.tipo} {unidade.nome} ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>Confirmar Exclusão</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUnidadeModal;
