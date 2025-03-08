import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import App from "./App";
import Login from "./pages/login/index";
import Header from "./components/header/index";
import GestaoTermos from "./pages/termoconsentimento/GestaoTermos.jsx";
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
import CriarMedicamento from "./pages/medicamento/CriarMedicamento.jsx";
import VisitasList from "./pages/visitadomiciliar/VisitasList.jsx";
import VisitaForm from "./pages/visitadomiciliar/VisitaForm.jsx";
import VisitaDetalhes from "./pages/visitadomiciliar/VisitaDetalhes.jsx";
import GestaoVacinacao from "./pages/vacinacao/GestaoVacinacao.jsx";
import GerirCampanha from "./pages/campanha/gerir-campanhas.jsx";
import Familia from "./pages/familia/familia.jsx";
import CriarFamilia from "./pages/familia/criarFamilia.jsx";

const Layout = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // Supondo que queremos ocultar o Header apenas na página de login (rota "/")
    if (location.pathname === "/") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />
        <Route path="/gestao-termos" element={<GestaoTermos />} />
        <Route path="/criar-termo" element={<CriarTermo />} />
        <Route path="/emissao-relatorios" element={<EmissaoRelatorios />} />
        <Route path="/unidadesdesaude" element={<Unidades />} />
        <Route path="/agendas" element={<Agendas />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/CriarMedicamento" element={<CriarMedicamento />} />
        <Route path="/buscarrequisicoes" element={<BuscarRequisicoes />} />
        <Route path="/requisicao" element={<Requisicao />} />
        <Route path="/gestao-paciente" element={<GestaoPaciente />} />
        <Route path="/criar-paciente" element={<CriarPaciente/>} />
        <Route path="/detalhes-paciente" element={<DetalhesPaciente/>} />
        <Route path="/prontuario" element={<ProntuarioScreen/>} />
        <Route path="/visitadomiciliar" element={<VisitasList />} />
        <Route path="/visitadomiciliar/novo" element={<VisitaForm />} />
        <Route path="/visitadomiciliar/editar/:id" element={<VisitaForm />} />
        <Route
          path="/visitadomiciliar/detalhes/:id"
          element={<VisitaDetalhes />}
        />
        <Route path="/vacinacao" element={<GestaoVacinacao />} />
        <Route path="/gerir-campanhas" element={<GerirCampanha />} />

        <Route path="/familia" element={<Familia/>} />
        <Route path="/criarFamilia" element={<CriarFamilia/>} />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default AppRoutes;
