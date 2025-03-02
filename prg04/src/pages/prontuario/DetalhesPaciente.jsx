import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  getPacienteByCpf,
  getPacienteById,
  saveProntuario,
  updatePaciente,
} from "./ProntuarioService"; // Funções que realizam as chamadas à API

import { useNavigate } from "react-router-dom";

const DetalhesPaciente = () => {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cpf: "",
    dataNascimento: "",
    genero: "",
    estadoCivil: "",
    endereco: "",
    telefone: "",
    email: "",
    responsavelNome: "",
    responsavelContato: "",
  });

  const [patient, setPatient] = useState(null);
  const [prontuarios, setProntuarios] = useState([]);
  const [selectedProntuario, setSelectedProntuario] = useState(null);

  // Controle do modal para atualizar paciente e para exibir detalhes do prontuário
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);

  //Será usado para redirecionar para uma nova tela
  const navigate = useNavigate();

  // Função para buscar o paciente pelo CPF
  const handleSearchPaciente = async () => {
    try {
      // Chamada à API para buscar o paciente pelo CPF
      const paciente = await getPacienteByCpf(formData.cpf);
      setPatient(paciente);

      console.log("Dados recebidos", paciente);
      // Atualiza os dados do formulário com as informações recebidas do backend
      setFormData({
        ...formData,
        id: paciente.id,
        nome: paciente.nome,
        cpf: paciente.cpf,
        dataNascimento: paciente.dataNascimento
          ? paciente.dataNascimento.join("-") // Converte [YYYY, MM, DD] para "YYYY-MM-DD"
          : "",
        genero: paciente.genero,
        estadoCivil: paciente.estadoCivil,
        endereco: paciente.endereco,
        telefone: paciente.telefone,
        email: paciente.email,
        responsavelNome: paciente.responsavel?.nomeResponsavel || "", // Ajustado para o nome correto
        responsavelContato: paciente.responsavel?.contatoResponsavel || "", // Ajustado para o nome correto
      });

      // Chamada à API para buscar os prontuários vinculados ao paciente pelo ID
      const prontResponse = await getPacienteById(paciente.id);
      setProntuarios(prontResponse.content);
    } catch (error) {
      console.error("Erro ao buscar paciente", error);
    }
  };

  const handleNovoProntuario = async () => {
    try {
      // Chamada à API para salvar o novo prontuário com o CPF do paciente
      const novoProntuario = await saveProntuario(patient.cpf);

      // Reunir os dados que serão enviados para a tela de Prontuário
      const dadosParaEnviar = {
        prontuario: {
          id: novoProntuario.id,
          dataCriacao: novoProntuario.dataCriacao,
        },
        paciente: {
          id: patient.id,
          nome: patient.nome,
          cpf: patient.cpf,
        },
      };

      // Navegar para a tela de prontuário, passando os dados no state
      navigate("/prontuario", { state: dadosParaEnviar });
    } catch (error) {
      console.error("Erro ao salvar novo prontuário", error);
    }
  };

  const handleUpdatePaciente = async (updatedData) => {
    try {
      console.log("Dados de paciente para salvar", updatedData);

      // Chamada à API para atualizar o paciente
      await updatePaciente(updatedData); // Envia o objeto formatado

      // Atualiza o estado do paciente com os dados recebidos após a atualização
      setPatient(updatedData);

      setFormData({
        ...formData,
        ...updatedData,
        dataNascimento: updatedData.dataNascimento.join("-"),
      });


      setShowUpdateModal(false); // Fecha o modal de atualização
    } catch (error) {
      console.error("Erro ao atualizar paciente", error);
    }
  };

  return (
    <div className="container">
      <h2>Detalhes do Paciente</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <Form.Control
            type="text"
            placeholder="Digite o CPF"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <Button onClick={handleSearchPaciente}>Buscar Paciente</Button>
        </div>
      </div>

      {patient && (
        <>
          <h4>Dados do Paciente</h4>
          <p>
            <strong>Nome:</strong> {formData.nome}
          </p>
          <p>
            <strong>CPF:</strong> {formData.cpf}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {formData.dataNascimento}
          </p>
          <p>
            <strong>Gênero:</strong> {formData.genero}
          </p>
          <p>
            <strong>Estado Civil:</strong> {formData.estadoCivil}
          </p>
          <p>
            <strong>Endereço:</strong> {formData.endereco}
          </p>
          <p>
            <strong>Telefone:</strong> {formData.telefone}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          {formData.responsavel && (
            <>
              <p>
                <strong>Responsável:</strong>{" "}
                {formData.responsavel.nomeResponsavel}
              </p>
              <p>
                <strong>Contato do Responsável:</strong>{" "}
                {formData.responsavel.contatoResponsavel}
              </p>
            </>
          )}
          <Button onClick={() => setShowUpdateModal(true)}>
            Atualizar Paciente
          </Button>

          <hr />

          <h4>Prontuários</h4>
          <Button onClick={handleNovoProntuario}>Novo Prontuário</Button>
          {prontuarios.map((prontuario) => (
            <div key={prontuario.id} className="card mb-3">
              <div className="card-body">
                <h5>Prontuário #{prontuario.id}</h5>
                <p>
                  <strong>Data de Criação:</strong>{" "}
                  {prontuario.dataCriacao.join("-")}
                </p>
                <Button
                  onClick={() => {
                    setSelectedProntuario(prontuario);
                    setShowDetalhesModal(true);
                  }}
                >
                  Mais Detalhes
                </Button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Modal para atualizar o paciente */}
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePacienteForm
            patient={patient}
            onSubmit={handleUpdatePaciente}
          />
        </Modal.Body>
      </Modal>

      {/* Modal para exibir os detalhes do prontuário */}
      <Modal
        show={showDetalhesModal}
        onHide={() => setShowDetalhesModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Prontuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProntuario && (
            <>
              <h5>Anamneses</h5>
              {selectedProntuario.anamneses &&
              selectedProntuario.anamneses.length > 0 ? (
                selectedProntuario.anamneses.map((anamnese) => (
                  <div key={anamnese.id}>
                    <p>
                      <strong>Queixas Principais:</strong>{" "}
                      {anamnese.queixasPrincipais}
                    </p>
                    <p>
                      <strong>Sintomas Relatados:</strong>{" "}
                      {anamnese.sintomasRelatados}
                    </p>
                    <p>
                      <strong>Condições Atuais:</strong>{" "}
                      {anamnese.condicoesAtuais}
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Sem anamneses cadastradas.</p>
              )}

              <h5>Documentos</h5>
              {selectedProntuario.documentos &&
              selectedProntuario.documentos.length > 0 ? (
                selectedProntuario.documentos.map((doc) => (
                  <div key={doc.id}>
                    <p>
                      <strong>Nome do Arquivo:</strong> {doc.nomeArquivo}
                    </p>
                    <p>
                      <strong>Tipo:</strong> {doc.tipoArquivo}
                    </p>
                    <a
                      href={doc.urlArquivo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visualizar Documento
                    </a>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Sem documentos cadastrados.</p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

// Formulário para atualizar o paciente
const UpdatePacienteForm = ({ patient, onSubmit }) => {
  const [form, setForm] = useState({
    nome: patient?.nome || "",
    cpf: patient?.cpf || "",
    dataNascimento: patient?.dataNascimento
      ? patient.dataNascimento.join("-")
      : "",
    genero: patient?.genero || "",
    estadoCivil: patient?.estadoCivil || "",
    endereco: patient?.endereco || "",
    telefone: patient?.telefone || "",
    email: patient?.email || "",
    responsavelNome: patient?.responsavel?.nomeResponsavel || "",
    responsavelContato: patient?.responsavel?.contatoResponsavel || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converter dataNascimento para array de inteiros [YYYY, MM, DD]
    let dataNascimentoFormatada = form.dataNascimento.split("-").map(Number);

    const dadosParaSalvar = {
      nome: form.nome,
      cpf: form.cpf,
      dataNascimento: dataNascimentoFormatada, // Agora é um array de inteiros
      genero: form.genero,
      estadoCivil: form.estadoCivil,
      endereco: form.endereco,
      telefone: form.telefone,
      email: form.email,
      responsavel: {
        nomeResponsavel: form.responsavelNome,
        contatoResponsavel: form.responsavelContato,
      },
    };

    console.log("Dados para salvar:", dadosParaSalvar); // Verificação de dados antes de enviar

    // Chama a função de atualização via API, passando o objeto formatado
    onSubmit(dadosParaSalvar);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>CPF</Form.Label>
        <Form.Control
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Data de Nascimento</Form.Label>
        <Form.Control
          type="text"
          name="dataNascimento"
          value={form.dataNascimento}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Gênero</Form.Label>
        <Form.Control
          type="text"
          name="genero"
          value={form.genero}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Estado Civil</Form.Label>
        <Form.Control
          type="text"
          name="estadoCivil"
          value={form.estadoCivil}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Responsável</Form.Label>
        <Form.Control
          type="text"
          name="responsavelNome"
          value={form.responsavelNome}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Contato do Responsável</Form.Label>
        <Form.Control
          type="text"
          name="responsavelContato"
          value={form.responsavelContato}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );
};

UpdatePacienteForm.propTypes = {
  patient: PropTypes.shape({
    nome: PropTypes.string,
    cpf: PropTypes.string,
    dataNascimento: PropTypes.arrayOf(PropTypes.number),
    genero: PropTypes.string,
    estadoCivil: PropTypes.string,
    endereco: PropTypes.string,
    telefone: PropTypes.string,
    email: PropTypes.string,
    responsavel: PropTypes.shape({
      nomeResponsavel: PropTypes.string,
      contatoResponsavel: PropTypes.string,
    }),
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default DetalhesPaciente;
