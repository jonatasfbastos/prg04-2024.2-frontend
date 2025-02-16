import { useState, useEffect } from "react";
import apiService from "./service/api";
import "./gestaovacinacao.css";

const API_BASE_URL = "http://localhost:8080";

const GestaoVacinacao = () => {
  const [abaAtiva, setAbaAtiva] = useState("vacinas");
  const [dados, setDados] = useState([]);
  const [formularioVisivel, setFormularioVisivel] = useState(false);
  const [formData, setFormData] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  // Estados para busca na aba "carteira"
  const [searchPacienteInput, setSearchPacienteInput] = useState("");
  const [searchPacienteQuery, setSearchPacienteQuery] = useState("");

  // Estados para busca na aba "vacinas"
  const [searchVacinaIdInput, setSearchVacinaIdInput] = useState("");
  const [searchVacinaIdQuery, setSearchVacinaIdQuery] = useState("");
  const [searchDataVencimentoInput, setSearchDataVencimentoInput] = useState("");
  const [searchDataVencimentoQuery, setSearchDataVencimentoQuery] = useState("");
  const [searchDoencaCombatidaInput, setSearchDoencaCombatidaInput] = useState("");
  const [searchDoencaCombatidaQuery, setSearchDoencaCombatidaQuery] = useState("");

  // Estados para busca na aba "lotes"
  const [searchLoteIdInput, setSearchLoteIdInput] = useState("");
  const [searchLoteIdQuery, setSearchLoteIdQuery] = useState("");

  // Dados iniciais para cada aba
  const dadosIniciais = {
    vacinas: [
      {
        id: 1,
        nomeCientifico: "Vacina COVID-19",
        nomeComum: "Coronavac",
        nomeLaboratorio: "Sinovac",
        idadeFoco: "Adultos",
        doencaCombatida: "COVID-19",
        observacao: "Aplicação em duas doses",
        metodoAplicacao: "Intramuscular",
        dataVencimento: "2024-12-31"
      },
      {
        id: 2,
        nomeCientifico: "Vacina Influenza",
        nomeComum: "Vacina da Gripe",
        nomeLaboratorio: "Butantan",
        idadeFoco: "Todas as idades",
        doencaCombatida: "Influenza",
        observacao: "Dose anual",
        metodoAplicacao: "Intramuscular",
        dataVencimento: "2023-11-30"
      }
    ],
    lotes: [
      {
        id: 1,
        nome: "Lote 001",
        dataProducao: "2023-01-01",
        dataVencimento: "2024-01-01",
        quantidadeVacinas: 5000,
        Laboratorio: "Sinovac",
        vacina: "Coronavac"
      },
      {
        id: 2,
        nome: "Lote 002",
        dataProducao: "2023-02-01",
        dataVencimento: "2024-02-01",
        quantidadeVacinas: 3000,
        Laboratorio: "Butantan",
        vacina: "Vacina da Gripe"
      }
    ],
    carteira: [
      {
        id: 1,
        nomeComum: "Coronavac",
        dataAplicacao: "2023-10-01",
        observacao: "Primeira dose aplicada",
        paciente: "João Silva"
      },
      {
        id: 2,
        nomeComum: "Vacina da Gripe",
        dataAplicacao: "2023-09-15",
        observacao: "Dose anual aplicada",
        paciente: "Maria Oliveira"
      }
    ]
  };

  // Mapeamento dos cabeçalhos para cada aba
  const headerLabels = {
    vacinas: {
      nomeCientifico: "NOME CIENTIFICO",
      nomeComum: "NOME COMUM",
      nomeLaboratorio: "LABORATÓRIO",
      idadeFoco: "IDADE FOCO",
      doencaCombatida: "DOENÇA COMBATIDA",
      observacao: "OBSERVAÇÃO",
      metodoAplicacao: "MÉTODO DE APLICAÇÃO",
      dataVencimento: "DATA DE VENCIMENTO"
    },
    lotes: {
      nome: "NOME",
      dataProducao: "DATA DE PRODUÇÃO",
      dataVencimento: "DATA DE VENCIMENTO",
      quantidadeVacinas: "QUANTIDADE DE VACINAS",
      Laboratorio: "LABORATÓRIO",
      vacina: "VACINA"
    },
    carteira: {
      nomeComum: "NOME COMUM",
      dataAplicacao: "DATA DE APLICAÇÃO",
      observacao: "OBSERVAÇÃO",
      paciente: "PACIENTE"
    }
  };

  // Carrega os dados iniciais e reseta os estados de busca ao trocar de aba
  useEffect(() => {
    setDados(dadosIniciais[abaAtiva]);
    setSearchPacienteInput("");
    setSearchPacienteQuery("");
    setSearchVacinaIdInput("");
    setSearchVacinaIdQuery("");
    setSearchDataVencimentoInput("");
    setSearchDataVencimentoQuery("");
    setSearchDoencaCombatidaInput("");
    setSearchDoencaCombatidaQuery("");
    setSearchLoteIdInput("");
    setSearchLoteIdQuery("");
  }, [abaAtiva]);

  const handleAddClick = () => {
    setFormularioVisivel(true);
    setFormData({});
    setEditandoId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fecha o formulário imediatamente ao submeter
    setFormularioVisivel(false);
    try {
      const endpoint =
        abaAtiva === "vacinas"
          ? "/vacinas"
          : abaAtiva === "lotes"
          ? "/lotes"
          : "/carteira";
      let response;

      if (editandoId) {
        response = await axios.put(`${API_BASE_URL}${endpoint}/${editandoId}`, formData);
        setDados(dados.map(item => item.id === editandoId ? response.data : item));
      } else {
        response = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
        setDados([...dados, response.data]);
      }
    } catch (error) {
      console.error("Erro ao salvar", error);
    } finally {
      setFormData({});
      setEditandoId(null);
    }
  };

  const handleEditar = (item) => {
    setFormularioVisivel(true);
    setFormData(item);
    setEditandoId(item.id);
  };

  const handleExcluir = async (id) => {
    try {
      const endpoint =
        abaAtiva === "vacinas"
          ? `/vacinas/${id}`
          : abaAtiva === "lotes"
          ? `/lotes/${id}`
          : `/carteira/${id}`;
      await axios.delete(`${API_BASE_URL}${endpoint}`);
      setDados(dados.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

  // Define os campos de cada aba
  const campos = {
    vacinas: [
      "nomeCientifico",
      "nomeComum",
      "nomeLaboratorio",
      "idadeFoco",
      "doencaCombatida",
      "observacao",
      "metodoAplicacao",
      "dataVencimento"
    ],
    lotes: [
      "nome",
      "dataProducao",
      "dataVencimento",
      "quantidadeVacinas",
      "Laboratorio",
      "vacina"
    ],
    carteira: ["nomeComum", "dataAplicacao", "observacao", "paciente"]
  };

  // Filtra os dados a serem exibidos conforme as buscas realizadas
  let displayedDados = dados;
  if (abaAtiva === "vacinas") {
    let filtered = dados;
    if (searchVacinaIdQuery) {
      filtered = filtered.filter(item => item.id === Number(searchVacinaIdQuery));
    }
    if (searchDataVencimentoQuery) {
      filtered = filtered.filter(item =>
        item.dataVencimento.includes(searchDataVencimentoQuery)
      );
    }
    if (searchDoencaCombatidaQuery) {
      filtered = filtered.filter(item =>
        item.doencaCombatida.toLowerCase().includes(searchDoencaCombatidaQuery.toLowerCase())
      );
    }
    displayedDados = filtered;
  } else if (abaAtiva === "carteira" && searchPacienteQuery) {
    displayedDados = dados.filter(item => item.id === Number(searchPacienteQuery));
  } else if (abaAtiva === "lotes" && searchLoteIdQuery) {
    displayedDados = dados.filter(item => item.id === Number(searchLoteIdQuery));
  }

  return (
    <div className="gestao-container">
      <nav className="menu">
        <button onClick={() => setAbaAtiva("vacinas")}>Vacinas</button>
        <button onClick={() => setAbaAtiva("lotes")}>Lotes</button>
        <button onClick={() => setAbaAtiva("carteira")}>Carteira</button>
      </nav>
      <div className="conteudo">
        <h2>Gerenciamento de {abaAtiva}</h2>
        <button onClick={handleAddClick}>Adicionar</button>

        {/* Formulário para Adicionar/Atualizar */}
        {formularioVisivel && (
          <form onSubmit={handleSubmit}>
            {campos[abaAtiva]?.map((campo) => (
              <input
                key={campo}
                type="text"
                name={campo}
                placeholder={campo}
                value={formData[campo] || ""}
                onChange={handleInputChange}
              />
            ))}
            <button type="submit">{editandoId ? "Atualizar" : "Salvar"}</button>
          </form>
        )}

        {/* Área de Busca para a aba VACINAS */}
        {abaAtiva === "vacinas" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por ID da Vacina"
              value={searchVacinaIdInput}
              onChange={(e) => setSearchVacinaIdInput(e.target.value)}
            />
            <button onClick={() => setSearchVacinaIdQuery(searchVacinaIdInput)}>
              Buscar ID
            </button>

            <input
              type="text"
              placeholder="Buscar por Data de Vencimento"
              value={searchDataVencimentoInput}
              onChange={(e) => setSearchDataVencimentoInput(e.target.value)}
            />
            <button onClick={() => setSearchDataVencimentoQuery(searchDataVencimentoInput)}>
              Buscar Data
            </button>

            <input
              type="text"
              placeholder="Buscar por Doença Combatida"
              value={searchDoencaCombatidaInput}
              onChange={(e) => setSearchDoencaCombatidaInput(e.target.value)}
            />
            <button onClick={() => setSearchDoencaCombatidaQuery(searchDoencaCombatidaInput)}>
              Buscar Doença
            </button>

            <button
              onClick={() => {
                setSearchVacinaIdInput("");
                setSearchVacinaIdQuery("");
                setSearchDataVencimentoInput("");
                setSearchDataVencimentoQuery("");
                setSearchDoencaCombatidaInput("");
                setSearchDoencaCombatidaQuery("");
              }}
            >
              Limpar Busca
            </button>
          </div>
        )}

        {/* Área de Busca para a aba LOTES */}
        {abaAtiva === "lotes" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por ID do Lote"
              value={searchLoteIdInput}
              onChange={(e) => setSearchLoteIdInput(e.target.value)}
            />
            <button onClick={() => setSearchLoteIdQuery(searchLoteIdInput)}>
              Buscar ID
            </button>
            <button
              onClick={() => {
                setSearchLoteIdInput("");
                setSearchLoteIdQuery("");
              }}
            >
              Limpar Busca
            </button>
          </div>
        )}

        {/* Área de Busca para a aba CARTEIRA */}
        {abaAtiva === "carteira" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por ID do Paciente"
              value={searchPacienteInput}
              onChange={(e) => setSearchPacienteInput(e.target.value)}
            />
            <button onClick={() => setSearchPacienteQuery(searchPacienteInput)}>
              Buscar
            </button>
            <button
              onClick={() => {
                setSearchPacienteInput("");
                setSearchPacienteQuery("");
              }}
            >
              Limpar Busca
            </button>
          </div>
        )}

        {/* Tabela */}
        <table>
          <thead>
            <tr>
              {campos[abaAtiva]?.map((campo) => (
                <th key={campo}>
                  {headerLabels[abaAtiva] && headerLabels[abaAtiva][campo]
                    ? headerLabels[abaAtiva][campo]
                    : campo}
                </th>
              ))}
              {abaAtiva !== "carteira" && <th>AÇÕES</th>}
            </tr>
          </thead>
          <tbody>
            {displayedDados.length > 0 ? (
              displayedDados.map((item) => (
                <tr key={item.id}>
                  {campos[abaAtiva]?.map((campo) => (
                    <td key={campo}>{item[campo]}</td>
                  ))}
                  {abaAtiva !== "carteira" && (
                    <td>
                      <button onClick={() => handleEditar(item)}>Editar</button>
                      <button onClick={() => handleExcluir(item.id)}>Excluir</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={campos[abaAtiva]?.length + (abaAtiva !== "carteira" ? 1 : 0)}>
                  Nenhum dado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestaoVacinacao;
