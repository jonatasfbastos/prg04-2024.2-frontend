import React, { useState, useEffect } from 'react';

function FormMarcarAtendimento({ fetchAtendimentos, toggleFormVisibility, atendimento }) {
    const [formData, setFormData] = useState({
        codigo: '', 
        dataHora: '',
        especialidadeMedica: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Usando useEffect para preencher o formulário caso seja edição
    useEffect(() => {
        if (atendimento) {
            setFormData({
                codigo: atendimento.codigo,
                dataHora: atendimento.dataHora,
                especialidadeMedica: atendimento.especialidadeMedica,
            });
        }
    }, [atendimento]);

    const generateUniqueCode = () => {
        const timestamp = Date.now();
        const randomPart = Math.random().toString(36).substr(2, 5);
        return `ATEND-${timestamp}-${randomPart}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            dataHora: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Se estiver editando, usa o código original, se não, gera um novo código
        const uniqueCode = atendimento ? atendimento.codigo : generateUniqueCode();
    
        if (!formData.dataHora) {
            setError('Escolha uma data e hora válida.');
            return;
        }
    
        const updatedFormData = {
            ...formData,
            codigo: uniqueCode,
        };
    
        const isValid = validateDate(updatedFormData.dataHora);
        if (!isValid) {
            setError('Escolha um horário dentro do horário comercial e em um dia útil.');
        } else {
            setError('');
            setLoading(true);
    
            try {
                const response = await fetch(atendimento ? `http://localhost:8080/gestaoatendimento/update/${uniqueCode}` : 'http://localhost:8080/gestaoatendimento/save', {
                    method: atendimento ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedFormData),
                });
    
                if (response.ok) {
                    setSuccessMessage(atendimento ? 'Atendimento atualizado com sucesso!' : 'Atendimento agendado com sucesso!');
                    setFormData({
                        codigo: '',
                        especialidadeMedica: '',
                        dataHora: '',
                    });
                    fetchAtendimentos(); // Recarregar os atendimentos
    
                    // Adicionar um delay para garantir que a mensagem de sucesso apareça
                    setTimeout(() => {
                        toggleFormVisibility(); // Fechar o formulário após 2 segundos
                    }, 2000); // 2000ms = 2 segundos
                } else {
                    setError('Erro ao agendar ou editar o atendimento. Tente novamente.');
                }
            } catch (error) {
                setError('Erro na comunicação com a API. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };
    

    const validateDate = (dataHora) => {
        const date = new Date(dataHora);
        const day = date.getDay();
        if (day === 0 || day === 6) return false; // Não é dia útil
        const hours = date.getHours();
        if (hours < 8 || hours > 18) return false; // Fora do horário comercial
        return true;
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">{atendimento ? 'Editar Atendimento' : 'Agendar Atendimento'}</h1>
                <div className="mb-3">
                    <label htmlFor="especialidade" className="form-label">Especialidade Médica: </label>
                    <select
                        id="especialidade"
                        name="especialidadeMedica"
                        className="form-select"
                        value={formData.especialidadeMedica}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="dermatologia">Dermatologia</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="ortopedia">Ortopedia</option>
                        <option value="clínico geral">Clínico Geral</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="dataHora" className="form-label">Data e Hora: </label>
                    <input
                        type="datetime-local"
                        id="dataHora"
                        name="dataHora"
                        className="form-control"
                        value={formData.dataHora}
                        onChange={handleDateChange}
                        required
                    />
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}
                {successMessage && <div className="text-success mb-3">{successMessage}</div>}

                <div className='text-center'>
                    <button className='btn btn-primary' disabled={loading}>
                        {loading ? 'Carregando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormMarcarAtendimento;
