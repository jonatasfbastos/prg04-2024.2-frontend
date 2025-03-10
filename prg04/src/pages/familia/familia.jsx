import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'
import { Button, Form, Modal, Row, Col, Card, ListGroup } from "react-bootstrap";
import { getFamilias, getFamiliasByName } from "./FamiliaService";
import FormFamilia from './FormFamilia';

export default function Familia() {
    const navigate = useNavigate();

    const [nome, setName] = useState("");
    const [familias, setFamilias] = useState([]);
    const [endereco, setEndereco] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [paginaInicial, setPaginaInicial] = useState(0);
    const [familiaSelecionada, setFamiliaSelecionada] = useState(null);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [familiaUpdate, setFamiliaUpdate] = useState(null);
    const [responsavel, setResponsavel] = useState([]);
    const [cpfBusca, setCpfBusca] = useState("");
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
    const [membros, setMembros] = useState([]);
    const [loading, setLoading] = useState(false); //para controle de carregamento
    const itensPorPagina = 10;
    const maxBotoes = 10;

     //hook que executa a busca de dados quando a pagina muda
     useEffect(() => {
        const buscarFuncionarios = async () => {
            try {
                const response = await fetch('http://localhost:8080/funcionarios/findall');
                if (!response.ok) {
                    throw new Error('Erro ao buscar funcionários');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setResponsavel(data);
                } else {
                    setResponsavel([]);
                }
                
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
                setResponsavel([]);
            }
        };
    
        buscarFuncionarios();

        const carregarFamilias = async () => {
            setLoading(true); //para indicar q os dados ainda estao carregando
            try {
                const response = await fetch(`http://localhost:8080/familias/findAll?page=${paginaAtual}&size=${itensPorPagina}`);
                
                // Verifica se a resposta é OK (status 200-299)
                if (!response.ok) {
                    const errorText = await response.text(); // Lê o corpo da resposta como texto
                    throw new Error(`Erro ao buscar famílias: ${response.status} - ${errorText}`);
                }
        
                // Verifica se o conteúdo é JSON
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Resposta não é JSON válido.");
                }
        
                const data = await response.json();
                setFamilias(data.content);
                setTotalPaginas(data.totalPages);
                setIsFirstPage(data.first);
                setIsLastPage(data.last);
            } catch (error) {
                console.error("Erro ao carregar famílias:", error);
            }
            setLoading(false);
        };

        carregarFamilias();
    }, [paginaAtual]);

    const buscarPaciente = async () => {
        try {
            const cpf = cpfBusca.replace(/\D/g, ''); //removendo a formatacao
            const url = `http://localhost:8080/paciente/find-by-cpf/${cpf}`

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Paciente não encontrado');
            }
            const data = await response.json();
            setPacienteEncontrado(data);
        } catch (error) {
            console.error('Erro ao buscar paciente:', error);
            setPacienteEncontrado(null);
        }
    };

    const goToCriarFamilia = () => {
        navigate("/familia/CriarFamilia");
    };

    const listarFamilias = async () => {
        setName(""); // Limpa o campo de busca
        setPaginaAtual(0); // Volta para a primeira página
        try {
            const response = await getFamilias(0, itensPorPagina); // Busca as famílias da primeira página
            if (!response || !response.content) {
                throw new Error("Resposta do servidor falhou");
            }
            setFamilias(response.content);
            setTotalPaginas(response.totalPages);
            setIsFirstPage(response.first);
            setIsLastPage(response.last);
        } catch (error) {
            console.error("Erro ao listar famílias:", error);
        }
    };

    const buscarFamilias = async () => {
        setLoading(true);
        try {
            let familiasFiltradas;
    
            if (nome.includes("responsavel:")) {
                //busca pelo nome do responsável
                const nomeResponsavel = nome.replace("responsavel:", "").trim().toLowerCase();
                const response = await fetch('http://localhost:8080/familias/findByName');
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar famílias');
                }
    
                const todasFamilias = await response.json();
                // Filtra as famílias pelo nome do responsável
                familiasFiltradas = todasFamilias.filter(familia => 
                    familia.responsavel.nome.toLowerCase().includes(nomeResponsavel)
                );
            } else {
                // busca pelo nome da familia
                const response = await fetch(`http://localhost:8080/familias/findByName/${nome}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        setFamilias([]); 
                        return alert("Nenhuma família encontrada com esse nome.");
                    } else {
                        throw new Error('Erro ao buscar famílias');
                    }
                }
    
                familiasFiltradas = await response.json();
            }
    
            if (familiasFiltradas.length === 0) {
                setFamilias([]); // Limpa os resultados se nenhuma família for encontrada
                alert("Nenhuma família encontrada com esse critério.");
            } else {
                setFamilias(familiasFiltradas); // Atualiza o estado "familias" com os resultados da busca
                setTotalPaginas(1); // Define o total de páginas como 1 (busca não é paginada)
                setIsFirstPage(true); // Define como primeira página
                setIsLastPage(true); // Define como última página
            }
        } catch (error) {
            console.error('Erro ao buscar famílias:', error);
            alert('Erro ao buscar famílias. Tente novamente.');
        }
        setLoading(false);
    };

    const exibirDetalhesFamilia = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/familias/findById/${id}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar família.");
            }
            const data = await response.json();
            setFamiliaSelecionada(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da família:", error);
        }
    };

    const salvarEdicao = async (familiaData) => {
        try {
            // Verifique se o nome de cada membro não é undefined antes de chamar o trim
            const membrosUpdate = familiaData.membros.map(membro => ({
                id: membro.id,
                nome: membro.nome ? membro.nome.trim() : ''  
            }));
    
            const payload = {
                ...familiaData,
                membros: membrosUpdate  
            };
    
            const response = await fetch(`http://localhost:8080/familias/update/${familiaData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar família');
            }
    
            const data = await response.json();
            console.log('Família atualizada:', data);
    
            const familiasAtualizadas = familias.map(familia =>
                familia.id === data.id ? { ...familia, ...data } : familia
            );
            setFamilias(familiasAtualizadas);
    
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
            alert('Erro ao salvar edição. Tente novamente.');
        }
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


//salva a familia
    const salvarFamilia = async () => {
        const familiaData = {
            nome: nome.trim(), //trim remove espacos em brancos no inicio e no final
            endereco: endereco.trim(),
            membros: membros.map((membro) => ({id:membro.id})), 
            responsavel_id: responsavelSelecionado,
        };

        //verifica se os campos obrigatorios estao preenchidos
        if (!familiaData.nome || !familiaData.endereco || !familiaData.responsavel_id) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await criarFamilia(familiaData);
            console.log("Família criada:", response);
            setShowModal(true);
        } catch(error) {
            console.log('Erro ao criar familia.', error)
        }
    };

    return (
        <div className="familias-container">
           <div className="header">
                
                <div className="left-section">
                    <input
                        type="text"
                        placeholder="Digite o nome da familia"
                        value={nome}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={buscarFamilias}>Buscar</button>
                </div>

                <div className="center-section">
                    <h1>FAMÍLIAS</h1>
                </div>

                <div className="right-section">
                    <button className="find-familia" onClick={listarFamilias}>Listar Familias</button>
                    <button className="create-familia" onClick={goToCriarFamilia}>Nova Família</button>
                    
                </div>
            </div>

            {/*tabela familia*/}
            <table>
                <thead>
                    <tr>
                        <th>Nome da familia</th>
                        <th>Responsavel</th>
                        <th>Membro Responsavel</th>
                        <th>Acoes</th>
                    </tr>
                </thead>

                <tbody>
                {familias.length > 0 ? (
                    familias.map((familia) => (
                        <tr key={familia.id}>
                            <td><span className="pre-atributo"></span>{familia.nome}</td>
                            <td><span className="pre-atributo"></span> {familia.responsavel.nome}</td>
                                <td>{familia.membros.length > 0 ? familia.membros[0].nome : "Nenhum membro"}</td> {/*pega o priemiro membro do banco de dados, se nao tiver mostra uma mensagem*/}
                            <td>
                            <button className="button-details" onClick={() => exibirDetalhesFamilia(familia.id)}>Ver Detalhes</button>
                            <button className="button-details" onClick={() => {
                                setFamiliaUpdate(familia);
                                setShowModal(true);
                            }} >Editar</button>
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

            {/* Modal para edição */}
            {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Editar Família</h2>
                    <FormFamilia
                        familia={familiaUpdate}
                        onSalvar={(familiaData) => {
                            salvarEdicao(familiaData);
                            setShowModal(false); // Fecha o modal após salvar
                        }}
                        onCancelar={() => setShowModal(false)} // Fecha o modal ao cancelar
                        responsavel={responsavel}
                    />
                </div>
            </div>
            )} 


            {/*modal com detalhes da familia */}
            {familiaSelecionada && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Detalhes da Família</h2>
                        <p><strong>Nome:</strong> {familiaSelecionada.nome}</p>
                        <p><strong>Membros:</strong></p>
                            <ul>{familiaSelecionada.membros.map((membro => 
                                <li key={membro.id}>{membro.nome}</li>))}
                            </ul>
                        <p><strong>Endereço:</strong> {familiaSelecionada.endereco}</p>
                        <p><strong>Responsável:</strong> {familiaSelecionada.responsavel.nome}</p>
                        <p><strong>CPF do Responsável:</strong> {familiaSelecionada.responsavel.cpf}</p>
                        
                        <button className="close-details" onClick={() => setFamiliaSelecionada(null)}>Fechar</button>
                    </div>
                </div>
            )}

            {/* paginacao */}
            <div className="pagination">
                <button onClick={voltarBloco} disabled={paginaInicial === 0}>{"<<"}</button>
                <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={isFirstPage}>&lt;</button>
                {Array.from({ length: Math.min(maxBotoes, totalPaginas - paginaInicial) }, (_, index) => (
                    <button
                        key={paginaInicial + index}
                        className={paginaAtual === paginaInicial + index ? "active-page" : ""}
                        onClick={() => mudarPagina(paginaInicial + index)}
                        disabled={nome}
                    >
                        {paginaInicial + index + 1}
                    </button>
                ))}
                <button onClick={() => mudarPagina(paginaAtual + 1)} disabled={isLastPage}>&gt;</button>
                <button onClick={avancarBloco} disabled={paginaInicial + maxBotoes >= totalPaginas}>{">>"}</button>
            </div>
        </div>
    );
}