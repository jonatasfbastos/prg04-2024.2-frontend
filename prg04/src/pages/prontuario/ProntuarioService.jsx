import axios from "axios";

export async function savePaciente(pacienteData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/paciente/save",
      pacienteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar paciente:", error);
    throw error;
  }
}

export async function getPacienteByCpf(cpf) {
  const response = await axios.get(
    `http://localhost:8080/paciente/find-by-cpf/${cpf}`
  );
  return response.data;
}

export async function getPacienteById(id) {
  try {
    const response = await axios.get(
      `http://localhost:8080/prontuario/find-by-paciente?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar termo por ID:", error);
    throw error;
  }
}

export async function saveProntuario(cpf) {
    try {
        const response = await axios.post(`http://localhost:8080/prontuario/save?cpf=${cpf}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao salvar paciente:", error);
        throw error;
    }
}

export async function saveAnamnese(anamneseData, prontuarioId) {
  try {
    const response = await axios.post(
      `http://localhost:8080/anamnese/save?prontuarioId=${prontuarioId}`,
      anamneseData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar a anamnese:', error);
    throw error;
  }
}

export async function saveDocumento(documentoData, prontuarioId) {
  try {
    const response = await axios.post(
      `http://localhost:8080/documento/save?prontuarioId=${prontuarioId}`,
      documentoData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar o documento:', error);
    throw error;
  }
}

export async function updatePaciente(pacienteData) {
  try {
    const response = await axios.put(
      "http://localhost:8080/paciente/update",
      pacienteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw error;
  }
}