import React, { useState, useEffect } from 'react';
import FormMarcarAtendimento from './FormAtendimento';
import { formatarDataHora } from './utils';

function GestaoAtendimentos() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [atendimentos, setAtendimentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [atendimentoToEdit, setAtendimentoToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setAtendimentoToEdit(null);
    };

    const deleteAtendimento = async (codigo) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/gestaoatendimento/delete/${codigo}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAtendimentos(atendimentos.filter((atendimento) => atendimento.codigo !== codigo));
            } else {
                throw new Error("Erro ao excluir");
            }
        } catch (error) {
            setError("Erro ao excluir o atendimento. Tente novamente");
        } finally {
            setLoading(false);
        }
    };

    const fetchAtendimentos = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/gestaoatendimento/findall');
            if (!response.ok) {
                throw new Error('Erro ao buscar os atendimentos');
            }
            const data = await response.json();
            setAtendimentos(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAtendimentos();
    }, []);

    const handleEdit = (atendimento) => {
        setAtendimentoToEdit(atendimento);
        setIsFormVisible(true);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Atendimentos Agendados</h1>
            {error && <div className="text-danger mb-3">{error}</div>}
            {loading && <p>Carregando...</p>}

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar especialidade..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="row mt-4 justify-content-center">
                {atendimentos.length > 0 ? (
                    atendimentos.filter((atendimento) =>
                        atendimento.especialidadeMedica.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((atendimento, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Código: {atendimento.codigo}</h5>
                                    <p className="card-text"><strong>Especialidade:</strong> {atendimento.especialidadeMedica}</p>
                                    <p className="card-text">
                                        <strong>Data e Hora:</strong> {formatarDataHora((atendimento.dataHora))}
                                    </p>
                                    <button
                                        className='btn btn-secondary m-2'
                                        onClick={() => handleEdit(atendimento)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteAtendimento(atendimento.codigo)}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">Nenhum atendimento agendado.</div>
                )}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <button onClick={toggleFormVisibility} className="btn btn-primary btn-lg">
                    {isFormVisible ? 'Cancelar Agendamento' : 'Agendar Novo Atendimento'}
                </button>
            </div>

            {isFormVisible && (
                <div className="mt-4">
                    <FormMarcarAtendimento
                        fetchAtendimentos={fetchAtendimentos}
                        toggleFormVisibility={toggleFormVisibility}
                        atendimento={atendimentoToEdit}
                    />
                </div>
            )}
        </div>
    );
}

export default GestaoAtendimentos;
