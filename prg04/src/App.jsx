import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Botao from "./components/button/button.jsx";

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

    const goToCampanha = () =>{
        navigate("/gerir-campanhas")
    }

    return (
        <div className="homePage">
            <div className="menu">
                <Botao texto="Gestão de Termos de Consentimento" onClick={goToGestaoTermos}></Botao>
                <Botao texto="Emissão de Relátorios" onClick={goToEmissaoRelatorios}></Botao>
                <Botao texto="Unidades de Saude" onClick={goToUnidades} />
                <button onClick={goToMedicamentos}>Gestão de Medicamentos</button>
                <button onClick={goToAgendas}>Agendas</button>
                <button onClick={goToBuscarRequisicoes}>Ir para Requisicoes</button>
                <button onClick= {goToVacinacao}>Gestão de Vacinação</button>
                <button onClick={gotToPaciente}>Gestão de Pacientes</button>
                <Botao texto="Gestão de Medicamento" onClick={goToMedicamentos}/>
                <Botao texto="Agendas" onClick={goToAgendas}></Botao>
                <Botao texto="Ir para Requisicoes" onClick={goToBuscarRequisicoes}></Botao>
                <Botao texto="Gestão de Vacinação" onClick={goToVacinacao}></Botao>
                <Botao texto="Gestão de Visitas Domiciliares" onClick={goToVisitasDomiciliares}></Botao>
                <Botao texto="Campanhas de Vacinação" onClick={goToCampanha}></Botao>
            </div>
        </div>
    );
}

export default App;
