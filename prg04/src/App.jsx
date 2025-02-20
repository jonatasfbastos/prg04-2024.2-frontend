import "./App.css"
import { useNavigate } from "react-router-dom";
import Botao from "./components/button/button.jsx";

function App() {
    const navigate = useNavigate() // hook de gerenciamento de rotas

    const goToGestaoTermos = () => {
        navigate("/gestao-termos")
    }

    const goToEmissaoRelatorios = () => {
        navigate("/emissao-relatorios")
    }

    const goToUnidades = () => {
        navigate("/unidades-de-saude")
    }

    const goToMedicamentos = () => {
        navigate("/medicamentos")
    }

    const goToAgendas = () => {
        navigate("/agendas")
    }

    const goToBuscarRequisicoes = () => {
        navigate("/buscarrequisicoes")
    }
    const goToVacinacao = () => {
        navigate("/vacinacao")
    }

    const gotToPaciente = () => {
        navigate("/gestao-paciente")
    }

    const goToVisitasDomiciliares = () => {
        navigate("/visitadomiciliar")
    }

    const goToCampanha = () =>{
        navigate("/gerir-campanhas")
    }
    const goToGestaoAtendimentos = () =>{
        navigate("/gestaoatendimentos");
    }

    const goToFuncionarios = () => {
        navigate("/funcionarios")
    } 
    return (
        <div className="homePage">
            <div className="menu">
                <button onClick={goToGestaoTermos}>Gestão de Termos de Consentimento</button>
                <button onClick={goToEmissaoRelatorios}>Emissão de Relátorios</button>
                <button onClick={goToUnidades}>Unidades de Saude</button>
                <button onClick={goToMedicamentos}>Gestão de Medicamentos</button>
                <button onClick={goToAgendas}>Agendas</button>
                <button onClick={goToBuscarRequisicoes}>Ir para Requisicoes</button>
                <button onClick= {goToVacinacao}>Gestão de Vacinação</button>
                <button onClick={gotToPaciente}>Gestão de Pacientes</button>
                <button onClick={goToMedicamentos}>Gestão de Medicamentos</button>
                <button onClick={goToBuscarRequisicoes}>Ir para Requisicoes</button>
                <button onClick={goToVacinacao}>Gestão de Vacinação</button>
                <button onClick={goToVisitasDomiciliares}>Gestão de Visitas Domiciliares</button>
                <button onClick={goToCampanha}>Campanhas de Vacinação</button>
                <button onClick={goToGestaoAtendimentos}>Agendar consulta</button>
                <button onClick={goToFuncionarios}>Gestão de Funcionários</button>
            </div>
        </div>
    )
}

export default App
