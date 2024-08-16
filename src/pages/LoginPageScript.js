import RedirectModal from "../components/RedirectModal.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ConfirmationPayment from "src/components/ConfirmationPayment.vue";
import ConfirmationAutomaticPayment from "src/components/ConfirmationAutomaticPayment.vue";
import ConfirmationData from "src/components/ConfirmationData.vue";

export default {
  name: "LoginPage",
  components: {
    ConfirmationPayment,
    ConfirmationAutomaticPayment,
    ConfirmationData,
    RedirectModal,
  },
  data() {
    return {
      cpfCnpj: "",
      password: "",
      errorMessage: "",
      showForm: true,
      showModal: false,
      showPassword: false,
      confirmationData: null,
      loginAttempts: 0,
      maxLoginAttempts: 3,
      deviceInfo: {
        platform: "",
        osVersion: "",
        os: "",
      },
      loading: false,
    };
  },
  watch: {
    cpfCnpj(newValue) {
      this.cpfCnpj = this.formatCpfCnpj(newValue);
    },
  },
  setup() {
    const router = useRouter();

    const goToConfirmation = () => {
      router.push("/confirmation");
    }

    return {
      goToConfirmation,
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    formatCpfCnpj(value) {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 11) {
        return cleanedValue.replace(
          /(\d{3})(\d{3})?(\d{3})?(\d{1,2})?/,
          (match, g1, g2, g3, g4) => {
            return (
              [g1, g2, g3].filter(Boolean).join(".") + (g4 ? "-" + g4 : "")
            );
          },
        );
      } else {
        return cleanedValue.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          (match, g1, g2, g3, g4, g5) => {
            return `${g1}.${g2}.${g3}/${g4}-${g5}`;
          },
        );
      }
    },

    getDeviceInfo() {
      const platform = navigator.platform;
      let os = "Unknown OS";
      let osVersion = "Unknown Version";

      if (navigator.userAgent.indexOf("Win") !== -1) {
        os = "Windows";
        osVersion = navigator.userAgent.match(/Windows NT (\d+\.\d+)/)[1];
      } else if (navigator.userAgent.indexOf("Mac") !== -1) {
        os = "MacOS";
        osVersion = navigator.userAgent
          .match(/Mac OS X (\d+[_\.]\d+)/)[1]
          .replace("_", ".");
      } else if (navigator.userAgent.indexOf("Linux") !== -1) {
        os = "Linux";
        osVersion = navigator.userAgent.match(/Linux (\d+\.\d+)/)
          ? navigator.userAgent.match(/Linux (\d+\.\d+)/)[1]
          : "Unknown Version";
      } else if (navigator.userAgent.indexOf("Android") !== -1) {
        os = "Android";
        osVersion = navigator.userAgent.match(/Android (\d+\.\d+)/)[1];
      } else if (navigator.userAgent.indexOf("like Mac") !== -1) {
        os = "iOS";
        osVersion = navigator.userAgent
          .match(/CPU OS (\d+[_\.]\d+)/)[1]
          .replace("_", ".");
      }

      this.deviceInfo = {
        platform: platform,
        osVersion: osVersion,
        os: os,
      };
    },

    async login() {
      this.clearError();
      if (this.cpfCnpj === "" || this.password === "") {
        this.showError("Preencha todos os campos");
        return;
      }

      // Verificar comprimento do CPF/CNPJ
      const cpfCnpjLength = this.cpfCnpj.replace(/\D/g, "").length; // Remove caracteres não numéricos
      if (cpfCnpjLength !== 11 && cpfCnpjLength !== 14) {
        this.showError(
          "O CPF deve ter 11 dígitos ou o CNPJ deve ter 14 dígitos",
        );
        return;
      }

      if (this.loginAttempts < this.maxLoginAttempts) {
        this.loading = true;
        this.loginAttempts++;

        try {
          this.goToConfirmation(); // Redireciona para a página de confirmação após login
        } catch (error) {
          this.handleRequestError(error);
        } finally {
          this.loading = false;
        }

      } else {
        this.showError(
          "Você excedeu o número máximo de tentativas. Por favor, tente novamente mais tarde.",
        );
        this.cancelConsent();
      }
    },

    clearError() {
      this.errorMessage = "";
    },

    showError(message) {
      this.errorMessage = message;
    },

    handleRequestError(error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          this.showError("Credenciais inválidas.");
        } else if (status === 429) {
          this.showError(
            "Você excedeu o número máximo de tentativas. Por favor, tente novamente mais tarde.",
          );
        } else if (status >= 500) {
          this.showError("Erro no servidor. Tente novamente mais tarde.");
        } else {
          this.showError("Erro na requisição. Tente novamente mais tarde.");
        }
      } else {
        this.showError("Erro na requisição. Tente novamente mais tarde.");
      }
      this.loading = false;
    },

    cancel() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.getDeviceInfo();
  },
};
