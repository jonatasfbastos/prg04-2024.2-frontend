import axios from 'axios';

// URL base da API para o serviço de unidades de saúde
const API_URL = 'http://localhost:8080/unidades';

// Objeto com métodos para interação com a API de unidades de saúde
const UnidadeService = {
  /**
   * Busca todas as unidades de saúde cadastradas no sistema
   * @returns {Promise} Promise contendo os dados de todas as unidades
   */
  getAll: async () => {
    try {
      console.log("Buscando unidades da API...");
      // Faz a requisição GET para o endpoint de listagem
      const response = await axios.get(`${API_URL}/findall`);
      console.log("Resposta da API:", response.data); // Log para verificar os dados retornados
      return response.data;
    } catch (error) {
      // Captura e registra qualquer erro na requisição
      console.error("Erro ao buscar unidades:", error);
      throw error; // Repassa o erro para ser tratado pelo componente
    }
  },

  /**
   * Cria uma nova unidade de saúde no sistema
   * @param {Object} unidade - Objeto contendo os dados da unidade a ser criada
   * @returns {Promise} Promise contendo os dados da unidade criada
   */
  create: async (unidade) => {
    try {
      // Direciona a requisição para o endpoint específico com base no tipo de unidade
      if(unidade.tipo === "HOSPITAL"){
        // Endpoint específico para hospitais
        const response = await axios.post(`http://localhost:8080/hospitais/save`, unidade);
        return response.data;
      }
      else if(unidade.tipo === "FARMACIA"){
        // Endpoint específico para farmácias
        const response = await axios.post(`http://localhost:8080/farmacias/save`, unidade);
        return response.data;
      }
      else if(unidade.tipo === "UPA"){
        // Endpoint específico para UPAs (Unidades de Pronto Atendimento)
        const response = await axios.post(`http://localhost:8080/upas/save`, unidade);
        return response.data;
      }
      else if(unidade.tipo === "UBS"){
        // Endpoint específico para UBSs (Unidades Básicas de Saúde)
        const response = await axios.post(`http://localhost:8080/ubs/save`, unidade);
        return response.data;
      }
    } catch (error) {
      // Captura e registra erros na criação da unidade
      console.error('Erro ao adicionar unidade:', error);
      throw error; // Repassa o erro para ser tratado pelo componente
    }
  },

  /**
   * Atualiza os dados de uma unidade de saúde existente
   * @param {Object} unidade - Objeto contendo os dados atualizados da unidade
   * @returns {Promise} Promise contendo os dados da unidade atualizada
   */
  update: async (unidade) => {
    try {
      // Faz a requisição PUT para atualizar os dados da unidade
      const response = await axios.put(`${API_URL}/update`, unidade);
      return response.data;
    } catch (error) {
      // Captura e registra erros na atualização
      console.error('Erro ao atualizar unidade:', error);
      throw error; // Repassa o erro para ser tratado pelo componente
    }
  },

  /**
   * Remove uma unidade de saúde do sistema
   * @param {string} telefone - Telefone da unidade a ser excluída (usado como identificador)
   * @returns {Promise} Promise que é concluída após a exclusão
   */
  delete: async (telefone) => {
    try {
      // Faz a requisição DELETE para remover a unidade pelo telefone
      await axios.delete(`${API_URL}/delete/${telefone}`);
    } catch (error) {
      // Captura e registra erros na exclusão
      console.error('Erro ao excluir unidade:', error);
      throw error; // Repassa o erro para ser tratado pelo componente
    }
  },
};

export default UnidadeService;