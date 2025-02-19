import React, { useState, useEffect } from 'react';
import FormMarcarAtendimento from './FormAtendimento';

function GestaoAtendimentos() {
    const [isFormVisible, setIsFormVisible] = useState(false); // Controla a visibilidade do formulário
    const [atendimentos, setAtendimentos] = useState([]); // Estado para armazenar os atendimentos
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [error, setError] = useState(''); // Estado para armazenar erros

    // Função para buscar os atendimentos da API
    const fetchAtendimentos = async () => {
        setLoading(true); // Inicia o carregamento

        try {
            const response = await fetch('http://localhost:8080/gestaoatendimentos/findall'); // Substitua pela URL correta da sua API
            if (!response.ok) {
                throw new Error('Erro ao buscar os atendimentos');
            }
            const data = await response.json();
            setAtendimentos(data); // Atualiza o estado com os atendimentos recebidos
        } catch (err) {
            setError(err.message); // Caso haja erro, armazena a mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    // Função para deletar um atendimento
    const deleteAtendimento = async (codigo) => {
        setLoading(true); // Inicia o carregamento

        try {
            const response = await fetch(`http://localhost:8080/gestaoatendimento/delete/${codigo}`, {
                method: 'DELETE', // Método DELETE para remover o atendimento
            });

            if (response.ok) {
                setAtendimentos(atendimentos.filter((atendimento) => atendimento.codigo !== codigo)); // Atualiza o estado após excluir
            } else {
                throw new Error('Erro ao excluir o atendimento');
            }
        } catch (err) {
            setError(err.message); // Caso haja erro, armazena a mensagem de erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    // Hook para chamar a função de fetch quando o componente for montado
    useEffect(() => {
        fetchAtendimentos();
    }, []); // O array vazio garante que isso seja chamado apenas uma vez

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Alterna entre mostrar e esconder o formulário
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Atendimentos Agendados</h1>

            {/* Exibindo erros, caso existam */}
            {error && <div className="text-danger mb-3">{error}</div>}
            {/* Exibindo o status de carregamento */}
            {loading && <p>Carregando...</p>}

            {/* Exibindo a lista de atendimentos */}
            <div className="row mt-4 justify-content-center">
                {atendimentos.length > 0 ? (
                    atendimentos.map((atendimento, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Código: {atendimento.codigo}</h5>
                                    <p className="card-text"><strong>Nome:</strong> {atendimento.nome}</p>
                                    <p className="card-text"><strong>Especialidade:</strong> {atendimento.especialidade}</p>
                                    <p className="card-text"><strong>Data e Hora:</strong> {new Date(atendimento.dataHora).toLocaleString()}</p>
                                    
                                    {/* Botão de delete */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteAtendimento(atendimento.codigo)} // Chama a função de deletar passando o código do atendimento
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

            {/* Botão para mostrar/ocultar o formulário de agendamento */}
            <div className="d-flex justify-content-center mt-4">
                <button onClick={toggleFormVisibility} className="btn btn-primary btn-lg">
                    {isFormVisible ? 'Cancelar Agendamento' : 'Agendar Novo Atendimento'}
                </button>
            </div>

            {/* Formulário de agendamento (inicialmente escondido) */}
            {isFormVisible && (
                <div className="mt-4">
                    <FormMarcarAtendimento /> {/* Aqui você renderiza o componente FormAtendimento */}
                </div>
            )}
        </div>
    );
}

export default GestaoAtendimentos;
