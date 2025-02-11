import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import { getTermosConsentimento, getTermosConsentimentoByCpf, deleteTermoConsentimento, getTermoConsentimentoById } from './TermoConsentimentoService'; // Importa a função de exclusão e getTermoById

export default function GestaoTermos() {
    const navigate = useNavigate();

    const [cpf, setCpf] = useState("");
    const [termos, setTermos] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoSelecionado, setTermoSelecionado] = useState(null);
    const itensPorPagina = 5;

    const goToCriarTermo = () => {
        navigate("/criar-termo");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cpf) {
                    const termosByCpf = await getTermosConsentimentoByCpf(cpf);
                    setTermos(termosByCpf);
                } else {
                    const termosResponse = await getTermosConsentimento(paginaAtual, itensPorPagina);
                    setTermos(termosResponse);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [paginaAtual, cpf]);

    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const termosPaginados = termos.slice(indexPrimeiroItem, indexUltimoItem);

    const excluirTermo = async (id) => {
        try {
            await deleteTermoConsentimento(id);
            const termosResponse = await getTermosConsentimento(paginaAtual, itensPorPagina);
            setTermos(termosResponse);
        } catch (error) {
            console.error("Erro ao excluir o termo", error);
        }
    };

    const exibirDetalhesTermo = async (id) => {
        try {
            const termo = await getTermoConsentimentoById(id);
            setTermoSelecionado(termo);
        } catch (error) {
            console.error("Erro ao buscar detalhes do termo", error);
        }
    };

    const fecharDetalhesTermo = () => {
        setTermoSelecionado(null);
    };

    const formatarDataHora = (dataHora) => {
        const [ano, mes, dia, hora, minuto] = dataHora;
        const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
        const horaFormatada = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
        return `${dataFormatada} às ${horaFormatada}`;
    };

    return (
        <div className="termos-container">
            <h1>Termos de Consentimento</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar pelo CPF do paciente"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <button>Buscar</button>
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
                {termosPaginados.length > 0 ? (
                    termosPaginados.map((termo) => (
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
                <button
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                >
                    {"<<"}
                </button>

                {Array.from({ length: Math.ceil(termos.length / itensPorPagina) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={paginaAtual === index + 1 ? "active-page" : ""}
                        onClick={() => setPaginaAtual(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                    {">>"}
                </button>
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
