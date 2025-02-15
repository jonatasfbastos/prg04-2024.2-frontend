const API_URL = "http://localhost:8080/visitas";

export const getVisitas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar visitas");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVisitaById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar visita");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createVisita = async (visita) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    });
    if (!response.ok) throw new Error("Erro ao criar visita");
  } catch (error) {
    console.error(error);
  }
};

export const updateVisita = async (id, visita) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    });
    if (!response.ok) throw new Error("Erro ao atualizar visita");
  } catch (error) {
    console.error(error);
  }
};

export const deleteVisita = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Erro ao deletar visita:", error);
  }
};

