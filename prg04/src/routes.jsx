import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/index";
import Header from "./components/header/index";
import GestaoTermos from './pages/termoconsentimento/GestaoTermos.jsx';
import CriarTermo from "./pages/termoconsentimento/CriarTermo.jsx";
import EmissaoRelatorios from "./pages/emissaorelatorios/emisssao-relatorios.jsx";
import Unidades from "./pages/unidadesdesaude/unidades.jsx";
import Agendas from "./pages/agenda/Agendas.jsx";
import BuscarRequisicoes from "./pages/requisicao/BuscarRequisicoes.jsx";
import Requisicao from "./pages/requisicao/requisicao.jsx";
import Medicamentos from "./pages/medicamento/GestaoMedicamentos.jsx";
import GestaoPaciente from "./pages/prontuario/GestaoPaciente.jsx";
import CriarPaciente from "./pages/prontuario/CriarPaciente.jsx";
import DetalhesPaciente from "./pages/prontuario//DetalhesPaciente.jsx"
import ProntuarioScreen from "./pages/prontuario/ProntuarioScreen.jsx"

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
        <Route path="/emissao-relatorios" element={<EmissaoRelatorios />} />
        <Route path="/unidadesdesaude" element={<Unidades />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/buscarrequisicoes" element={<BuscarRequisicoes />} />
        <Route path="/requisicao" element={<Requisicao />} />
        <Route path="/gestao-paciente" element={<GestaoPaciente />} />
        <Route path="/criar-paciente" element={<CriarPaciente/>} />
        <Route path="/detalhes-paciente" element={<DetalhesPaciente/>} />
        <Route path="/prontuario" element={<ProntuarioScreen/>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
