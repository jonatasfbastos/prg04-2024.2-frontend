import "./App.css"
import { useNavigate } from "react-router-dom";
import Botao from "./components/button/button.jsx";

function App() {
    const navigate = useNavigate(); // hook de gerenciamento de rotas

    const goToGestaoTermos = () => {
        navigate("/gestao-termos");
    };

    const goToEmissaoRelatorios = () => {
        navigate("/emissao-relatorios");
    };

    const goToUnidades = () => {
        navigate("/unidades-de-saude");
    };

    const goToMedicamentos = () => {
        navigate("/medicamentos");
    };

    const goToAgendas = () => {
        navigate("/agendas");
    };

    const goToBuscarRequisicoes = () => {
        navigate("/buscarrequisicoes");
    };
    const goToVacinacao = () => {
        navigate("/vacinacao");
    };

    const goToVisitasDomiciliares = () => {
        navigate("/visitadomiciliar");
    };

    return (
        <div className="homePage">
            <div className="menu">
                <Botao texto="Gestão de Termos de Consentimento" onClick={goToGestaoTermos}></Botao>
                <Botao texto="Emissão de Relátorios" onClick={goToEmissaoRelatorios}></Botao>
                <Botao texto="Unidades de Saude" onClick={goToUnidades} />
                <Botao texto="Gestão de Medicamento" onClick={goToMedicamentos}/>
                <Botao texto="Agendas" onClick={goToAgendas}></Botao>
                <Botao texto="Ir para Requisicoes" onClick={goToBuscarRequisicoes}></Botao>
                <Botao texto="Gestão de Vacinação" onClick={goToVacinacao}></Botao>
                <Botao texto="Gestão de Visitas Domiciliares" onClick={goToVisitasDomiciliares}></Botao>
            </div>
        </div>
    );
}

export default App;
