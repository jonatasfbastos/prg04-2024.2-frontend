import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function FormularioFamilia({ familia, onSalvar, onCancelar, responsavel=[] }) {
    const [nome, setNome] = useState(familia ? familia.nome : "");
    const [endereco, setEndereco] = useState(familia ? familia.endereco : "");
    const [membros, setMembros] = useState(familia ? familia.membros : []);
    const [novoMembro, setNovoMembro] = useState("");
    const [responsavelSelecionado, setResponsavelSelecionado] = useState
    (familia ? familia.responsavel.id : "");
    

    const adicionarMembro = () => {
        if (novoMembro.trim() !== "") {
            setMembros([...membros, novoMembro]);
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
            membros: membros.filter(membro => membro.trim() !== ""),
            responsavelId: responsavelSelecionado,
        };

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