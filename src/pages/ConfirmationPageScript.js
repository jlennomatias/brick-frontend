import RedirectModal from "../components/RedirectModal.vue";
import ConfirmationPayment from "../components/ConfirmationPayment.vue";

export default {
  name: "ConfirmationPage",
  components: {
    RedirectModal,
    ConfirmationPayment,
  },
  data() {
    return {
      error: false,
      selectedAccount: 0,
      showModal: false,
      consentData: {
        interactionId: "rQOj9LwWKVi6tTkptjFr2",
        consent: {
          creditor: {
            personType: "PESSOA_NATURAL",
            cpfCnpj: "12345678909",
            name: "Joao Silva",
          },
          payment: {
            amount: "200.00",
            details: {
              proxy: "apix@finansystech.com",
            },
            // date: "2024-07-30T13:21:50.731Z",
            schedule: {
              // single: {
              //   date: "2024-12-23"
              // },
              // daily: {
              //   startDate: "2024-08-23",
              //   quantity: 3
              // },
              // weekly: {
              //   dayOfWeek: "QUINTA_FEIRA",
              //   startDate: "2024-08-23",
              //   quantity: 3
              // },
              // monthly: {
              //   dayOfMonth: 3,
              //   startDate: "2024-08-23",
              //   quantity: 3
              // },
              custom: {
                dates: ["2023-08-23", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26"],
                additionalInformation: "Todas quintas e domingos por 6 meses",
              },
            },
            type: "PIX",
          },
          organizationName: "Finansystech",
          organizationLogo: "https://assets.finansystech.com/logo.png",
        },
      },
      contas: [
        {
          branchCode: "1234",
          accountType: "CONTA_CORRENTE",
          accountNumber: "5678",
          checkDigit: "9",
          balance: 1200.5,
        },
        {
          branchCode: "9876",
          accountType: "CONTA_POUPANCA",
          accountNumber: "5432",
          checkDigit: "1",
          balance: 2500.75,
        },
      ],
    };
  },
  methods: {
    applyCPFMask(cpfCnpj) {
      // Aplica a máscara de CPF ou CNPJ
      if (cpfCnpj.length === 11) {
        return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (cpfCnpj.length === 14) {
        return cpfCnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5",
        );
      }
      return cpfCnpj;
    },

    getAccountTypeLabel(accountType) {
      const accountTypes = {
        CONTA_CORRENTE: { label: "Conta Corrente", sigla: "CC" },
        CONTA_POUPANCA: { label: "Conta Poupança", sigla: "CP" },
        // Outros tipos de conta...
      };
      return (
        accountTypes[accountType] || { label: "Tipo desconhecido", sigla: "" }
      );
    },
    approve() {
      // Lógica para aprovar o consentimento de pagamento
      this.showModal = true
      setTimeout(function (){
        window.location.href = 'https://www.finansystech.com.br/'
      }, 2500)
    },
    cancel() {
      this.showModal = true
      setTimeout(function (){
        window.location.href = 'https://www.finansystech.com.br/'
      }, 2500)
    },
  },
};
