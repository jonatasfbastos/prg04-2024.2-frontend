import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Componente modal para confirmação de exclusão de uma unidade
const DeleteUnidadeModal = ({ show, onClose, onConfirm, unidade }) => {
  // Função para lidar com a confirmação da exclusão
  const handleDelete = () => {
    onConfirm(unidade); // Chama a função de confirmação passando a unidade
    onClose(); // Fecha o modal após a confirmação
  };

  // Verifica se os dados da unidade estão disponíveis antes de renderizar
  if (!unidade) {
    return null; // Retorna null se não houver dados, evitando erros
    // Alternativamente, poderia exibir um estado de carregamento
  }

  // Renderização do modal de confirmação
  return (
    // Modal do Bootstrap controlado pelas props show e onHide
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mensagem de confirmação com tipo e nome da unidade */}
        <p>Deseja realmente excluir essa unidade {unidade.tipo} {unidade.nome} ?</p>
      </Modal.Body>
      <Modal.Footer>
        {/* Botão para cancelar e fechar o modal */}
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        {/* Botão para confirmar a exclusão */}
        <Button variant="danger" onClick={handleDelete}>Confirmar Exclusão</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Exporta o componente para uso em outros arquivos
export default DeleteUnidadeModal;