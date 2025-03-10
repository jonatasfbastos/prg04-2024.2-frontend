import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Row, Col, Card, ListGroup } from "react-bootstrap";
import './style.css';

function CriarFamilia() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [membros, setMembros] = useState([]);
    const [novoMembro, setNovoMembro] = useState("");
    const [showModal, setShowModal] = useState(false); //estado para controlar o modal
    const [responsavel, setResponsavel] = useState([]);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
    const [cpfBusca, setCpfBusca] = useState(""); // CPF para buscar o paciente
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null); // Paciente encontrado na busca

    useEffect(() => {
        const buscarPacientes = async () => {
            try {
                const response = await fetch('http://localhost:8080/pacientes/findall?page=0&size=10');
                if (!response.ok) {
                    throw new Error('Erro ao buscar pacientes');
                }
                const data = await response.json();
                setPacientesDisponiveis(data.content);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };

        buscarPacientes();
    }, []);

    useEffect(() => {
        const buscarFuncionarios = async () => {
            try {
                const response = await fetch('http://localhost:8080/funcionarios/findall?page=0&size=10'); //a rota ta paginada no back
                if (!response.ok) {
                    throw new Error('Erro ao buscar funcionários');
                }
                const data = await response.json();
                setResponsavel(data.content);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        };
    
        buscarFuncionarios();
    }, []);


    const criarFamilia = async (familiaData) => {
        try {
            const response = await fetch('http://localhost:8080/familias/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familiaData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.menssage || "Erro ao criar familia");
            }
    
            const data = await response.json();
            console.log('Família criada:', data);
            return data;
        } catch (error) {
            console.error('Erro ao criar família:', error);
            alert(error.menssage);
            throw error;
        }
    };

    const buscarPaciente = async () => {
        if (!cpfBusca.trim()) {
            return;
        }

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

    //adiciona um membro a lista
    const adicionarMembro = () => {
        if (pacienteEncontrado && !membros.some(membros => membros.id === pacienteEncontrado.id)) {
            setMembros([...membros, pacienteEncontrado]);
            //limpa os campos
            setPacienteEncontrado(null);
            setCpfBusca("");
        } else if (!pacienteEncontrado) {
            alert("paciente nao econtrado");
        } else {
            alert("Este paciente ja foi adicionado");
        }
    };

    //remove um membro da lista
    const removerMembro = (pacienteId) => {
        const novaLista = membros.filter((membros) => membros.id !== pacienteId);
        setMembros(novaLista);
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

    //fecha o modal e redireciona para a lista de familias
    const fecharModal = () => {
        setShowModal(false);
        navigate("/familia");
    };

    return (
        <div className="criar-termo-container">
                <h1>Criar Nova Família</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome da Família<span className="required">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da família"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Endereço<span className="required">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Membros da Família</Form.Label>
                        <Row className="mb-2">
                            <Col>
                                <Form.Control
                                type="text"
                                placeholder="Digite o cpf do paciente"
                                value={cpfBusca}
                                onChange={(e) => setCpfBusca(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={buscarPaciente}>Buscar</Button>
                        {pacienteEncontrado && (
                        <Row className="mb-2 align-items-center">
                            <Col>
                                <p>
                                    Paciente encontrado: <strong>{pacienteEncontrado.nome}</strong>
                                </p>
                            </Col>
                            <Col xs="auto">
                                <Button variant="success" onClick={adicionarMembro}>
                                    Adicionar
                                </Button>
                            </Col>
                        </Row>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Membros Selecionados</Form.Label>
                            {membros.length > 0 ? (
                                <ListGroup>
                                    {membros.map((membro) => {
                                        console.log("Membro:", membro); 
                                        return (
                                        <ListGroup.Item key={membro.id} className="d-flex justify-content-between align-items-center">
                                           <span>{membro.nome}</span>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => removerMembro(membro.id)}
                                                >
                                                    Remover
                                                </Button>
                                        </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            ) : (
                                <p>Nenhum membro adicionado.</p>
                            )}
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Responsável<span className="required">*</span></Form.Label>
                        <Form.Select
                            value={responsavelSelecionado}
                            onChange={(e) => setResponsavelSelecionado(e.target.value)}
                            required
                        >
                            <option value="">Selecione um responsável</option>
                            {responsavel.map((funcionario) => (
                                <option key={funcionario.id} value={funcionario.id}>
                                    {funcionario.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" onClick={salvarFamilia}>
                        Salvar Família
                    </Button>
                </Form>

            <Modal show={showModal} onHide={fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Família Criada com Sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A família foi cadastrada com sucesso.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={fecharModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default CriarFamilia;

