import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { getFamilias, getFamiliasByName, getFamiliaById } from "./familia-service";

export default function Familia() {
    const navigate = useNavigate();
    const [cpf, setCpf] = useState("");
    const [familias, setFamilias] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [paginaInicial, setPaginaInicial] = useState(0);
    const [familiaSelecionada, setFamiliaSelecionada] = useState(null);
    const itensPorPagina = 10;
    const maxBotoes = 10;

    const goToCriarFamilia = () => {
        navigate("/criar-familia");
    };

    //funcao para buscar os dados das familias
    const fetchData = async () => {
        try {
            let familiasResponse;
            if (cpf) {
                familiasResponse = await getFamiliasByCpf(cpf);
            } else {
                familiasResponse = await getFamilias(paginaAtual, itensPorPagina);
            }
            setFamilias(familiasResponse.content);
            setTotalPaginas(familiasResponse.totalPages);
            //verifica se eh a ultima ou primeira pagina
            setIsFirstPage(familiasResponse.first);
            setIsLastPage(familiasResponse.last);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    //hook que executa a busca de dados quando a pagina muda
    useEffect(() => {
        fetchData();
    }, [paginaAtual, cpf]);

    //funcao para exibir os detalhes de uma familia
    const exibirDetalhesFamilia = async (id) => {
        try {
            const familia = await getFamiliaById(id);
            setFamiliaSelecionada(familia); //armazena os detalhes da familia no estado
        } catch (error) {
            console.error("Erro ao buscar detalhes da família", error);
        }
    };

    //funcao para fechar o modal de detalhes da familia
    const fecharDetalhesFamilia = () => {
        setFamiliaSelecionada(null); //limpa o estado da familia selecionada
    };

    //funcao para mudar a pagina da listagem
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    //funcao para avancar para o proximo bloco de paginas
    const avancarBloco = () => {
        if (paginaInicial + maxBotoes < totalPaginas) {
            const novaPaginaInicial = paginaInicial + maxBotoes;
            setPaginaInicial(novaPaginaInicial);
            setPaginaAtual(novaPaginaInicial);
        }
    };

    //funcao para voltar ao bloco anterior das paginas
    const voltarBloco = () => {
        if (paginaInicial - maxBotoes >= 0) { 
            const novaPaginaInicial = paginaInicial - maxBotoes;
            setPaginaInicial(novaPaginaInicial);
            setPaginaAtual(novaPaginaInicial);
        }
    };

    return (
        <div className="familias-container">
           <div className="header">
                
                <div className="left-section">
                    <input
                        type="text"
                        placeholder="Digite o nome da familia"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                    <button onClick={fetchData}>Buscar</button>
                </div>

                
                <div className="center-section">
                    <h1>FAMÍLIAS</h1>
                </div>

                
                <div className="right-section">
                    <button>Listar Familias</button>
                    <button className="create-familia" onClick={goToCriarFamilia}>Criar Família</button>
                    
                </div>
            </div>

            <table>
                <tbody>
                {familias.length > 0 ? (
                    familias.map((familia) => (
                        <tr key={familia.id}>
                            <td><span className="pre-atributo">Responsável: </span> {familia.responsavel.nome}</td>
                            <td><span className="pre-atributo">CPF: </span>{familia.responsavel.cpf}</td>
                            <td>
                                <button className="delete" onClick={() => excluirFamilia(familia.id)}>
                                    Excluir
                                </button>
                                <button className="button-details" onClick={() => exibirDetalhesFamilia(familia.id)}>
                                    Ver Detalhes
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Nenhuma família encontrada.</td>
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

            {familiaSelecionada && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Detalhes da Família</h2>
                        <p><strong>Responsável:</strong> {familiaSelecionada.responsavel.nome}</p>
                        <p><strong>CPF:</strong> {familiaSelecionada.responsavel.cpf}</p>
                        <p><strong>Endereço:</strong> {familiaSelecionada.endereco}</p>
                        <p><strong>Membros:</strong> {familiaSelecionada.membros.join(", ")}</p>
                        <button className="close-details" onClick={fecharDetalhesFamilia}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}