import "./App.css"
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate() //hook de gerenciamento de rotas

    const goToLogin = () => {
        navigate("/login")
    }

    return (
        <>
            <div>HomePage</div>
            <div>
                Exemplo de como usar as rotas
                <button onClick={goToLogin}>Ir para Login</button>
            </div>
        </>
    )
}

export default App
