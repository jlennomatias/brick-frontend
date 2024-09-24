import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para buscar dados de todos os consentimentos do tipo payment
export async function getConsentsPayments(params) {
  try {
    const response = await api.get(
      `/api/management/consents/v1/consents/payment/transmitions`,
      params,
    );
    return response.data;
  } catch (error) {
    console.error("Error get consents payments: ", error);
    throw error; // Re-throw para que o erro possa ser tratado onde a função é chamada
  }
}

// Função para buscar um consentimento por id
export async function getConsentsPaymentId(id, params) {
  try {
    const response = await api.get(
      `/api/management/consents/v1/consents/payment/transmitions/${id}`,
      params,
    );
    return response.data;
  } catch (error) {
    console.error("Error get consent payment: ", error);
    throw error;
  }
}

// Função para atualizar um recurso existente
export async function updateConsentPayment(id, data) {
  try {
    const response = await api.patch(
      `/api/management/consents/v1/consents/payment/transmitions/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating consent payment:", error);
    throw error;
  }
}

// Função para excluir um recurso
export async function deleteConsentPayment(id) {
  try {
    const response = await api.delete(
      `/api/management/consents/v1/consents/payment/transmitions/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error revoke consent payment:", error);
    throw error;
  }
}
