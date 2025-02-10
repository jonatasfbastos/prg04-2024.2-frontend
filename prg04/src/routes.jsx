import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/index";
import Header from "./components/header/index";
import GestaoTermos from './pages/termoconsentimento/gestao-termos.jsx';
import CriarTermo from "./pages/termoconsentimento/criar-termo.jsx";

const AppRoutes = () => {
  //abaixo define as rotas, colocando path da rota e a página referente

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gestao-termos" element={<GestaoTermos />} />
        <Route path="/criar-termo" element={<CriarTermo />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
