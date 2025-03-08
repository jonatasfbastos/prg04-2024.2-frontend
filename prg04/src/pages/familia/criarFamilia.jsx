import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
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


    //adiciona um membro a lista
    const adicionarMembro = () => {
        if (novoMembro.trim() !== "") {
            setMembros([...membros, novoMembro]);
            setNovoMembro("");
        }
    };

    //remove um membro da lista
    const removerMembro = (index) => {
        const novaLista = membros.filter((_, i) => i !== index);
        setMembros(novaLista);
    };

    //salva a familia
    const salvarFamilia = async () => {
        const familiaData = {
            nome: nome.trim(), //trim remove espacos em brancos no inicio e no final
            endereco: endereco.trim(),
            membros: membros.filter(membro => membro.trim() !== ""), //remove campos vazios da lista
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
                                    placeholder="Digite o nome do membro"
                                    value={novoMembro}
                                    onChange={(e) => setNovoMembro(e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="primary" onClick={adicionarMembro}>
                                    Adicionar Membro
                                </Button>
                            </Col>
                        </Row>
                        {/*lista de membros*/}
                        {membros.map((membro, index) => (
                            <Row key={index} className="mb-2 align-items-center">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        value={membro}
                                        readOnly
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        variant="danger"
                                        onClick={() => removerMembro(index)}
                                    >
                                        Remover
                                    </Button>
                                </Col>
                            </Row>
                        ))}
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

