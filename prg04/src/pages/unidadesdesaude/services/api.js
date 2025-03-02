import axios from 'axios';

const API_URL = 'http://localhost:8080/unidades';

const UnidadeService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/findall`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
      throw error;
    }
  },

  create: async (unidade) => {
    try {
      const response = await axios.post(`${API_URL}/save`, unidade);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar unidade:', error);
      throw error;
    }
  },

  // Atualizar Unidade
  update: async (unidade) => {
    try {
      const response = await axios.put(`${API_URL}/update`, unidade);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      throw error;
    }
  },

  delete: async (telefone) => {
    try {
      await axios.delete(`${API_URL}/delete/${telefone}`);
    } catch (error) {
      console.error('Erro ao excluir unidade:', error);
      throw error;
    }
  },
};

export default UnidadeService;
