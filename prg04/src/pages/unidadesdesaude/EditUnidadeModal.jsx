import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditUnidadeModal = ({ show, onClose, onSubmit, data }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: ''
  });

  // Atualiza o estado com os dados da unidade, se houver
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target;
    if (isEndereco) {
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
      console.log(JSON.stringify(formData));
      onSubmit(formData);
      onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Unidade de Saúde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ marginLeft: '-15px', marginRight: '-15px' }}>
          <Form.Group as={Row} controlId="nome">
            <Form.Label column sm={3}>Nome</Form.Label>
            <Col sm={9}>
              <Form.Control name="nome" onChange={handleChange} placeholder={formData.nome} />
            </Col>
          </Form.Group>
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
          <Form.Group as={Row} controlId="telefone">
            <Form.Label column sm={3}>Telefone</Form.Label>
            <Col sm={9}>
              <Form.Control name="telefone"
              onChange={handleChange} placeholder={formData.telefone} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="horario_funcionamento">
            <Form.Label column sm={3}>Horário</Form.Label>
            <Col sm={9}>
              <Form.Control name="horario_funcionamento" onChange={handleChange} placeholder={formData.horario_funcionamento}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="capacidade_atendimento">
            <Form.Label column sm={3}>Capacidade</Form.Label>
            <Col sm={9}>
              <Form.Control name="capacidade_atendimento" onChange={handleChange} placeholder={formData.capacidade_atendimento}/>
            </Col>
          </Form.Group>
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
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUnidadeModal;
