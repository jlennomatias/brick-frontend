import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para criar um consentimento do tipo payment
export async function authClientLogin(data) {
  try {
    
    return { cpfCnpj: "12345678909" };

    const response = await api.post("/api/auth", data);
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}
