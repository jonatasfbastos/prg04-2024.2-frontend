import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Componente modal para exibir detalhes de uma unidade de saúde
const DetailsUnidadeModal = ({ show, onClose, data }) => {
  // Verifica se os dados estão disponíveis antes de renderizar
  if (!data) {
    return null; // Retorna null se não houver dados, evitando erros
    // Alternativamente, poderia renderizar um estado de carregamento
  }

  // Renderização do modal com os detalhes da unidade
  return (
    // Modal do Bootstrap controlado pelas props show e onHide
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        {/* Título dinâmico com o tipo e nome da unidade */}
        <Modal.Title>{data.tipo} {data.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Exibição dos dados principais da unidade */}
        <p><strong>Nome:</strong> {data.nome}</p>
        <p><strong>Tipo:</strong> {data.tipo}</p>
        <p><strong>Telefone:</strong> {data.telefone}</p>
        <p><strong>Horário:</strong> {data.horario_funcionamento}</p>
        <p><strong>Capacidade:</strong> {data.capacidade_atendimento}</p>
        {/* Último parágrafo com margem inferior para separação */}
        <p className='mb-5'><strong>Status:</strong> {data.status}</p>

        {/* Seção de endereço */}
        <h3>Endereço:</h3>
        <p><strong>Rua:</strong> {data.endereco.id.rua}</p>
        <p><strong>Número:</strong> {data.endereco.id.numero}</p>
        <p><strong>CEP:</strong> {data.endereco.id.cep}</p>
        {/* Mostra 'N/A' se o complemento não estiver definido */}
        <p><strong>Complemento:</strong> {data.endereco.complemento || 'N/A'}</p>
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

// Exporta o componente para uso em outros arquivos
export default DetailsUnidadeModal;