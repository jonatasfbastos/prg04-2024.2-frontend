import axios from 'axios';

// URL base da API para operações com unidades
const API_URL = 'http://localhost:8080/unidades';

// Serviço para interação com a API de unidades
const UnidadeService = {
  // Método para buscar todas as unidades
  getAll: async () => {
    try {
      // Faz uma requisição GET para o endpoint de busca de todas as unidades
      const response = await axios.get(`${API_URL}/findall`);
      // Retorna os dados da resposta
      return response.data;
    } catch (error) {
      // Loga o erro no console em caso de falha
      console.error('Erro ao buscar unidades:', error);
      // Propaga o erro para ser tratado pelo chamador
      throw error;
    }
  },

  // Método para criar uma nova unidade
  create: async (unidadeCreate) => {
    try {
      // Verifica o tipo da unidade e direciona para o endpoint correspondente
      if(unidadeCreate.unidade.tipo === "HOSPITAL") {
        // Requisição POST para criar um hospital
        const response = await axios.post('http://localhost:8080/hospitais/save', unidadeCreate);
        return response.data;
      } 
      else if(unidadeCreate.unidade.tipo === "FARMACIA") {
        // Requisição POST para criar uma farmácia
        const response = await axios.post('http://localhost:8080/farmacias/save', unidadeCreate);
        return response.data;
      }
      else if(unidadeCreate.unidade.tipo === "UBS") {
        // Requisição POST para criar uma UBS
        const response = await axios.post('http://localhost:8080/ubs/save', unidadeCreate);
        return response.data;
      }
      else if(unidadeCreate.unidade.tipo === "UPA") {
        // Requisição POST para criar uma UPA
        const response = await axios.post('http://localhost:8080/upas/save', unidadeCreate);
        return response.data;
      }
      // Nota: Há um possível erro aqui, pois 'response' não está definido se nenhum tipo for correspondido
    } catch (error) {
      // Loga o erro com detalhes da resposta ou mensagem genérica
      console.error('Erro ao adicionar unidade:', error.response?.data || error.message);
      // Propaga o erro para ser tratado pelo chamador
      throw error;
    }
  },

  // Método para atualizar uma unidade existente
  update: async (unidadeEdit, tipo) => {
    try {
      if(tipo === "HOSPITAL") {
        // Faz uma requisição PUT para atualizar os dados da unidade
        const response = await axios.put('http://localhost:8080/hospitais/update', unidadeEdit);
        // Retorna os dados da resposta
        return response.data;
      }
      else if(tipo === "FARMACIA") {
        // Faz uma requisição PUT para atualizar os dados da unidade
        const response = await axios.put('http://localhost:8080/farmacias/update', unidadeEdit);
        // Retorna os dados da resposta
        return response.data;
      }
      else if(tipo === "UBS") {
        // Faz uma requisição PUT para atualizar os dados da unidade
        const response = await axios.put('http://localhost:8080/ubs/update', unidadeEdit);
        // Retorna os dados da resposta
        return response.data;
      }
      else if(tipo === "UPA") {
        // Faz uma requisição PUT para atualizar os dados da unidade
        const response = await axios.put('http://localhost:8080/upas/update', unidadeEdit);
        // Retorna os dados da resposta
        return response.data;
      }
    } catch (error) {
      // Loga o erro no console em caso de falha
      console.error('Erro ao atualizar unidade:', error.response?.data || error.message);
      // Propaga o erro para ser tratado pelo chamador
      throw error;
    }
  },

  // Método para excluir uma unidade
  delete: async (telefone) => {
    try {
      // Faz uma requisição DELETE usando o telefone como identificador
      await axios.delete(`${API_URL}/delete/${telefone}`);
      // Não retorna dados, pois é uma exclusão
    } catch (error) {
      // Loga o erro no console em caso de falha
      console.error('Erro ao excluir unidade:', error);
      // Propaga o erro para ser tratado pelo chamador
      throw error;
    }
  },
};

// Exporta o serviço para uso em outros módulos
export default UnidadeService;