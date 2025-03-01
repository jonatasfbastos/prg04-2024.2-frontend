import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

// Componente funcional EditUnidadeModal que recebe props: show, onClose, onSubmit e data
const EditUnidadeModal = ({ show, onClose, onSubmit, data }) => {
  // Estado inicial do formulário com campos vazios
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: ''
  });

  // Efeito que atualiza o estado do formulário quando o prop 'data' é alterado
  useEffect(() => {
    if (data) {
      setFormData({ ...data }); // Copia os dados recebidos para o estado do formulário
    }
  }, [data]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target;
    if (isEndereco) {
      // Se o campo for parte do endereço, atualiza o estado do endereço
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [name]: value,
        },
      });
    } else {
      // Caso contrário, atualiza o estado do campo diretamente
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    console.log(JSON.stringify(formData)); // Log dos dados do formulário
    onSubmit(formData); // Chama a função onSubmit passada como prop com os dados do formulário
    onClose(); // Fecha o modal após o envio
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Unidade de Saúde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ marginLeft: '-15px', marginRight: '-15px' }}>
          {/* Campo para o nome da unidade */}
          <Form.Group as={Row} controlId="nome">
            <Form.Label column sm={3}>Nome</Form.Label>
            <Col sm={9}>
              <Form.Control name="nome" onChange={handleChange} placeholder={formData.nome} />
            </Col>
          </Form.Group>

          {/* Campo para o tipo da unidade */}
          <Form.Group as={Row} controlId="tipo">
            <Form.Label column sm={3}>Tipo</Form.Label>
            <Col sm={9}>
              <Form.Select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="HOSPITAL">HOSPITAL</option>
                <option value="FARMACIA">FARMACIA</option>
                <option value="UPA">UPA</option>
                <option value="UBS">UBS</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {/* Campo para o telefone da unidade */}
          <Form.Group as={Row} controlId="telefone">
            <Form.Label column sm={3}>Telefone</Form.Label>
            <Col sm={9}>
              <Form.Control name="telefone" onChange={handleChange} placeholder={formData.telefone} />
            </Col>
          </Form.Group>

          {/* Campo para o horário de funcionamento da unidade */}
          <Form.Group as={Row} controlId="horario_funcionamento">
            <Form.Label column sm={3}>Horário</Form.Label>
            <Col sm={9}>
              <Form.Control name="horario_funcionamento" onChange={handleChange} placeholder={formData.horario_funcionamento}/>
            </Col>
          </Form.Group>

          {/* Campo para a capacidade de atendimento da unidade */}
          <Form.Group as={Row} controlId="capacidade_atendimento">
            <Form.Label column sm={3}>Capacidade</Form.Label>
            <Col sm={9}>
              <Form.Control name="capacidade_atendimento" onChange={handleChange} placeholder={formData.capacidade_atendimento}/>
            </Col>
          </Form.Group>

          {/* Campo para o status da unidade */}
          <Form.Group as={Row} controlId="status" className='mb-5'>
            <Form.Label column sm={3}>Status</Form.Label>
            <Col sm={9}>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="INATIVO">INATIVO</option>
                <option value="ATIVO">ATIVO</option>
                <option value="EM REFORMA">EM REFORMA</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Botão para cancelar e fechar o modal */}
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        {/* Botão para salvar as alterações e fechar o modal */}
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUnidadeModal;