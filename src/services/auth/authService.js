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

// Função para verificar a validade do token
export async function checkAuthToken() {

  const token = localStorage.getItem("authToken");
  console.log('checando o token: ', token);

  if (!token) {
    return false;
  }

  try {
    const response = await api.get("/api/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.valid;
  } catch (error) {
    console.error("Error checking auth token:", error);
    return false;
  }
}
