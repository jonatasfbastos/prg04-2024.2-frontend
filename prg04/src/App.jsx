import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import "./App.css"; // Importa o arquivo de estilos CSS
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para controle de rotas

// Importação de ícones do React Icons
import {
    FaFileContract,
    FaChartLine,
    FaHospital,
    FaPills,
    FaUsers,
    FaCalendarAlt,
    FaUserTie
} from "react-icons/fa";

import {
    MdSchedule,
    MdAssignment,
    MdVaccines,
    MdFamilyRestroom
} from "react-icons/md";

import {
    GiHouse,
} from "react-icons/gi";

import headerImage from './images/banner.jpg'; // Importa a imagem do cabeçalho

function App() {
    const navigate = useNavigate(); // Hook para gerenciar a navegação entre rotas

    // Funções de navegação para cada serviço, redirecionando para a rota correspondente
    const goToGestaoTermos = () => navigate("/gestao-termos");
    const goToEmissaoRelatorios = () => navigate("/emissao-relatorios");
    const goToUnidades = () => navigate("/unidades-de-saude");
    const goToMedicamentos = () => navigate("/medicamentos");
    const goToAgendas = () => navigate("/agendas");
    const goToBuscarRequisicoes = () => navigate("/buscarrequisicoes");
    const goToVacinas = () => navigate("/vacinas");
    const goToPaciente = () => navigate("/gestao-paciente");
    const goToVisitasDomiciliares = () => navigate("/visitadomiciliar");
    const goToCampanha = () => navigate("/gerir-campanhas");
    const goToGestaoAtendimentos = () => navigate("/gestaoatendimentos");
    const goToFuncionarios = () => navigate("/funcionarios");
    const goToFamilia = () => navigate("/familia");

    // Array de serviços contendo os dados para os cards exibidos na página
    const services = [
        {
            id: 1,
            title: "Gestão de Termos de Consentimento",
            description: "Gerencie os termos de consentimento dos pacientes.",
            onClick: goToGestaoTermos,
            icon: <FaFileContract className="home-page__card-icon" />,
        },
        {
            id: 2,
            title: "Emissão de Relatórios",
            description: "Emita relatórios precisos e detalhados.",
            onClick: goToEmissaoRelatorios,
            icon: <FaChartLine className="home-page__card-icon" />,
        },
        {
            id: 3,
            title: "Unidades de Saúde",
            description: "Encontre e gerencie suas unidades de saúde.",
            onClick: goToUnidades,
            icon: <FaHospital className="home-page__card-icon" />,
        },
        {
            id: 4,
            title: "Gestão de Medicamentos",
            description: "Controle o estoque e a distribuição de medicamentos.",
            onClick: goToMedicamentos,
            icon: <FaPills className="home-page__card-icon" />,
        },
        {
            id: 5,
            title: "Agendas",
            description: "Organize as agendas de atendimento.",
            onClick: goToAgendas,
            icon: <MdSchedule className="home-page__card-icon" />,
        },
        {
            id: 6,
            title: "Requisições",
            description: "Busque e gerencie requisições.",
            onClick: goToBuscarRequisicoes,
            icon: <MdAssignment className="home-page__card-icon" />,
        },
        {
            id: 7,
            title: "Gestão de Vacinas", 
            description: "Gerencie vacinas e lotes disponíveis.",
            onClick: goToVacinas, 
            icon: <MdVaccines className="home-page__card-icon" />,
        },
        {
            id: 8,
            title: "Gestão de Pacientes",
            description: "Gerencie o cadastro e o histórico dos pacientes.",
            onClick: goToPaciente,
            icon: <FaUsers className="home-page__card-icon" />, // Ícone para gestão de pacientes
        },
        {
            id: 9,
            title: "Visitas Domiciliares",
            description: "Agende e monitore visitas domiciliares.",
            onClick: goToVisitasDomiciliares,
            icon: <GiHouse className="home-page__card-icon" />,
        },
        {
            id: 10,
            title: "Campanhas de Vacinação",
            description: "Organize campanhas de vacinação.",
            onClick: goToCampanha,
            icon: <MdVaccines className="home-page__card-icon" />, // Ícone para campanhas de vacinação
        },
        {
            id: 11,
            title: "Agendar Consulta",
            description: "Agende consultas médicas com facilidade.",
            onClick: goToGestaoAtendimentos,
            icon: <FaCalendarAlt className="home-page__card-icon" />, // Ícone para agendamento de consultas
        },
        {
            id: 12,
            title: "Gestão de Funcionários",
            description: "Gerencie os funcionários da unidade de saúde.",
            onClick: goToFuncionarios,
            icon: <FaUserTie className="home-page__card-icon" />, // Ícone para gestão de funcionários
        },
        {
            id: 13,
            title: "Gestão de Familias",
            description: "Gerencie as familias da unidade de saúde.",
            onClick: goToFamilia,
            icon:<MdFamilyRestroom className="home-page__card-icon"/>,
        },
    ];

    // Estado para controlar a página atual do carrossel
    const [currentPage, setCurrentPage] = useState(0);
    // Estado para controlar se todos os serviços serão exibidos (visão completa) ou apenas um carrossel
    const [fullView, setFullView] = useState(false);

    // Número de cards exibidos por página no carrossel
    const cardsPerPage = 4;
    // Cálculo do número total de páginas do carrossel
    const totalPages = Math.ceil(services.length / cardsPerPage);

    // Função para navegar para a página anterior do carrossel
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Função para navegar para a próxima página do carrossel
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para exibir todos os serviços (visão completa)
    const handleVerTudo = () => {
        setFullView(true);
    };

    // Função para retornar à exibição em carrossel (mostrar menos)
    const handleMostrarMenos = () => {
        setFullView(false);
    };

    return (
        <div className="home-page">
            {/* Cabeçalho da página com título e imagem de banner */}
            <header className="home-page__header">
                <div className="home-page__header-text">
                    <h1>Uma solução completa para gestão da saúde pública e privada</h1>
                </div>
                <img src={headerImage} alt="Banner"/>
            </header>
            {/* Seção que exibe os serviços */}
            <section className="home-page__services">
                <h2>Confira nossos serviços:</h2>

                {/* Exibição condicional: carrossel se fullView for falso, lista completa se verdadeiro */}
                {!fullView ? (
                    <div className="home-page__carousel-container">
                        {/* Botão para navegar para a página anterior do carrossel */}
                        <button
                            className="home-page__carousel-button"
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                        >
                            &#9664;
                        </button>
                        <div className="home-page__cards-container--carousel">
                            {/* Renderiza os cards do carrossel com base na página atual */}
                            {services
                                .slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage)
                                .map((service) => (
                                    <div key={service.id} className="home-page__card">
                                        {service.icon} {/* Ícone do serviço */}
                                        <h3 className="home-page__card-title">{service.title}</h3>
                                        <p className="home-page__card-description">{service.description}</p>
                                        <button className="home-page__card-button" onClick={service.onClick}>
                                            Acessar
                                        </button>
                                    </div>
                                ))}
                        </div>
                        {/* Botão para navegar para a próxima página do carrossel */}
                        <button
                            className="home-page__carousel-button"
                            onClick={handleNext}
                            disabled={currentPage === totalPages - 1}
                        >
                            &#9654;
                        </button>
                    </div>
                ) : (
                    // Exibição completa de todos os serviços quando fullView é verdadeiro
                    <div className="home-page__cards-container">
                        {services.map((service) => (
                            <div key={service.id} className="home-page__card">
                                {service.icon}
                                <h3 className="home-page__card-title">{service.title}</h3>
                                <p className="home-page__card-description">{service.description}</p>
                                <button className="home-page__card-button" onClick={service.onClick}>
                                    Acessar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Botão para alternar entre "Mostrar mais" e "Mostrar menos" */}
                {!fullView ? (
                    <button className="home-page__ver-tudo-button" onClick={handleVerTudo}>
                        Mostrar mais
                    </button>
                ) : (
                    <button className="home-page__ver-tudo-button" onClick={handleMostrarMenos}>
                        Mostrar menos
                    </button>
                )}
            </section>
        </div>
    );
}

export default App; // Exporta o componente App como padrão
