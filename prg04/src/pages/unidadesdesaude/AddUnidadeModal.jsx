import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

// Componente modal para adicionar uma nova unidade de saúde
const AddUnidadeModal = ({ show, onClose, onSubmit }) => {
  // Estado inicial para os dados do formulário
  const [data, setData] = useState({
    nome: '',
    tipo: 'HOSPITAL', // Valor padrão para o tipo
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: 'ATIVO', // Valor padrão para o status
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

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target; // Extrai nome e valor do campo alterado
    if (isEndereco) {
      // Se for um campo de endereço, atualiza a subseção 'endereco'
      setData({
        ...data,
        endereco: {
          ...data.endereco,
          [name]: value,
        },
      });
    } else {
      // Para campos normais, atualiza diretamente no nível raiz do data
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  // Função para transformar todos os campos de texto em maiúsculas
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

  // Função para validar se os campos obrigatórios estão preenchidos
  const isValid = () => {
    // Retorna true se todos os campos obrigatórios tiverem valor
    return (
      data.nome &&
      data.telefone &&
      data.horario_funcionamento && // Corrigido de horarioFuncionamento para corresponder ao estado
      data.capacidade_atendimento && // Corrigido de capacidadeAtendimento para corresponder ao estado
      data.endereco.rua &&
      data.endereco.numero &&
      data.endereco.cep &&
      data.endereco.bairro &&
      data.endereco.cidade &&
      data.endereco.uf
    );
  };

  // Função para submeter os dados do formulário
  const handleSubmit = () => {
    if (isValid()) {
      // Transforma os dados para maiúsculas antes de submeter
      const transformedData = transformDataToUpperCase(data);
      onSubmit(transformedData); // Chama a função de submissão passada como prop
      onClose(); // Fecha o modal após submissão bem-sucedida
    } else {
      // Exibe alerta se a validação falhar
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  // Renderização do componente
  return (
    // Modal do Bootstrap controlado pelas props show e onHide
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Unidade de Saúde</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campo Nome */}
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

          {/* Campo Tipo */}
          <Form.Group as={Row} controlId="tipo">
            <Form.Label column sm={3}>Tipo</Form.Label>
            <Col sm={9}>
              <Form.Select
                name="tipo"
                value={data.tipo}
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
                value={data.telefone}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* Campo Horário de Funcionamento */}
          <Form.Group as={Row} controlId="horarioFuncionamento">
            <Form.Label column sm={3}>Horário</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="horario_funcionamento" // Nome ajustado para corresponder ao estado
                value={data.horario_funcionamento}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* Campo Capacidade de Atendimento */}
          <Form.Group as={Row} controlId="capacidadeAtendimento">
            <Form.Label column sm={3}>Capacidade</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="capacidade_atendimento" // Nome ajustado para corresponder ao estado
                value={data.capacidade_atendimento}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          {/* Campo Status */}
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

          {/* Campo Rua */}
          <Form.Group as={Row} controlId="rua">
            <Form.Label column sm={3}>Rua</Form.Label>
            <Col sm={9}>
              <Form.Control
                name="rua"
                value={data.endereco.rua}
                onChange={(e) => handleChange(e, true)} // Indica que é campo de endereço
              />
            </Col>
          </Form.Group>

          {/* Campo Número */}
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

          {/* Campo CEP */}
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

          {/* Campo Complemento */}
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

          {/* Campo Bairro */}
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

          {/* Campo Cidade */}
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

          {/* Campo UF */}
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
        {/* Botão para cancelar e fechar o modal */}
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        {/* Botão para salvar os dados */}
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

// Exporta o componente para uso em outros arquivos
export default AddUnidadeModal;