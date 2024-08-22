import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para buscar dados de todos os consentimentos do tipo data
export async function getConsentsData(params) {
  try {
    const response = await api.get(`/api/management/consents/v1/consents/data/transmitions`, params);
    return response.data;
  } catch (error) {
    console.error('Error get consents data: ', error);
    throw error; // Re-throw para que o erro possa ser tratado onde a função é chamada
  }
}

// Função para buscar um consentimento por id
export async function getConsentsDataId(id, params) {
  try {
    const response = await api.get(`/api/management/consents/v1/consents/data/transmitions/${id}`, params);
    return response.data;
  } catch (error) {
    console.error("Error get consent data: ", error);
    throw error;
  }
}

// Função para atualizar um recurso existente
export async function updateConsentData(id, data) {
  try {
    const response = await api.patch(`/api/management/consents/v1/consents/data/transmitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating consent data:", error);
    throw error;
  }
}

// Função para excluir um recurso
export async function deleteConsentData(id) {
  try {
    const response = await api.delete(`/api/management/consents/v1/consents/data/transmitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error revoke consent data:", error);
    throw error;
  }
}
