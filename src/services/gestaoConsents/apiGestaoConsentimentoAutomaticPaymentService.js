import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para buscar dados de todos os consentimentos do tipo automatic-payment
export async function getConsentsAutomaticPayments(params) {
  try {
    const response = await api.get(`/api/management/consents/v1/consents/automatic-payment/transmitions`, params);
    return response.data;
  } catch (error) {
    console.error('Error get consents automatic-payments: ', error);
    throw error; // Re-throw para que o erro possa ser tratado onde a função é chamada
  }
}

// Função para buscar um consentimento por id
export async function getConsentsAutomaticPaymentId(id, params) {
  try {
    const response = await api.get(`/api/management/consents/v1/consents/automatic-payment/transmitions/${id}`, params);
    return response.data;
  } catch (error) {
    console.error("Error get consent automatic-payment: ", error);
    throw error;
  }
}

// Função para atualizar um recurso existente
export async function updateConsentAutomaticPayment(id, data) {
  try {
    const response = await api.patch(`/api/management/consents/v1/consents/automatic-payment/transmitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating consent automatic-payment:", error);
    throw error;
  }
}

// Função para excluir um recurso
export async function deleteConsentAutomaticPayment(id) {
  try {
    const response = await api.delete(`/api/management/consents/v1/consents/automatic-payment/transmitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error revoke consent automatic-payment:", error);
    throw error;
  }
}
