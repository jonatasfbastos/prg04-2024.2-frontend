import React, { useState } from 'react';
import FormMarcarAtendimento from './FormAtendimento'; // Importe o seu componente de formulário aqui
import './gestaoatendimento.css';

function GestaoAtendimentos() {
    const [isFormVisible, setIsFormVisible] = useState(false); // Controla a visibilidade do formulário
    const [atendimentos, setAtendimentos] = useState([ // Exemplo de dados fictícios
        {
            codigo: 'A001',
            nome: 'João Silva',
            especialidade: 'Cardiologia',
            dataHora: '2025-02-20T10:00:00'
        },
        {
            codigo: 'A002',
            nome: 'Maria Oliveira',
            especialidade: 'Dermatologia',
            dataHora: '2025-02-21T14:30:00'
        }
    ]);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Alterna entre mostrar e esconder o formulário
    };

    return (
        <div className="container mt-5">
            <h1>Atendimentos Agendados</h1>

            {/* Exibindo a lista de atendimentos */}
            <div className="row mt-4">
                {atendimentos.map((atendimento, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Código: {atendimento.codigo}</h5>
                                <p className="card-text"><strong>Nome:</strong> {atendimento.nome}</p>
                                <p className="card-text"><strong>Especialidade:</strong> {atendimento.especialidade}</p>
                                <p className="card-text"><strong>Data e Hora:</strong> {new Date(atendimento.dataHora).toLocaleString()}</p>
                                {/* Adicione botões ou links se necessário */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botão para mostrar/ocultar o formulário de agendamento */}
            <div className="d-flex justify-content-center mt-4">
                <button onClick={toggleFormVisibility} className="btn btn-success btn-lg">
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
