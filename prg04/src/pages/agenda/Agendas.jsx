import React, { useEffect, useState } from "react"; //Importa o react e os hooks useEffect e useState
import CriarAgenda from "./CriarAgenda"; //Importa o arquivo CriarAgenda contendo os endpoints
import "./agenda.css"; //Importa o css personalizado so para Agenda

//Página de Agendas
const Agenda = () => {
  const [agendas, setAgendas] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [agendaAtual, setAgendaAtual] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    CriarAgenda.findAll().then((data) => {
      setAgendas(data.content);
    });
  }, []);

  const handleDelete = (id) => {
    CriarAgenda.delete(id).then(() => {
      setAgendas(agendas.filter((agenda) => agenda.id !== id));
    });
  };

  const handleEdit = (agenda) => {
    setAgendaAtual(agenda);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setAgendaAtual(null);
    setModalOpen(true);
  };

  const handleSave = (agenda) => {
    if (agenda.id) {
      CriarAgenda.update(agenda.id, agenda).then(() => {
        setAgendas(agendas.map((a) => (a.id === agenda.id ? agenda : a)));
      });
    } else {
      CriarAgenda.save(agenda).then((newAgenda) => {
        setAgendas([...agendas, newAgenda]);
      });
    }
    setModalOpen(false);
  };

  //Filtros da agenda, incluindo o diario, semanal e mensal
  const agendasFiltradas = agendas.filter((agenda) => {
    //Filtro de nome de usuario
    const usuarioFiltro = usuario
      ? agenda.nomeUsuario.toLowerCase().includes(usuario.toLowerCase())
      : true;

    //Filtro da agenda
    const tipoFiltro =
      filtro === "todos"
        ? true
        : agenda.tipo === filtro;

    return usuarioFiltro && tipoFiltro;
  });

  //Retorna a página de Agendas
  return (
    <div className="agenda-container">
      <h2 className="agenda-title">Agendas</h2>
      
      {}
      <input
        type="text"
        className="agenda-input"
        placeholder="Digite o nome do Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      
      {}
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="agenda-filtro-select"
      >
        <option value="todos">Mostrar Todos</option>
        <option value="diario">Diário</option>
        <option value="semanal">Semanal</option>
        <option value="mensal">Mensal</option>
      </select>

      <button className="agenda-add-btn" onClick={handleCreate}>
        Adicionar Agenda
      </button>

      <table className="agenda-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Usuário</th>
            <th>Cancelado</th>
            <th>Gerenciar</th>
          </tr>
        </thead>
        <tbody>
          {agendasFiltradas.map((agenda) => (
            <tr key={agenda.id}>
              <td>{agenda.titulo}</td>
              <td>{agenda.descricao}</td>
              <td>{`${agenda.dataHoraInicio[2]}/${agenda.dataHoraInicio[1]}/${agenda.dataHoraInicio[0]} ${agenda.dataHoraInicio[3]}:${agenda.dataHoraInicio[4]}`}</td>
              <td>{`${agenda.dataHoraFim[2]}/${agenda.dataHoraFim[1]}/${agenda.dataHoraFim[0]} ${agenda.dataHoraFim[3]}:${agenda.dataHoraFim[4]}`}</td>
              <td>{agenda.nomeUsuario}</td>
              <td>{agenda.cancelado ? "Sim" : "Não"}</td>
              <td>
                <button className="agenda-delete-btn" onClick={() => handleDelete(agenda.id)}>Deletar</button>
                <button className="agenda-edit-btn" onClick={() => handleEdit(agenda)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ModalAgenda
          agenda={agendaAtual}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

//Modal para criar ou editar uma agenda
const ModalAgenda = ({ agenda, onSave, onClose }) => {
  const [titulo, setTitulo] = useState(agenda?.titulo || "");
  const [descricao, setDescricao] = useState(agenda?.descricao || "");

  const formatDate = (dateArray) => {
    if (!dateArray) return "";
    const [year, month, day] = dateArray;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const formatTime = (dateArray) => {
    if (!dateArray) return "";
    const [, , , hours, minutes] = dateArray;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  const [inicio, setInicio] = useState(formatDate(agenda?.dataHoraInicio));
  const [fim, setFim] = useState(formatDate(agenda?.dataHoraFim));
  const [horaInicio, setHoraInicio] = useState(formatTime(agenda?.dataHoraInicio));
  const [horaFim, setHoraFim] = useState(formatTime(agenda?.dataHoraFim));

  const [usuario, setUsuario] = useState(agenda?.nomeUsuario || "");
  const [cancelado, setCancelado] = useState(agenda?.cancelado || false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    const inicioArray = inicio.split("-").map((item) => parseInt(item));
    const fimArray = fim.split("-").map((item) => parseInt(item));
    
    const [horaInicioHour, horaInicioMinute] = horaInicio.split(":").map((item) => parseInt(item));
    const [horaFimHour, horaFimMinute] = horaFim.split(":").map((item) => parseInt(item));

    onSave({
      id: agenda?.id,
      titulo,
      descricao,
      dataHoraInicio: [...inicioArray, horaInicioHour, horaInicioMinute],
      dataHoraFim: [...fimArray, horaFimHour, horaFimMinute],
      nomeUsuario: usuario,
      cancelado,
    });
  };

  //Validação de campos
  return (
    <div className="agenda-modal">
      <div className="agenda-modal-content">
        <h3>{agenda ? "Editar Agenda" : "Criar Agenda"}</h3>

        {error && <div className="agenda-error-message">{error}</div>}

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label>Início:</label>
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          required
        />
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />

        <label>Fim:</label>
        <input
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          required
        />
        <input
          type="time"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
          required
        />

        {!agenda && (
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        )}

        {agenda && <div><strong>Usuário: </strong>{agenda?.nomeUsuario}</div>}

        <label>
          <input
            type="checkbox"
            checked={cancelado}
            onChange={(e) => setCancelado(e.target.checked)}
          />
          Cancelado
        </label>
        <button onClick={handleSubmit}>Salvar</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Agenda;
