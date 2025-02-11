// Importa os hooks do React e outras dependências
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import './styles.css'; // Importa o arquivo de estilos
import { createTermoConsentimento } from './TermoConsentimentoService.jsx'; // Função para criar o termo de consentimento

function CriarTermo() {
    const navigate = useNavigate(); // Hook de navegação do React Router

    // Estado que armazena os dados do formulário
    const [formData, setFormData] = useState({
        cpfPaciente: '',
        conteudo: '',
        assinaturaPaciente: '',
        cpfFuncionario: '',
    });

    // Estado que controla a visibilidade e dados do modal de erro
    const [errorModal, setErrorModal] = useState({
        visible: false,
        status: '',
        message: ''
    });

    // Estado para armazenar as mensagens de erro de validação
    const [errors, setErrors] = useState({});

    // Função para atualizar os dados do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para fechar o modal de erro
    const closeErrorModal = () => {
        setErrorModal({
            visible: false,
            status: '',
            message: ''
        });
    };

    // Função para validar os campos do formulário e enviar os dados
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        const validationErrors = {}; // Armazena os erros de validação

        // Valida os campos obrigatórios e impõe restrições
        if (!formData.cpfPaciente) validationErrors.cpfPaciente = "O CPF do paciente não pode ser vazio";
        if (!formData.conteudo) validationErrors.conteudo = "O conteúdo do termo não pode ser vazio";
        if (formData.conteudo.length > 500) validationErrors.conteudo = "O conteúdo do termo não pode ter mais de 500 caracteres";
        if (!formData.assinaturaPaciente) validationErrors.assinaturaPaciente = "A assinatura do paciente não pode ser vazia";
        if (!formData.cpfFuncionario) validationErrors.cpfFuncionario = "O CPF do funcionário não pode ser vazio";

        setErrors(validationErrors); // Atualiza o estado de erros

        // Se não houver erros, envia o formulário
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Chama a função para criar o termo de consentimento
                const response = await createTermoConsentimento(formData);
                console.log("Termo criado com sucesso:", response);
                navigate("/gestao-termos"); // Redireciona para a página de gestão de termos
            } catch (error) {
                // Em caso de erro, exibe um modal com a mensagem de erro
                console.error("Erro ao criar termo", error);
                setErrorModal({
                    visible: true,
                    status: error.response?.status || 'Erro',
                    message: error.response?.data?.message || 'Ocorreu um erro ao tentar criar o termo.'
                });
            }
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
                    {/* Exibe o contador de caracteres */}
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

                {/* Botão de envio do formulário */}
                <button type="submit">Criar Termo</button>
            </form>

            {/* Modal de erro, exibido caso ocorra um erro ao tentar criar o termo */}
            {errorModal.visible && (
                <div className="error-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeErrorModal}>&times;</span>
                        <h2>{errorModal.status}</h2>
                        <p>{errorModal.message}</p>
                        <button className="ok-button" onClick={closeErrorModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CriarTermo;