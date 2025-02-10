import React, { useState } from 'react';
import './styles.css'; // Importa o arquivo de estilos

function CriarTermo() {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        cpfPaciente: '',
        conteudo: '',
        assinaturaPaciente: '',
        cpfFuncionario: '',
    });

    // Estado para armazenar mensagens de erro
    const [errors, setErrors] = useState({});

    // Função para atualizar o estado quando o usuário digita nos campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para validar e enviar o formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita o recarregamento da página

        const validationErrors = {}; // Objeto para armazenar os erros de validação

        // Validação dos campos obrigatórios
        if (!formData.cpfPaciente) validationErrors.cpfPaciente = "O CPF do paciente não pode ser vazio";
        if (!formData.conteudo) validationErrors.conteudo = "O conteúdo do termo não pode ser vazio";
        if (formData.conteudo.length > 500) validationErrors.conteudo = "O conteúdo do termo não pode ter mais de 500 caracteres";
        if (!formData.assinaturaPaciente) validationErrors.assinaturaPaciente = "A assinatura do paciente não pode ser vazia";
        if (!formData.cpfFuncionario) validationErrors.cpfFuncionario = "O CPF do funcionário não pode ser vazio";

        setErrors(validationErrors); // Atualiza o estado de erros

        // Se não houver erros, submete o formulário
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
            alert("Termo de Consentimento Criado!");
        }
    };

    return (
        <div className="termo-consentimento-container">
            <h1>Criar Termo de Consentimento</h1>
            <form onSubmit={handleSubmit}>
                {/* Campo CPF do Paciente */}
                <div className="form-group">
                    <label htmlFor="cpfPaciente">CPF do Paciente<span className="required">*</span></label>
                    <input
                        type="text"
                        id="cpfPaciente"
                        name="cpfPaciente"
                        placeholder="000.000.000-00"
                        value={formData.cpfPaciente}
                        onChange={handleChange}
                    />
                    {errors.cpfPaciente && <div className="error-message">{errors.cpfPaciente}</div>}
                </div>

                {/* Campo Conteúdo do Termo */}
                <div className="form-group">
                    <label htmlFor="conteudo">Conteúdo do Termo<span className="required">*</span></label>
                    <textarea
                        id="conteudo"
                        name="conteudo"
                        placeholder="Escreva o conteúdo do termo aqui..."
                        value={formData.conteudo}
                        onChange={handleChange}
                        maxLength="500"
                    />
                    {/* Contador de caracteres */}
                    <div className="character-count">
                        {formData.conteudo.length} / 500 caracteres
                    </div>
                    {errors.conteudo && <div className="error-message">{errors.conteudo}</div>}
                </div>

                {/* Campo Assinatura do Paciente */}
                <div className="form-group">
                    <label htmlFor="assinaturaPaciente">Assinatura do Paciente<span className="required">*</span></label>
                    <input
                        type="text"
                        id="assinaturaPaciente"
                        name="assinaturaPaciente"
                        placeholder="Nome completo do paciente"
                        value={formData.assinaturaPaciente}
                        onChange={handleChange}
                    />
                    {errors.assinaturaPaciente && <div className="error-message">{errors.assinaturaPaciente}</div>}
                </div>

                {/* Campo CPF do Funcionário */}
                <div className="form-group">
                    <label htmlFor="cpfFuncionario">CPF do Funcionário<span className="required">*</span></label>
                    <input
                        type="text"
                        id="cpfFuncionario"
                        name="cpfFuncionario"
                        placeholder="000.000.000-00"
                        value={formData.cpfFuncionario}
                        onChange={handleChange}
                    />
                    {errors.cpfFuncionario && <div className="error-message">{errors.cpfFuncionario}</div>}
                </div>

                {/* Botão de envio */}
                <button type="submit">Criar Termo</button>
            </form>
        </div>
    );
}

export default CriarTermo;