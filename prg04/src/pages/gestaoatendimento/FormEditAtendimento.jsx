import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o Bootstrap

function FormEdicaoAtendimento({ atendimento }) {
    const [formData, setFormData] = useState({
        especialidade: atendimento.especialidade || '',
        dataHora: atendimento.dataHora || '',
    });

    const [error, setError] = useState('');

    // Efeito para definir os dados iniciais (caso o objeto de atendimento venha com valores)
    useEffect(() => {
        setFormData({
            especialidade: atendimento.especialidade || '',
            dataHora: atendimento.dataHora || '',
        });
    }, [atendimento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar se a data e hora são válidas
        const isValid = validateDate(formData.dataHora);
        if (!isValid) {
            setError('Escolha um horário dentro do horário comercial e em um dia útil.');
        } else {
            setError('');
            console.log('Atendimento atualizado', formData);
            // Aqui você pode fazer a chamada para salvar as mudanças
        }
    };

    const validateDate = (dataHora) => {
        const date = new Date(dataHora);

        // Verificar se é um dia útil (segunda a sexta)
        const day = date.getDay();
        if (day === 0 || day === 6) {
            return false; // Não é dia útil (Sábado e Domingo)
        }

        // Verificar se está dentro do horário comercial (08:00 - 18:00)
        const hours = date.getHours();
        if (hours < 8 || hours > 18) {
            return false; // Fora do horário comercial
        }

        return true;
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Editar Atendimento</h1>

                <div className="mb-3">
                    <label htmlFor="especialidade" className="form-label">Especialidade Médica: </label>
                    <select
                        id="especialidade"
                        name="especialidade"
                        className="form-select"
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="dermatologia">Dermatologia</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="ortopedia">Ortopedia</option>
                        {/* Adicione outras especialidades conforme necessário */}
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
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}

export default FormEdicaoAtendimento;
