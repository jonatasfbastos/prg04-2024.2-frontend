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
import CriarMedicamento from "./pages/medicamento/CriarMedicamento.jsx"
import VisitasList from "./pages/visitadomiciliar/VisitasList.jsx";
import VisitaForm from "./pages/visitadomiciliar/VisitaForm.jsx";
import VisitaDetalhes from "./pages/visitadomiciliar/VisitaDetalhes.jsx";
import GestaoVacinacao from "./pages/vacinacao/GestaoVacinacao.jsx";
import GestaoAtendimentos from "./pages/gestaoatendimento/GestaoAtendimento.jsx";


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
        <Route path="/agendas" element={<Agendas />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/CriarMedicamento" element={<CriarMedicamento />}/>
        <Route path="/buscarrequisicoes" element={<BuscarRequisicoes />} />
        <Route path="/requisicao" element={<Requisicao />} />
        <Route path="/visitadomiciliar" element={<VisitasList />} />
        <Route path="/visitadomiciliar/novo" element={<VisitaForm />} />
        <Route path="/visitadomiciliar/editar/:id" element={<VisitaForm />} />
        <Route path="/visitadomiciliar/detalhes/:id" element={<VisitaDetalhes />} />
        <Route path="/vacinacao" element={<GestaoVacinacao />} />
        <Route path="/gestaoatendimentos" element={<GestaoAtendimentos />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
