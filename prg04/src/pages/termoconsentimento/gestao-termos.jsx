import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

export default function GestaoTermos() {
    const navigate = useNavigate();

    // Estado para armazenar o CPF digitado pelo usuário na busca
    const [cpf, setCpf] = useState("");

    // Estado que armazena a lista de termos de consentimento
    const [termos, setTermos] = useState([
        {
            id: 1,
            cpf: "123.456.789-00",
            nomePaciente: "João Silva",
            dataHoraCriacao: new Date().toLocaleString().replace(',', ' às'),
            descricao: "Termo de consentimento 1 - Lorem ipsum dolor sit amet...",
            codigoFuncionario: "F123"
        },
        {
            id: 2,
            cpf: "987.654.321-00",
            nomePaciente: "Maria Oliveira",
            dataHoraCriacao: new Date().toLocaleString().replace(',', ' às'),
            descricao: "Termo de consentimento 2 - Quisque non dui ut metus...",
            codigoFuncionario: "F124"
        },
        {
            id: 3,
            cpf: "123.456.789-00",
            nomePaciente: "Carlos Santos",
            dataHoraCriacao: new Date().toLocaleString().replace(',', ' às'),
            descricao: "Termo de consentimento 3 - Ut varius elit ac eros...",
            codigoFuncionario: "F125"
        }
    ]);

    // Estado para controle da paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    // Estado para armazenar o termo selecionado ao visualizar os detalhes
    const [termoSelecionado, setTermoSelecionado] = useState(null);

    // Número de itens exibidos por página
    const itensPorPagina = 5;

    // Função para redirecionar para a página de criação de um novo termo
    const goToCriarTermo = () => {
        navigate("/criar-termo");
    };

    // Filtra os termos de acordo com o CPF digitado
    const termosFiltrados = cpf
        ? termos.filter((termo) => termo.cpf.includes(cpf))
        : termos;

    // Lógica de paginação
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const termosPaginados = termosFiltrados.slice(indexPrimeiroItem, indexUltimoItem);

    // Função para excluir um termo pelo ID
    const excluirTermo = (id) => {
        setTermos(termos.filter((termo) => termo.id !== id));
    };

    // Função para exibir os detalhes do termo selecionado
    const exibirDetalhesTermo = (termo) => {
        setTermoSelecionado(termo);
    };

    // Função para fechar a modal de detalhes
    const fecharDetalhesTermo = () => {
        setTermoSelecionado(null);
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
                            <td>{termo.nomePaciente}</td>
                            <td>{termo.dataHoraCriacao}</td>
                            <td>
                                <button className="delete" onClick={() => excluirTermo(termo.id)}>
                                    Excluir
                                </button>
                                <button className="button-details" onClick={() => exibirDetalhesTermo(termo)}>
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

            {/* Controle de Paginação */}
            <div className="pagination">
                <button
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                >
                    {"<<"}
                </button>

                {Array.from({ length: Math.ceil(termosFiltrados.length / itensPorPagina) }, (_, index) => (
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
                    disabled={indexUltimoItem >= termosFiltrados.length}
                >
                    {">>"}
                </button>
            </div>

            <hr className="divider" />

            <button className="create-term" onClick={goToCriarTermo}>Criar Termo</button>

            {/* Modal para exibir detalhes do termo */}
            {termoSelecionado && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Detalhes do Termo</h2>
                        <p><strong>ID:</strong> {termoSelecionado.id}</p>
                        <p><strong>Nome do Paciente:</strong> {termoSelecionado.nomePaciente}</p>
                        <p><strong>Data e Hora de Criação:</strong> {termoSelecionado.dataHoraCriacao}</p>
                        <p><strong>Conteúdo do Termo:</strong> {termoSelecionado.descricao.substring(0, 500)}</p>
                        <p><strong>Código do Funcionário:</strong> {termoSelecionado.codigoFuncionario}</p>
                        <button className="close-details" onClick={fecharDetalhesTermo}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}