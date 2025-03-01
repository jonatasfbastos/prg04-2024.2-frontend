import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * Componente Modal para confirmação de exclusão de uma unidade de saúde
 * @param {boolean} show - Controla a visibilidade do modal
 * @param {function} onClose - Função para fechar o modal
 * @param {function} onConfirm - Função para confirmar a exclusão
 * @param {Object} unidade - Objeto contendo os dados da unidade a ser excluída
 */
const DeleteUnidadeModal = ({ show, onClose, onConfirm, unidade }) => {
  /**
   * Função para lidar com a confirmação da exclusão
   * Chama a função onConfirm passando o objeto unidade e fecha o modal
   */
  const handleDelete = () => {
    onConfirm(unidade); // Chama a função de exclusão definida no componente pai
    onClose(); // Fecha o modal após confirmar a exclusão
  };

  // Verifica se o objeto unidade existe antes de renderizar o modal
  if (!unidade) {
    return null; // Não renderiza nada se a unidade não estiver disponível
  }

  // Renderiza o modal de confirmação de exclusão
  return (
    <Modal show={show} onHide={onClose}>
      {/* Cabeçalho do modal */}
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      
      {/* Corpo do modal com mensagem de confirmação personalizada */}
      <Modal.Body>
        <p>Deseja realmente excluir essa unidade {unidade.tipo} {unidade.nome} ?</p>
      </Modal.Body>
      
      {/* Rodapé do modal com botões de ação */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>Confirmar Exclusão</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUnidadeModal;