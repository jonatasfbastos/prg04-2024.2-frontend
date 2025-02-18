import { useState } from "react";
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
// Importe aqui as funções da API:
import { saveAnamnese, saveDocumento } from "./ProntuarioService";

const NovoProntuarioScreen = () => {
  // Supondo que os dados do paciente e do prontuário foram enviados via state ou props
  const navigate = useNavigate();

  const location = useLocation();
  const { prontuario, paciente } = location.state || {};

  // Controle dos modais
  const [showAnamneseModal, setShowAnamneseModal] = useState(false);
  const [showDocumentoModal, setShowDocumentoModal] = useState(false);

  // Estado para formulário da anamnese
  const [anamneseForm, setAnamneseForm] = useState({
    queixasPrincipais: "",
    sintomasRelatados: "",
    condicoesAtuais: "",
  });

  // Estado para formulário do documento
  const [documentoForm, setDocumentoForm] = useState({
    nomeArquivo: "",
    tipoArquivo: "",
    urlArquivo: "",
  });

  // Manipulação dos campos da anamnese
  const handleAnamneseChange = (e) => {
    setAnamneseForm({
      ...anamneseForm,
      [e.target.name]: e.target.value,
    });
  };

  // Manipulação dos campos do documento (exceto o file)
  const handleDocumentoChange = (e) => {
    setDocumentoForm({
      ...documentoForm,
      [e.target.name]: e.target.value,
    });
  };

  // Manipulação do input de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aqui você pode fazer o upload do arquivo para obter a URL
      // Por exemplo, utilizando um serviço de upload e recuperando a URL do arquivo
      // Para este exemplo, usaremos uma URL temporária criada com URL.createObjectURL
      setDocumentoForm({
        ...documentoForm,
        nomeArquivo: file.name,
        tipoArquivo: file.type,
        urlArquivo: URL.createObjectURL(file),
      });
    }
  };

  // Função para salvar a nova anamnese
  const handleSaveAnamnese = async (e) => {
    e.preventDefault();
    try {
      // Aqui chame a função da API para salvar a anamnese:
      await saveAnamnese(anamneseForm, prontuario.id);
      console.log(
        "Salvar anamnese:",
        anamneseForm,
        "do prontuário:",
        prontuario.id
      );
      setShowAnamneseModal(false);
      // Opcional: limpar o formulário ou exibir uma mensagem de sucesso.
    } catch (error) {
      console.error("Erro ao salvar anamnese", error);
    }
  };

  // Função para salvar o novo documento
  const handleSaveDocumento = async (e) => {
    e.preventDefault();
    try {
      // Aqui chame a função da API para salvar o documento:
      await saveDocumento(documentoForm, prontuario.id);
      console.log(
        "Salvar documento:",
        documentoForm,
        "do prontuário:",
        prontuario.id
      );
      setShowDocumentoModal(false);
      // Opcional: limpar o formulário ou exibir uma mensagem de sucesso.
    } catch (error) {
      console.error("Erro ao salvar documento", error);
    }
  };

  // Função para finalizar e retornar à tela de detalhes do paciente
  const handleFinalizar = () => {
    // Aqui você pode realizar alguma ação adicional se necessário
    navigate("/detalhes-paciente");
  };

  return (
    <div className="container mt-4">
      <div className=" d-flex justify-content-center">
        <h2> Novo Prontuário</h2>
      </div>
      <Card className="p-4 mb-4">
        <Row>
          <Col md={6} className="d-flex flex-column align-items-center">
            <h4>Anamnese</h4>
            <p className="text-center">
              Registre uma nova anamnese para o paciente.
            </p>
            <Button
              variant="primary"
              onClick={() => setShowAnamneseModal(true)}
            >
              Nova Anamnese
            </Button>
          </Col>
          <Col md={6} className="d-flex flex-column align-items-center">
            <h4>Documento</h4>
            <p className="text-center">
              Anexe um documento relacionado ao prontuário.
            </p>
            <Button
              variant="secondary"
              onClick={() => setShowDocumentoModal(true)}
            >
              Novo Documento
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Botão para finalizar e retornar à tela de detalhes do paciente */}
      <div className="text-center">
        <Button variant="success" onClick={handleFinalizar}>
          Finalizar
        </Button>
      </div>

      {/* Modal para Nova Anamnese */}
      <Modal
        show={showAnamneseModal}
        onHide={() => setShowAnamneseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nova Anamnese</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveAnamnese}>
            <Form.Group className="mb-3">
              <Form.Label>Queixas Principais</Form.Label>
              <Form.Control
                type="text"
                name="queixasPrincipais"
                value={anamneseForm.queixasPrincipais}
                onChange={handleAnamneseChange}
                placeholder="Digite as queixas principais"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sintomas Relatados</Form.Label>
              <Form.Control
                type="text"
                name="sintomasRelatados"
                value={anamneseForm.sintomasRelatados}
                onChange={handleAnamneseChange}
                placeholder="Digite os sintomas relatados"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condições Atuais</Form.Label>
              <Form.Control
                type="text"
                name="condicoesAtuais"
                value={anamneseForm.condicoesAtuais}
                onChange={handleAnamneseChange}
                placeholder="Digite as condições atuais"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar Anamnese
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para Novo Documento */}
      <Modal
        show={showDocumentoModal}
        onHide={() => setShowDocumentoModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo Documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveDocumento}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Arquivo</Form.Label>
              <Form.Control
                type="text"
                name="nomeArquivo"
                value={documentoForm.nomeArquivo}
                readOnly
                placeholder="Nome do arquivo"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo do Arquivo</Form.Label>
              <Form.Control
                type="text"
                name="tipoArquivo"
                value={documentoForm.tipoArquivo}
                readOnly
                placeholder="Tipo do arquivo"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Selecione o Documento</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar Documento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NovoProntuarioScreen;
