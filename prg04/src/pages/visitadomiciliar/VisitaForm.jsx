import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVisitaById, createVisita, updateVisita } from "./visitaService/visitaService";
import "./visitas.css";

const VisitaForm = () => {
  // Estado para armazenar os dados da visita
  const [visita, setVisita] = useState({
    digitadoPor: "",
    data: "",
    conferidoPor: "",
    numeroFolha: "",
    cns: "",
    cbo: "",
    cnes: "",
    ine: "",
    motivoVisita: "",
    acompanhamento: "",
    controleAmbiental: "",
    antropometria: "",
    sinaisVitais: "",
    glicemia: "",
    desfecho: ""
  });

  // Obtém o ID da visita (se houver) da URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Se houver um ID, busca os dados da visita para edição
  useEffect(() => {
    if (id) {
      const fetchVisita = async () => {
        const data = await getVisitaById(id);
        if (data) setVisita(data);
      };
      fetchVisita();
    }
  }, [id]);

  // Atualiza o estado conforme o usuário preenche o formulário
  const handleChange = (e) => {
    setVisita({ ...visita, [e.target.name]: e.target.value });
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação para garantir que todos os campos estão preenchidos
    for (const key in visita) {
      if (!visita[key]) {
        alert(`O campo ${key.toUpperCase()} é obrigatório.`);
        return;
      }
    }

    // Se houver um ID, significa que estamos editando uma visita existente, senão, criamos uma nova
    if (id) {
      await updateVisita(id, visita);
    } else {
      await createVisita(visita);
    }

    // Redireciona o usuário para a lista de visitas após salvar
    navigate("/visitadomiciliar");
  };

  return (
    <div className="visitas-container">
      <h2>{id ? "Editar Visita" : "Nova Visita"}</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Seção Cabeçalho */}
        <fieldset>
          <legend>Cabeçalho</legend>
          <label>Digitado Por (Nome do Profissional): <span className="required">*</span></label>
          <input type="text" name="digitadoPor" value={visita.digitadoPor} onChange={handleChange} required />

          <label>Data (Dia/Mês/Ano): <span className="required">*</span></label>
          <input type="date" name="data" value={visita.data} onChange={handleChange} required />

          <label>Conferido Por (Nome do Revisor): <span className="required">*</span></label>
          <input type="text" name="conferidoPor" value={visita.conferidoPor} onChange={handleChange} required />

          <label>Número da Folha (Número do Prontuário): <span className="required">*</span></label>
          <input type="text" name="numeroFolha" value={visita.numeroFolha} onChange={handleChange} required />
        </fieldset>

        {/* Seção Identificação do Profissional e Estabelecimento */}
        <fieldset>
          <legend>Identificação do Profissional e Estabelecimento de Saúde</legend>
          <label>CNS (Cartão Nacional de Saúde): <span className="required">*</span></label>
          <input type="text" name="cns" value={visita.cns} onChange={handleChange} required />

          <label>CBO (Código Brasileiro de Ocupações): <span className="required">*</span></label>
          <input type="text" name="cbo" value={visita.cbo} onChange={handleChange} required />

          <label>CNES (Cadastro Nacional de Estabelecimentos de Saúde): <span className="required">*</span></label>
          <input type="text" name="cnes" value={visita.cnes} onChange={handleChange} required />

          <label>INE (Identificação Nacional do Estabelecimento): <span className="required">*</span></label>
          <input type="text" name="ine" value={visita.ine} onChange={handleChange} required />
        </fieldset>

        {/* Seção Outras Informações */}
        <fieldset>
          <legend>Outras Informações</legend>
          <label>Motivo da Visita: <span className="required">*</span></label>
          <textarea name="motivoVisita" value={visita.motivoVisita} onChange={handleChange} required />

          <label>Acompanhamento: <span className="required">*</span></label>
          <textarea name="acompanhamento" value={visita.acompanhamento} onChange={handleChange} required />

          <label>Controle Ambiental: <span className="required">*</span></label>
          <textarea name="controleAmbiental" value={visita.controleAmbiental} onChange={handleChange} required />

          <label>Antropometria: <span className="required">*</span></label>
          <textarea name="antropometria" value={visita.antropometria} onChange={handleChange} required />

          <label>Sinais Vitais: <span className="required">*</span></label>
          <textarea name="sinaisVitais" value={visita.sinaisVitais} onChange={handleChange} required />

          <label>Glicemia: <span className="required">*</span></label>
          <textarea name="glicemia" value={visita.glicemia} onChange={handleChange} required />

          <label>Desfecho: <span className="required">*</span></label>
          <textarea name="desfecho" value={visita.desfecho} onChange={handleChange} required />
        </fieldset>

        {/* Botões de ação */}
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/visitadomiciliar")}>Cancelar</button>
      </form>
    </div>
  );
};

export default VisitaForm;











