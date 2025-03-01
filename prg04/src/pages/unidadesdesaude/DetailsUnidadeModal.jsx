import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Componente funcional DetailsUnidadeModal que recebe props: show, onClose e data
const DetailsUnidadeModal = ({ show, onClose, data }) => {

  // Verifica se os dados foram fornecidos. Caso contrário, retorna null (ou pode renderizar um estado de carregamento)
  if (!data) {
    return null; // Ou renderize algo como um carregamento até os dados estarem disponíveis
  }

  return (
    // Modal que exibe os detalhes da unidade de saúde
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        {/* Título do modal com o tipo e nome da unidade */}
        <Modal.Title>{data.tipo} {data.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Exibição dos detalhes da unidade */}
        <p><strong>Nome:</strong> {data.nome}</p>
        <p><strong>Tipo:</strong> {data.tipo}</p>
        <p><strong>Telefone:</strong> {data.telefone}</p>
        <p><strong>Horário:</strong> {data.horario_funcionamento}</p>
        <p><strong>Capacidade:</strong> {data.capacidade_atendimento}</p>
        <p className='mb-5'><strong>Status:</strong> {data.status}</p>

        {/* Seção do endereço da unidade */}
        <h3>Endereço:</h3>
        <p><strong>Rua:</strong> {data.endereco.id.rua}</p>
        <p><strong>Número:</strong> {data.endereco.id.numero}</p>
        <p><strong>CEP:</strong> {data.endereco.id.cep}</p>
        <p><strong>Complemento:</strong> {data.endereco.complemento || 'N/A'}</p> {/* Exibe 'N/A' se o complemento não estiver disponível */}
        <p><strong>Bairro:</strong> {data.endereco.bairro}</p>
        <p><strong>Cidade:</strong> {data.endereco.cidade}</p>
        <p><strong>UF:</strong> {data.endereco.uf}</p>
      </Modal.Body>
      <Modal.Footer>
        {/* Botão para fechar o modal */}
        <Button variant="secondary" onClick={onClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsUnidadeModal;