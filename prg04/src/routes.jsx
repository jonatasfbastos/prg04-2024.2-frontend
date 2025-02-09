import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/index";
import Header from "./components/header/index";

const AppRoutes = () => {
  //abaixo define as rotas, colocando path da rota e a página referente

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
