import "./App.css"
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <div>HomePage</div>
            <div>
                Exemplo de como usar as rotas
                <button onClick={goToLogin}>Ir para Login</button>
                <button onClick={goToGestaoTermos}>Gestão de Termos de Consentimento</button>
                <button onClick={goToEmissaoRelatorios}>Emissão de Relátorios</button>
            </div>
        </>
    );
}

export default App;
