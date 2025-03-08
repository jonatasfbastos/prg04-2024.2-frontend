import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

// Componente modal para edição de unidades de saúde
const EditUnidadeModal = ({ show, onClose, onSubmit, data }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: ''
  });

  // Efeito para preencher o formulário com os dados da unidade quando recebidos
  useEffect(() => {
    if (data) {
      // Atualiza o estado com os dados fornecidos, espalhando para manter a estrutura
      setFormData({ ...data });
    }
  }, [data]); // Executa sempre que 'data' mudar

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target; // Extrai nome e valor do campo alterado
    if (isEndereco) {
      // Se for um campo de endereço, atualiza apenas a subseção 'endereco'
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [name]: value,
        },
      });
    } else {
      // Para campos normais, atualiza diretamente no nível raiz do formData
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Função para submeter os dados editados
  const handleSubmit = () => {
    console.log(JSON.stringify(formData)); // Loga os dados para depuração
    onSubmit(formData); // Chama a função de submissão passada como prop
    onClose(); // Fecha o modal após submissão
  };

  // Renderização do componente
  return (
    // Modal do Bootstrap controlado pelas props show e onHide
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Unidade de Saúde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulário com margens ajustadas */}
        <Form style={{ marginLeft: '-15px', marginRight: '-15px' }}>
          {/* Campo Nome */}
          <Form.Group as={Row} controlId="nome">
            <Form.Label column sm={3}>Nome</Form.Label>
            <Col sm={9}>
              <Form.Control 
                name="nome" 
                onChange={handleChange} 
                placeholder={formData.nome} // Mostra o valor atual como placeholder
              />
            </Col>
          </Form.Group>

          {/* Campo Tipo */}
          <Form.Group as={Row} controlId="tipo">
            <Form.Label column sm={3}>Tipo</Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="tipo" 
                value={formData.tipo} 
                onChange={handleChange}
              >
                <option value="HOSPITAL">HOSPITAL</option>
                <option value="FARMACIA">FARMACIA</option>
                <option value="UPA">UPA</option>
                <option value="UBS">UBS</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {/* Campo Telefone */}
          <Form.Group as={Row} controlId="telefone">
            <Form.Label column sm={3}>Telefone</Form.Label>
            <Col sm={9}>
              <Form.Control 
                name="telefone"
                onChange={handleChange} 
                placeholder={formData.telefone}
              />
            </Col>
          </Form.Group>

          {/* Campo Horário de Funcionamento */}
          <Form.Group as={Row} controlId="horario_funcionamento">
            <Form.Label column sm={3}>Horário</Form.Label>
            <Col sm={9}>
              <Form.Control 
                name="horario_funcionamento" 
                onChange={handleChange} 
                placeholder={formData.horario_funcionamento}
              />
            </Col>
          </Form.Group>

          {/* Campo Capacidade de Atendimento */}
          <Form.Group as={Row} controlId="capacidade_atendimento">
            <Form.Label column sm={3}>Capacidade</Form.Label>
            <Col sm={9}>
              <Form.Control 
                name="capacidade_atendimento" 
                onChange={handleChange} 
                placeholder={formData.capacidade_atendimento}
              />
            </Col>
          </Form.Group>

          {/* Campo Status */}
          <Form.Group as={Row} controlId="status" className='mb-5'>
            <Form.Label column sm={3}>Status</Form.Label>
            <Col sm={9}>
              <Form.Select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="INATIVO">INATIVO</option>
                <option value="ATIVO">ATIVO</option>
                <option value="EM_REFORMA">EM REFORMA</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Botão para cancelar e fechar o modal */}
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        {/* Botão para salvar as alterações */}
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Exporta o componente para uso em outros arquivos
export default EditUnidadeModal;