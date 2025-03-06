import axios from "axios";

const API_URL = "http://localhost:8080";

const apiService = {
  // VACINA
  getVacinas: (page = 0, size = 10) => axios.get(`${API_URL}/vacina/findall?page=${page}&size=${size}`),
  getVacinaById: (id) => axios.get(`${API_URL}/vacina/findById/${id}`),
  getVacinasByDoenca: (doenca, page = 0, size = 10) => 
    axios.get(`${API_URL}/vacina/findByDoenca/${doenca}?page=${page}&size=${size}`),
  getVacinasByDataVencimento: (data, page = 0, size = 10) => 
    axios.get(`${API_URL}/vacina/findByDataVencimento/${data}?page=${page}&size=${size}`),
  createVacina: (data) => axios.post(`${API_URL}/vacina/save`, data),
  updateVacina: (id, data) => axios.put(`${API_URL}/vacina/update/${id}`, data),
  deleteVacina: (id) => axios.delete(`${API_URL}/vacina/delete/${id}`),

  // LOTE
  getLotes: (page = 0, size = 10) => axios.get(`${API_URL}/lote/findall?page=${page}&size=${size}`),
  getLoteById: (id) => axios.get(`${API_URL}/lote/findById/${id}`),
  createLote: (data) => axios.post(`${API_URL}/lote/save`, data),
  updateLote: (id, data) => axios.put(`${API_URL}/lote/update/${id}`, data),
  deleteLote: (id) => axios.delete(`${API_URL}/lote/delete/${id}`),

  // CARTEIRA VACINA
  getCarteiraByPacienteId: (idPaciente, page = 0, size = 10) => 
    axios.get(`${API_URL}/carteira/findByIdPaciente/${idPaciente}?page=${page}&size=${size}`),
  createCarteira: (data) => axios.post(`${API_URL}/carteira/save`, data),
};

export default apiService;
