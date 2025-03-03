import React, { useState, useEffect } from 'react';
import FormMarcarAtendimento from './FormAtendimento';
import { formatarDataHora } from './utils';

function GestaoAtendimentos() {
    const [isFormVisible, setIsFormVisible] = useState(false); // Controla a visibilidade do formulário
    const [atendimentos, setAtendimentos] = useState([]); // Estado para armazenar os atendimentos
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [error, setError] = useState(''); // Estado para armazenar erros
    const [atendimentoToEdit, setAtendimentoToEdit] = useState(null); // Estado para armazenar o atendimento a ser editado

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Alterna entre mostrar e esconder o formulário
        setAtendimentoToEdit(null); // Limpa o atendimento a ser editado ao fechar o formulário
    };

    const deleteAtendimento = async (codigo) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/gestaoatendimento/delete/${codigo}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // se a exclusao der certo remove o atendimento da lista
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

    // Função para buscar os atendimentos da API
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

    // Hook para chamar a função de fetch quando o componente for montado
    useEffect(() => {
        fetchAtendimentos();
    }, []);

    // Função para lidar com o clique no botão "Editar"
    const handleEdit = (atendimento) => {
        setAtendimentoToEdit(atendimento); // Armazena o atendimento a ser editado
        setIsFormVisible(true); // Exibe o formulário para edição
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Atendimentos Agendados</h1>

            {error && <div className="text-danger mb-3">{error}</div>}
            {loading && <p>Carregando...</p>}
            <div className="row mt-4 justify-content-center">
                {atendimentos.length > 0 ? (
                    atendimentos.map((atendimento, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Código: {atendimento.codigo}</h5>
                                    <p className="card-text"><strong>Especialidade:</strong> {atendimento.especialidadeMedica}</p>
                                    {/* Aqui é onde aplicamos a formatação */}
                                    <p className="card-text">
                                        <strong>Data e Hora:</strong> {formatarDataHora((atendimento.dataHora))}
                                    </p>

                                    {/* Botão Editar chama a função handleEdit */}
                                    <button
                                        className='btn btn-secondary m-2'
                                        onClick={() => handleEdit(atendimento)} // Passa o atendimento para edição
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

            {/* Mostrar o Formulário para agendar ou editar atendimento */}
            {isFormVisible && (
                <div className="mt-4">
                    <FormMarcarAtendimento
                        fetchAtendimentos={fetchAtendimentos}
                        toggleFormVisibility={toggleFormVisibility}
                        atendimento={atendimentoToEdit} // Passa o atendimento a ser editado
                    />
                </div>
            )}
        </div>
    );
}

export default GestaoAtendimentos;

