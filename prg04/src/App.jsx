import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

//Icons
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
    MdVaccines
} from "react-icons/md";

import {
    GiHouse,
} from "react-icons/gi";

import headerImage from './images/banner.jpg';

function App() {
    const navigate = useNavigate(); // Hook de gerenciamento de rotas

    // Funções de navegação
    const goToGestaoTermos = () => navigate("/gestao-termos");
    const goToEmissaoRelatorios = () => navigate("/emissao-relatorios");
    const goToUnidades = () => navigate("/unidades-de-saude");
    const goToMedicamentos = () => navigate("/medicamentos");
    const goToAgendas = () => navigate("/agendas");
    const goToBuscarRequisicoes = () => navigate("/buscarrequisicoes");
    const goToVacinacao = () => navigate("/vacinacao");
    const goToPaciente = () => navigate("/gestao-paciente");
    const goToVisitasDomiciliares = () => navigate("/visitadomiciliar");
    const goToCampanha = () => navigate("/gerir-campanhas");
    const goToGestaoAtendimentos = () => navigate("/gestaoatendimentos");
    const goToFuncionarios = () => navigate("/funcionarios");

    // Array de serviços com dados para os cards
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
            title: "Gestão de Vacinação",
            description: "Controle o processo de vacinação.",
            onClick: goToVacinacao,
            icon: <MdVaccines className="home-page__card-icon" />,
        },
        {
            id: 8,
            title: "Gestão de Pacientes",
            description: "Gerencie o cadastro e o histórico dos pacientes.",
            onClick: goToPaciente,
            icon: <FaUsers className="home-page__card-icon" />, // Alterado de GiHealthNormal
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
            icon: <MdVaccines className="home-page__card-icon" />, // Alterado de GiCampfire
        },
        {
            id: 11,
            title: "Agendar Consulta",
            description: "Agende consultas médicas com facilidade.",
            onClick: goToGestaoAtendimentos,
            icon: <FaCalendarAlt className="home-page__card-icon" />, // Alterado de GiDoctorFace
        },
        {
            id: 12,
            title: "Gestão de Funcionários",
            description: "Gerencie os funcionários da unidade de saúde.",
            onClick: goToFuncionarios,
            icon: <FaUserTie className="home-page__card-icon" />, // Alterado de GiMedicinePills
        },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [fullView, setFullView] = useState(false);

    const cardsPerPage = 4;
    const totalPages = Math.ceil(services.length / cardsPerPage);

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleVerTudo = () => {
        setFullView(true);
    };

    const handleMostrarMenos = () => {
        setFullView(false);
    };

    return (
        <div className="home-page">
            <header className="home-page__header">
                <div className="home-page__header-text">
                    <h1>Uma solução completa para gestão da saúde pública e privada.</h1>
                </div>
                <img src={headerImage} alt="Banner"/>
            </header>
            <section className="home-page__services">
                <h2>Confira nossos serviços:</h2>

                {!fullView ? (
                    <div className="home-page__carousel-container">
                        <button
                            className="home-page__carousel-button"
                            onClick={handlePrev}
                            disabled={currentPage === 0}
                        >
                            &#9664;
                        </button>
                        <div className="home-page__cards-container--carousel">
                            {services
                                .slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage)
                                .map((service) => (
                                    <div key={service.id} className="home-page__card">
                                        {service.icon} {/* Ícone adicionado aqui */}
                                        <h3 className="home-page__card-title">{service.title}</h3>
                                        <p className="home-page__card-description">{service.description}</p>
                                        <button className="home-page__card-button" onClick={service.onClick}>
                                            Acessar
                                        </button>
                                    </div>
                                ))}
                        </div>
                        <button
                            className="home-page__carousel-button"
                            onClick={handleNext}
                            disabled={currentPage === totalPages - 1}
                        >
                            &#9654;
                        </button>
                    </div>
                ) : (
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

export default App;
