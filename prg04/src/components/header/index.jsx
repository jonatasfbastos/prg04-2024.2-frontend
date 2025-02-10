import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Botao from '../button/button.jsx';
import '../header/styles.css';

export default function Index() {
    // Estado para verificar se a página atual é a Home ("/")
    const [isHomePage, setIsHomePage] = useState(false);
    
    // Hook do React Router para obter a rota atual
    const location = useLocation();

    // Efeito que verifica e atualiza o estado quando a rota muda
    useEffect(() => {
        setIsHomePage(location.pathname === '/'); // Define como true se a rota for "/"
    }, [location.pathname]); // Executa sempre que a rota mudar

    return (
        <header className='bg-primary'>
            {/* Se for a Home, usa 'justify-content-between', senão 'justify-content-center' */}
            <div className={`container-md d-flex align-items-center text-light py-3 ${isHomePage ? 'justify-content-between' : 'justify-content-center'}`}>
                <div className='d-flex align-items-center'>
                    <h1 className="titulo-principal">
                        Saúde<span className='text-danger sinal-plus'>+</span>
                    </h1>
                </div>

                {/* Exibe os botões apenas na página inicial */}
                {isHomePage && (
                    <div>
                        <Botao texto="Login" />
                        <Botao texto="Cadastre-se" />
                    </div>
                )}
            </div>

            {/* Barra de navegação */}
            <nav className="bg-secondary text-light">
                <div className="container-sm">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#feedbacks">Feedback</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#features">Funcionalidades</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
