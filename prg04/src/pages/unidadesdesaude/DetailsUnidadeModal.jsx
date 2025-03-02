import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailsUnidadeModal = ({ show, onClose, data }) => {

  if (!data) {
    return null; // Ou renderize algo como um carregamento até os dados estarem disponíveis
  }

  return (
    
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.tipo} {data.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nome:</strong>{data.nome}</p>
        <p><strong>Tipo:</strong> {data.tipo}</p>
        <p><strong>Telefone:</strong> {data.telefone}</p>
        <p><strong>Horário:</strong> {data.horario_funcionamento}</p>
        <p><strong>Capacidade:</strong> {data.capacidade_atendimento}</p>
        <p className='mb-5'><strong>Status:</strong> {data.status}</p>
        <h3>Endereço:</h3>
        <p><strong>Rua:</strong> {data.endereco.id.rua}</p>
        <p><strong>Número:</strong> {data.endereco.id.numero}</p>
        <p><strong>CEP:</strong> {data.endereco.id.cep}</p>
        <p><strong>Complemento:</strong> {data.endereco.complemento || 'N/A'}</p>
        <p><strong>Bairro:</strong> {data.endereco.bairro}</p>
        <p><strong>Cidade:</strong> {data.endereco.cidade}</p>
        <p><strong>UF:</strong> {data.endereco.uf}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsUnidadeModal;
