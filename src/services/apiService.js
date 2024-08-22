import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para logar o usuario
export async function login(data) {
  try {
    const response = await api.post("/resource", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching resource:", error);
    throw error; // Re-throw para que o erro possa ser tratado onde a função é chamada
  }
}

// Função para buscar dados de todos os consentimentos do tipo payment
export async function getResource(params) {
  try {
    const response = await api.get(`/resource`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error; // Re-throw para que o erro possa ser tratado onde a função é chamada
  }
}

// Função para atualizar um recurso existente
export async function updateResource(id, data) {
  try {
    const response = await api.put(`/resource/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}

// Função para excluir um recurso
export async function deleteResource(id) {
  try {
    const response = await api.delete(`/resource/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}
