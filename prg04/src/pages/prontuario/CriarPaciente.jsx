import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { savePaciente } from "./ProntuarioService";

//import Botao from "./components/button/button.jsx";

const CriarPaciente = () => {
  // Estado para armazenar as mensagens de erro de validação
  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const [temResponsavel, setTemResponsavel] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.nome)
      validationErrors.nome = "O nome do paciente não pode ser vazio";
    if (!formData.cpf)
      validationErrors.cpf = "O CPF do paciente não pode ser vazio";
    if (!formData.dataNascimento)
      validationErrors.dataNascimento =
        "A data de nascimento não pode ser vazia";
    if (!formData.genero)
      validationErrors.sexo = "O gênero deve ser selecionado";
    if (!formData.estadoCivil)
      validationErrors.estadoCivil = "O estado civil não pode ser vazio";
    if (!formData.endereco)
      validationErrors.endereco = "O endereço não pode ser vazio";
    if (!formData.telefone)
      validationErrors.telefone = "O telefone não pode ser vazio";
    if (!formData.email) validationErrors.email = "O e-mail não pode ser vazio";
    if (temResponsavel) {
      if (!formData.responsavelNome)
        validationErrors.responsavelNome =
          "O nome do responsável não pode ser vazio";
      if (!formData.responsavelContato)
        validationErrors.responsavelContato =
          "O contato do responsável não pode ser vazio";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Criar o objeto na estrutura correta
      const dadosParaSalvar = {
        nome: formData.nome,
        cpf: formData.cpf,
        dataNascimento: formData.dataNascimento,
        genero: formData.genero,
        estadoCivil: formData.estadoCivil,
        endereco: formData.endereco,
        telefone: formData.telefone,
        email: formData.email,
        responsavel: {
          nome: formData.responsavelNome,
          contato: formData.responsavelContato,
        },
      };

      console.log("Enviando dados formatados:", dadosParaSalvar);
      try {
        const response = await savePaciente(dadosParaSalvar);
        console.log("Paciente salvo com sucesso:", response);
        setSuccessMessage("Paciente cadastrado com sucesso!");
        setTimeout(() => navigate("/gestao-paciente"), 2000);
      } catch (error) {
        console.error("Erro ao salvar paciente:", error);
      }
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3 d-flex justify-content-center">
          Cadastro de Paciente
        </h2>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            {errors.nome && <div className="text-danger">{errors.nome}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">CPF</label>
            <input
              type="text"
              className="form-control"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
            {errors.cpf && <div className="text-danger">{errors.cpf}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
            {errors.dataNascimento && (
              <div className="text-danger">{errors.dataNascimento}</div>
            )}
          </div>
          <div className="col-md-4">
            <label className="form-label">Gênero</label>
            <select
              className="form-control"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.sexo && <div className="text-danger">{errors.genero}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Estado Civil</label>
            <input
              type="text"
              className="form-control"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              required
            />
            {errors.estadoCivil && (
              <div className="text-danger">{errors.estadoCivil}</div>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">Endereço Completo</label>
            <input
              type="text"
              className="form-control"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
            {errors.endereco && (
              <div className="text-danger">{errors.endereco}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
            {errors.telefone && (
              <div className="text-danger">{errors.telefone}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="col-md-12">
            <label className="form-label">Possui responsável?</label>
            <select
              className="form-control"
              onChange={(e) => setTemResponsavel(e.target.value === "sim")}
            >
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          {temResponsavel && (
            <>
              <div className="col-md-6">
                <label className="form-label">Nome do Responsável</label>
                <input
                  type="text"
                  className="form-control"
                  name="responsavelNome"
                  value={formData.responsavelNome}
                  onChange={handleChange}
                  required={temResponsavel}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Contato do Responsável</label>
                <input
                  type="text"
                  className="form-control"
                  name="responsavelContato"
                  value={formData.responsavelContato}
                  onChange={handleChange}
                  required={temResponsavel}
                />
              </div>
            </>
          )}
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CriarPaciente;
