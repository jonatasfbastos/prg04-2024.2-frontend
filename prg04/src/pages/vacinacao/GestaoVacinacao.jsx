import { useState, useEffect } from "react";
import axios from "axios";
import "./gestaovacinacao.css";

const API_BASE_URL = "http://localhost:8080";

const GestaoVacinacao = () => {
    const [abaAtiva, setAbaAtiva] = useState("vacinas");
    const [dados, setDados] = useState([]);
    const [formularioVisivel, setFormularioVisivel] = useState(false);
    const [formData, setFormData] = useState({});

    // Dados iniciais para cada aba
    const dadosIniciais = {
        vacinas: [
            {
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
                nome: "Lote 001",
                dataProducao: "2023-01-01",
                dataVencimento: "2024-01-01",
                quantidadeVacinas: 5000,
                Laboratorio: "Sinovac",
                vacina: "Coronavac"
            },
            {
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
                nomeComum: "Coronavac",
                dataAplicacao: "2023-10-01",
                observacao: "Primeira dose aplicada",
                paciente: "João Silva"
            },
            {
                nomeComum: "Vacina da Gripe",
                dataAplicacao: "2023-09-15",
                observacao: "Dose anual aplicada",
                paciente: "Maria Oliveira"
            }
        ]
    };

    // Função para buscar todos os dados da aba ativa
    const buscarDados = async () => {
        try {
            const endpoint = abaAtiva === "vacinas" ? "/vacinas/findall" : abaAtiva === "lotes" ? "/lotes/findall" : "/carteira/findall";
            const response = await axios.get(`${API_BASE_URL}${endpoint}`);
            setDados(response.data); // Atualiza o estado `dados` com os dados retornados
        } catch (error) {
            console.error("Erro ao buscar dados", error);
        }
    };

    // Carrega os dados iniciais quando o componente é montado ou quando a aba é alterada
    useEffect(() => {
        buscarDados();
    }, [abaAtiva]);

    const handleAddClick = () => {
        setFormularioVisivel(true);
        setFormData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = abaAtiva === "vacinas" ? "/vacinas" : abaAtiva === "lotes" ? "/lotes" : "/carteira";
            
            // Envia os dados para o servidor
            await axios.post(`${API_BASE_URL}${endpoint}`, formData);

            // Após salvar, busca os dados atualizados
            buscarDados();

            // Fecha o formulário e limpa os dados
            setFormularioVisivel(false);
            setFormData({});
        } catch (error) {
            console.error("Erro ao salvar", error);
        }
    };

    const campos = {
        vacinas: ["nomeCientifico", "nomeComum", "nomeLaboratorio", "idadeFoco", "doencaCombatida", "observacao", "metodoAplicacao", "dataVencimento"],
        lotes: ["nome", "dataProducao", "dataVencimento", "quantidadeVacinas", "Laboratorio", "vacina"],
        carteira: ["nomeComum", "dataAplicacao", "observacao", "paciente"]
    };

    return (
        <div className="gestao-container">
            <nav className="menu">
                <button onClick={() => setAbaAtiva("vacinas")}>Vacinas</button>
                <button onClick={() => setAbaAtiva("lotes")}>Lotes</button>
                <button onClick={() => setAbaAtiva("carteira")}>Carteira</button>
            </nav>
            <div className="conteudo">
                <h2>Gerenciamento de {abaAtiva}</h2>
                <div className="botoes">
                    <button onClick={handleAddClick}>Adicionar</button>
                    <button onClick={buscarDados}>Buscar Dados</button> {/* Botão para buscar dados */}
                </div>
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
                        <button type="submit">Salvar</button>
                    </form>
                )}
                <table>
                    <thead>
                        <tr>
                            {campos[abaAtiva]?.map((campo) => (
                                <th key={campo}>{campo}</th>
                            ))}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.length > 0 ? (
                            dados.map((item, index) => (
                                <tr key={index}>
                                    {campos[abaAtiva]?.map((campo) => (
                                        <td key={campo}>{item[campo]}</td>
                                    ))}
                                    <td>
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={campos[abaAtiva]?.length + 1}>Nenhum dado encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestaoVacinacao;