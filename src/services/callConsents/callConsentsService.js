import { api } from "src/boot/axios"; // Importe a instância personalizada do Axios

// Função para criar um consentimento do tipo payment
export async function callConsentPayments(data) {
  try {
    const body = {
      specVersion: "v4",
      brandId: data.brandId,
      data: {
        loggedUser: {
          document: {
            identification: data.UserIdentification,
            rel: "CPF",
          },
        },
        ...(data.businessIdentification && {
          businessEntity: {
            document: {
              identification: data.businessIdentification,
              rel: "CNPJ",
            },
          },
        }),
        creditor: {
          personType: data.personType,
          cpfCnpj: data.cpfCnpj,
          name: data.name,
        },
        payment: {
          type: "PIX",
          date: data.date,
          schedule: data.schedule,
          currency: "BRL",
          amount: data.amount,
          details: {
            localInstrument: data.localInstrument,
            proxy: data.proxy,
            creditorAccount: data.creditorAccount,
          },
          ibgeTownCode: data.ibgeTownCode || '3550308',
        },
      },
    };
    const response = await api.post(
      "/api/admin/payment-initiation/v1/consents",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

// Função para criar um consentimento do tipo automatic-payment
export async function callConsentAutomaticPayments(data) {
  try {
    const response = await api.post(
      "/api/admin/automatic-payment-initiation/v1/consents",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}

// Função para criar um consentimento do tipo data
export async function callConsentData(data) {
  try {
    const response = await api.post(
      "/api/admin/data-reception/v1/consents",
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
}
