import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddUnidadeModal = ({ show, onClose, onSubmit }) => {
  const [data, setData] = useState({
    nome: '',
    tipo: 'HOSPITAL',
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: 'ATIVO',
    endereco: {
      rua: '',
      numero: '',
      cep: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
  });

  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target;
    if (isEndereco) {
      setData({
        ...data,
        endereco: {
          ...data.endereco,
          [name]: value,
        },
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const transformDataToUpperCase = (data) => {
    return {
      ...data,
      nome: data.nome.toUpperCase(),
      tipo: data.tipo.toUpperCase(),
      telefone: data.telefone.toUpperCase(),
      horario_funcionamento: data.horario_funcionamento.toUpperCase(),
      capacidade_atendimento: data.capacidade_atendimento.toUpperCase(),
      status: data.status.toUpperCase(),
      endereco: {
        rua: data.endereco.rua.toUpperCase(),
        numero: data.endereco.numero.toUpperCase(),
        cep: data.endereco.cep.toUpperCase(),
        complemento: data.endereco.complemento.toUpperCase(),
        bairro: data.endereco.bairro.toUpperCase(),
        cidade: data.endereco.cidade.toUpperCase(),
        uf: data.endereco.uf.toUpperCase(),
      },
    };
  };

  const isValid = () => {
    // Validação simples para garantir que todos os campos estão preenchidos
    return (
      data.nome &&
      data.telefone &&
      data.horarioFuncionamento &&
      data.capacidadeAtendimento &&
      data.endereco.rua &&
      data.endereco.numero &&
      data.endereco.cep &&
      data.endereco.bairro &&
      data.endereco.cidade &&
      data.endereco.uf
    );
  };

  const handleSubmit = () => {
    if (isValid()) {
      const transformedData = transformDataToUpperCase(data); // Transformando os dados para maiúsculo
      onSubmit(transformedData); // Passando os dados preenchidos para o componente Unidades
      onClose(); // Fechando o modal após a submissão
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Unidade de Saúde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ marginLeft: '-15px', marginRight: '-15px' }}>
          <Form.Group as={Row} controlId="nome">
            <Form.Label column sm={3}>Nome</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="nome"
                value={data.nome}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="tipo">
            <Form.Label column sm={3}>Tipo</Form.Label>
            <Col sm={9}>
              <Form.Select
                name="tipo"
                value={data.tipo}
                onChange={handleChange}
              >
                <option value="HOSPITAL">HOSPITAL</option>
                <option value="FARMACIA">FARMÁCIA</option>
                <option value="UPA">UPA</option>
                <option value="UBS">UBS</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="telefone">
            <Form.Label column sm={3}>Telefone</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="telefone"
                value={data.telefone}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="horarioFuncionamento">
            <Form.Label column sm={3}>Horário</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="horarioFuncionamento"
                value={data.horarioFuncionamento}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="capacidadeAtendimento">
            <Form.Label column sm={3}>Capacidade</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="capacidadeAtendimento"
                value={data.capacidadeAtendimento}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="status">
            <Form.Label column sm={3}>Status</Form.Label>
            <Col sm={9}>
              <Form.Select
                name="status"
                value={data.status}
                onChange={handleChange}
              >
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
                <option value="EM REFORMA">EM_REFORMA</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="rua">
            <Form.Label column sm={3}>Rua</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="rua"
                value={data.endereco.rua}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="numero">
            <Form.Label column sm={3}>Número</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="numero"
                value={data.endereco.numero}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="cep">
            <Form.Label column sm={3}>CEP</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="cep"
                value={data.endereco.cep}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="complemento">
            <Form.Label column sm={3}>Complemento</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="complemento"
                value={data.endereco.complemento}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="bairro">
            <Form.Label column sm={3}>Bairro</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="bairro"
                value={data.endereco.bairro}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="cidade">
            <Form.Label column sm={3}>Cidade</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="cidade"
                value={data.endereco.cidade}
                onChange={(e) => handleChange(e, true)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="uf">
            <Form.Label column sm={3}>UF</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="uf"
                value={data.endereco.uf}
                onChange={(e) => handleChange(e, true)}
              />
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

export default AddUnidadeModal;
