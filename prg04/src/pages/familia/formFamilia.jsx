import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";

function FormularioFamilia({ familia, onSalvar, onCancelar, responsavel=[] }) {
    const [nome, setNome] = useState(familia ? familia.nome : "");
    const [endereco, setEndereco] = useState(familia ? familia.endereco : "");
    const [membros, setMembros] = useState(familia ? familia.membros : []);
    const [novoMembro, setNovoMembro] = useState("");
    const [responsavelSelecionado, setResponsavelSelecionado] = useState
    (familia ? familia.responsavel.id : "");
    const [cpfBusca, setCpfBusca] = useState(""); 
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null); // Paciente encontrado na busca
    
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

    const adicionarMembro = () => {
        if (pacienteEncontrado) {
            setMembros([...membros, pacienteEncontrado]);
            setNovoMembro("");
        }
    };

    const removerMembro = (index) => {
        const novaLista = membros.filter((_, i) => i !== index);
        setMembros(novaLista);
    };

    const handleSalvar = () => {
        const familiaData = {
            id: familia.id,
            nome: nome.trim(),
            endereco: endereco.trim(),
            membros: membros.filter(membro => membro.nome.trim() !== "").map(membro => membro.nome.trim()),
            responsavelId: responsavelSelecionado,
        };
        console.log(familiaData);
        onSalvar(familiaData);
    };

    return (
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
                    {Array.isArray(responsavel) && responsavel.map((funcionario) => (
                        <option key={funcionario.id} value={funcionario.id}>
                            {funcionario.nome}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={handleSalvar}>
                Salvar
            </Button>
            <Button variant="secondary" onClick={onCancelar} className="ms-2">
                Cancelar
            </Button>
        </Form>
    );
}

export default FormularioFamilia;