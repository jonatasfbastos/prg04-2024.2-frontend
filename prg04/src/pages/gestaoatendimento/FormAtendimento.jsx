import React, { useState } from 'react';
import Botao from '../../components/button/button';
import DatePicker from "react-datepicker"; // Importa o DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Estilos do DatePicker

function FormMarcarAtendimento() {
    const [formData, setFormData] = useState({
        codigo: '', // Inicialmente vazio, mas será preenchido com código único
        dataHora: '',
        especialidadeMedica: '',
        nomeUsuario: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento
    const [successMessage, setSuccessMessage] = useState('');

    // Função para gerar o código único (UUID ou qualquer outra lógica)
    const generateUniqueCode = () => {
        const timestamp = Date.now(); // Obtém o timestamp atual
        const randomPart = Math.random().toString(36).substr(2, 5);  // 5 caracteres aleatórios
        return `ATEND-${timestamp}-${randomPart}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dataHora: date, // Atualiza a data e hora
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gerar o código único antes de enviar o formulário
        const uniqueCode = generateUniqueCode();
        setFormData({
            ...formData,
            codigo: uniqueCode, // Preenche o código gerado no formData
        });

        // Validar se a data e hora são válidas
        const isValid = validateDate(formData.dataHora);
        if (!isValid) {
            setError('Escolha um horário dentro do horário comercial e em um dia útil.');
        } else {
            setError('');
            setLoading(true); // Iniciar o carregamento

            // Enviar os dados para a API
            try {
                const response = await fetch('http://localhost:8080/gestaoatendimento/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), // Enviar os dados do formulário, agora com código único
                });

                if (response.ok) {
                    setSuccessMessage('Atendimento agendado com sucesso!');
                    setFormData({
                        codigo: '',
                        nome: '',
                        especialidade: '',
                        dataHora: '',
                    });
                } else {
                    setError('Erro ao agendar o atendimento. Tente novamente.');
                }
            } catch (error) {
                setError('Erro na comunicação com a API. Tente novamente.');
            } finally {
                setLoading(false); // Finalizar o carregamento
            }
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
                <h1 className="text-center mb-4">Agendar Atendimento</h1>

                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome: </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="form-control"
                        value={formData.nomeUsuario}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="especialidade" className="form-label">Especialidade Médica: </label>
                    <select
                        id="especialidade"
                        name="especialidade"
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
                    <DatePicker
                        selected={formData.dataHora}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="Pp"
                        className="form-control"
                        placeholderText="Selecione a data e hora"
                        required
                    />
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}
                {successMessage && <div className="text-success mb-3">{successMessage}</div>}   

                <div className='text-center'>
                    <Botao texto={loading ? "Salvando..." : "Salvar"} />
                </div>
            </form>
        </div>
    );
}

export default FormMarcarAtendimento;
