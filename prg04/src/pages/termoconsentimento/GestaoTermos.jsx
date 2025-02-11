import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import {
    getTermosConsentimento,
    getTermosConsentimentoByCpf,
    deleteTermoConsentimento,
    getTermoConsentimentoById
} from './TermoConsentimentoService';

export default function GestaoTermos() {
    const navigate = useNavigate(); // Hook para navegação entre páginas
    const [cpf, setCpf] = useState(""); // Estado para armazenar o CPF do paciente
    const [termos, setTermos] = useState([]); // Estado para armazenar a lista de termos de consentimento
    const [paginaAtual, setPaginaAtual] = useState(0); // Estado para controlar a página atual da listagem
    const [totalPaginas, setTotalPaginas] = useState(0); // Estado para armazenar o total de páginas
    const [isFirstPage, setIsFirstPage] = useState(true); // Verifica se é a primeira página
    const [isLastPage, setIsLastPage] = useState(false); // Verifica se é a última página
    const [paginaInicial, setPaginaInicial] = useState(0); // Controla a paginação inicial
    const [termoSelecionado, setTermoSelecionado] = useState(null); // Estado para armazenar o termo selecionado
    const itensPorPagina = 5; // Define a quantidade de itens por página
    const maxBotoes = 10; // Define o número máximo de botões de navegação exibidos

    const goToCriarTermo = () => {
        navigate("/criar-termo"); // Função para navegar para a página de criação de termo
    };

    // Função para buscar os dados dos termos de consentimento
    const fetchData = async () => {
        try {
            let termosResponse;
            if (cpf) { // Se CPF estiver preenchido, busca os termos pelo CPF
                termosResponse = await getTermosConsentimentoByCpf(cpf);
            } else { // Caso contrário, busca os termos para a página atual
                termosResponse = await getTermosConsentimento(paginaAtual, itensPorPagina);
            }
            setTermos(termosResponse.content); // Atualiza a lista de termos
            setTotalPaginas(termosResponse.totalPages); // Atualiza o total de páginas
            setIsFirstPage(termosResponse.first); // Verifica se é a primeira página
            setIsLastPage(termosResponse.last); // Verifica se é a última página
        } catch (error) {
            console.error("Erro ao buscar dados:", error); // Erro ao buscar dados
        }
    };

    // Hook que executa a busca de dados quando a página ou o CPF mudam
    useEffect(() => {
        fetchData();
    }, [paginaAtual, cpf]);

    // Função para excluir um termo de consentimento
    const excluirTermo = async (id) => {
        try {
            await deleteTermoConsentimento(id); // Exclui o termo
            const novaPagina = termos.length === 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual;
            setPaginaAtual(novaPagina); // Atualiza a página após a exclusão
            fetchData(); // Recarrega os dados
        } catch (error) {
            console.error("Erro ao excluir o termo", error); // Erro ao excluir o termo
        }
    };

    // Função para exibir os detalhes de um termo de consentimento
    const exibirDetalhesTermo = async (id) => {
        try {
            const termo = await getTermoConsentimentoById(id); // Busca os detalhes do termo
            setTermoSelecionado(termo); // Armazena os detalhes do termo no estado
        } catch (error) {
            console.error("Erro ao buscar detalhes do termo", error); // Erro ao buscar detalhes
        }
    };

    // Função para fechar o modal de detalhes do termo
    const fecharDetalhesTermo = () => {
        setTermoSelecionado(null); // Limpa o estado de termo selecionado
    };

    // Função para formatar a data e hora no formato desejado
    const formatarDataHora = (dataHora) => {
        if (!dataHora || dataHora.length < 5) return "Data inválida"; // Verifica se a data é válida
        const [ano, mes, dia, hora, minuto] = dataHora; // Desestrutura a data
        const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`; // Formata a data
        const horaFormatada = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`; // Formata a hora
        return `${dataFormatada} às ${horaFormatada}`; // Retorna a data e hora formatadas
    };

    // Função para mudar a página da listagem
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina); // Atualiza a página atual
    };

    // Função para avançar para o próximo bloco de páginas
    const avancarBloco = () => {
        if (paginaInicial + maxBotoes < totalPaginas) { // Verifica se pode avançar para o próximo bloco
            const novaPaginaInicial = paginaInicial + maxBotoes;
            setPaginaInicial(novaPaginaInicial); // Atualiza a página inicial
            setPaginaAtual(novaPaginaInicial); // Atualiza a página atual
        }
    };

    // Função para voltar ao bloco anterior de páginas
    const voltarBloco = () => {
        if (paginaInicial - maxBotoes >= 0) { // Verifica se pode voltar para o bloco anterior
            const novaPaginaInicial = paginaInicial - maxBotoes;
            setPaginaInicial(novaPaginaInicial); // Atualiza a página inicial
            setPaginaAtual(novaPaginaInicial); // Atualiza a página atual
        }
    };

    return (
        <div className="termos-container">
            <h1>Termos de Consentimento</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar pelo CPF do paciente"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)} // Atualiza o CPF digitado
                />
                <button onClick={fetchData}>Buscar</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome do Paciente</th>
                    <th>Data e Hora de Criação</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {termos.length > 0 ? (
                    termos.map((termo) => (
                        <tr key={termo.id}>
                            <td>{termo.id}</td>
                            <td>{termo.paciente.nome}</td>
                            <td>{formatarDataHora(termo.dataHoraConsentimento)}</td>
                            <td>
                                <button className="delete" onClick={() => excluirTermo(termo.id)}>
                                    Excluir
                                </button>
                                <button className="button-details" onClick={() => exibirDetalhesTermo(termo.id)}>
                                    Ver Detalhes
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Nenhum termo encontrado.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={voltarBloco} disabled={paginaInicial === 0}>{"<<"}</button>
                <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={isFirstPage}>&lt;</button>
                {Array.from({ length: Math.min(maxBotoes, totalPaginas - paginaInicial) }, (_, index) => (
                    <button
                        key={paginaInicial + index}
                        className={paginaAtual === paginaInicial + index ? "active-page" : ""}
                        onClick={() => mudarPagina(paginaInicial + index)}
                    >
                        {paginaInicial + index + 1}
                    </button>
                ))}
                <button onClick={() => mudarPagina(paginaAtual + 1)} disabled={isLastPage}>&gt;</button>
                <button onClick={avancarBloco} disabled={paginaInicial + maxBotoes >= totalPaginas}>{">>"}</button>
            </div>

            <hr className="divider" />

            <button className="create-term" onClick={goToCriarTermo}>Criar Termo</button>

            {termoSelecionado && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Detalhes do Termo</h2>
                        <p><strong>ID:</strong> {termoSelecionado.id}</p>
                        <p><strong>Nome do Paciente:</strong> {termoSelecionado.paciente.nome}</p>
                        <p><strong>Data e Hora de Criação:</strong> {formatarDataHora(termoSelecionado.dataHoraConsentimento)}</p>
                        <p><strong>Conteúdo do Termo:</strong> {termoSelecionado.conteudo.substring(0, 500)}</p>
                        <p><strong>Assinatura do Paciente:</strong> {termoSelecionado.assinaturaPaciente}</p>
                        <p><strong>Código do Funcionário:</strong> {termoSelecionado.funcionario.codigo}</p>
                        <button className="close-details" onClick={fecharDetalhesTermo}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
