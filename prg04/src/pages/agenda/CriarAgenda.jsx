const API_URL = "http://localhost:8080/agenda";

//Endpoints para save, update, delete e findall
const CriarAgenda = {
  findAll: async () => {
    const response = await fetch(`${API_URL}/findall`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      cache: "no-cache",
    });
    return response.json();
  },

  save: async (agenda) => {
    const response = await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agenda),
      mode: "cors",
      cache: "no-cache",
    });
    return response.json();
  },

update: async (id, agenda) => {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agenda),
      mode: "cors",
      cache: "no-cache",
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro ao excluir agenda');
    }
  },
};

export default CriarAgenda;
