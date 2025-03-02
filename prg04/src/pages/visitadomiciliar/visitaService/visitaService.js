// URL base da API para gerenciar as visitas
const API_URL = "http://localhost:8080/visitas";

/**
 * Obtém a lista de todas as visitas da API.
 * @returns {Array} Lista de visitas ou um array vazio em caso de erro.
 */
export const getVisitas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar visitas");
    return await response.json(); // Retorna os dados convertidos para JSON
  } catch (error) {
    console.error(error);
    return []; // Retorna um array vazio caso ocorra um erro
  }
};

/**
 * Obtém os detalhes de uma visita específica pelo ID.
 * @param {number} id - O ID da visita.
 * @returns {Object|null} Retorna a visita encontrada ou null em caso de erro.
 */
export const getVisitaById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar visita");
    return await response.json(); // Retorna os dados da visita convertidos para JSON
  } catch (error) {
    console.error(error);
    return null; // Retorna null caso ocorra um erro
  }
};

/**
 * Cria uma nova visita enviando os dados para a API.
 * @param {Object} visita - Objeto contendo os dados da nova visita.
 */
export const createVisita = async (visita) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST", // Método HTTP para criação de recursos
      headers: { "Content-Type": "application/json" }, // Define o tipo de conteúdo como JSON
      body: JSON.stringify(visita), // Converte o objeto para JSON antes de enviar
    });
    if (!response.ok) throw new Error("Erro ao criar visita");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Atualiza uma visita existente com base no ID fornecido.
 * @param {number} id - O ID da visita a ser atualizada.
 * @param {Object} visita - Objeto contendo os novos dados da visita.
 */
export const updateVisita = async (id, visita) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT", // Método HTTP para atualização de recursos
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    });
    if (!response.ok) throw new Error("Erro ao atualizar visita");
  } catch (error) {
    console.error(error);
  }
};

/**
 * Exclui uma visita com base no ID fornecido.
 * @param {number} id - O ID da visita a ser excluída.
 */
export const deleteVisita = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // Faz a requisição para deletar sem precisar de resposta
  } catch (error) {
    console.error("Erro ao deletar visita:", error);
  }
};

