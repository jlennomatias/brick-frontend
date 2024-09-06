import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para logar o cliente no backend
export async function authClientLogin(data) {
  try {
    return { document: "12345678909", acessToken: "1234" };

    const response = await api.post("/api/auth", data);
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

