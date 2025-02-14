import "./App.css"
import { useNavigate } from "react-router-dom";
import Botao from "./components/button/button.jsx";

function App() {
    const navigate = useNavigate(); // hook de gerenciamento de rotas

    const goToLogin = () => {
        navigate("/login");
    };

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
        navigate("/vacinacao")
    };


    return (
        <>
            <div>HomePage</div>
            <div>
                Exemplo de como usar as rotas
                <button onClick={goToLogin}>Ir para Login</button>
                <button onClick={goToGestaoTermos}>Gestão de Termos de Consentimento</button>
                <button onClick={goToEmissaoRelatorios}>Emissão de Relátorios</button>
                <Botao texto="Unidades de Saude" onClick={goToUnidades} />
                <button onClick={goToMedicamentos}>Gestão de Medicamentos</button>
                <button onClick={goToAgendas}>Agendas</button>
                <button onClick={goToBuscarRequisicoes}>Ir para Requisicoes</button>
                <button onClick= {goToVacinacao}>Gestão de Vacinação</button>
            </div>
        </>
    );
}

export default App;
