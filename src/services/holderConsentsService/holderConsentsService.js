import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios
import { consentData } from "src/mockData/consentData";

const clientName = process.env.CLIENT_NAME;
// Função para criar um consentimento do tipo payment
export async function holderLoginConsent(interactionId, data) {
  try {
    if (consentData) {
      return consentData;
    }
    const response = await api.post(
      `/api/${clientName}/consents/v1/interactions/${interactionId}/login`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

// Função para criar um consentimento do tipo automatic-payment
export async function holderApproveConsent(interactionId, data) {
  try {

    return { url: "http://localhost:8081"}
    const response = await api.post(
      `/api/${clientName}/consents/v1/interactions/${interactionId}/consent`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

// Função para criar um consentimento do tipo data
export async function holderCancelConsent(interactionId, data) {
  try {
    
    return { url: "http://localhost:8081"}
    const response = await api.post(
      `/api/${clientName}/consents/v1/interactions/${interactionId}/cancel`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}
