import axios from 'axios';

export async function getTermosConsentimento(page = 1, size = 5) {
    const response = await axios.get(`http://localhost:8080/termo-consentimento/find-all?page=${page}&size=${size}`);
    return response.data;
}

export async function getTermosConsentimentoByCpf(cpf, page = 1, size = 5) {
    const response = await axios.get(`http://localhost:8080/termo-consentimento/find-by-paciente?cpf-paciente=${cpf}&page=${page - 1}&size=${size}`);
    return response.data;
}

export async function createTermoConsentimento(termoData) {
    try {
        const response = await axios.post('http://localhost:8080/termo-consentimento/create', termoData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar o termo de consentimento:', error);
        throw error;
    }
}

export async function getTermoConsentimentoById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/termo-consentimento/find-by-id?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar termo por ID:', error);
        throw error;
    }
}

export async function deleteTermoConsentimento(id) {
    try {
        await axios.delete(`http://localhost:8080/termo-consentimento/delete?id=${id}`);
    } catch (error) {
        console.error('Erro ao excluir termo de consentimento:', error);
        throw error;
    }
}