import { ref, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import RedirectModal from "src/components/RedirectModal.vue";
import ConfirmationPayment from "src/components/payment/ConfirmationPayment.vue";
import ConfirmationAutomaticPayment from "src/components/automaticPayment/ConfirmationAutomaticPayment.vue";
import ConfirmationData from "src/components/data/ConfirmationData.vue";
import { useCommonFunctions } from "src/composables/useCommonFunctions";
import { holderLoginConsent } from "src/services/holderConsentsService/holderConsentsService";
import { authClientLogin } from "src/services/auth/authService";
import { useLoginStore } from "src/stores/loginStore";

export default {
  name: "LoginPage",
  components: {
    ConfirmationPayment,
    ConfirmationAutomaticPayment,
    ConfirmationData,
    RedirectModal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute(); // Para acessar os parâmetros da URL
    const loginStore = useLoginStore();

    // Composables
    const { showError, handleRequestError, cancel, getDeviceInfo } =
      useCommonFunctions();

    // Reactive state
    const cpfCnpj = ref("");
    const password = ref("");
    const showForm = ref(true);
    const showModal = ref(false);
    const showPassword = ref(false);
    const confirmationData = ref(null);
    const loginAttempts = ref(0);
    const maxLoginAttempts = 3;
    const loading = ref(false);

    const deviceInfo = reactive({
      platform: "",
      osVersion: "",
      os: "",
    });

    // Capturar os parâmetros da URL
    const paramsLogin = route.query || "";

    // Watchers
    watch(cpfCnpj, (newValue) => {
      cpfCnpj.value = formatCpfCnpj(newValue);
    });

    // Methods
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const formatCpfCnpj = (value) => {
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
    };

    const login = async () => {
      if (cpfCnpj.value === "" || password.value === "") {
        showError("Preencha todos os campos");
        return;
      }

      const cpfCnpjLength = cpfCnpj.value.replace(/\D/g, "").length;
      if (cpfCnpjLength !== 11 && cpfCnpjLength !== 14) {
        showError("O CPF deve ter 11 dígitos ou o CNPJ deve ter 14 dígitos");
        return;
      }

      if (loginAttempts.value < maxLoginAttempts) {
        loading.value = true;
        loginAttempts.value++;

        try {
          const document = await authClientLogin({ cpfCnpj, password });
          const body = {
            accessToken: btoa(document.cpfCnpj),
            device: getDeviceInfo(),
          };

          const loginData = await holderLoginConsent(
            paramsLogin.interactionId,
            body,
          );

          loginStore.setLoginData(loginData); // Armazene os dados no Pinia
          goToConfirmation();
        } catch (error) {
          handleRequestError(error);
        } finally {
          loading.value = false;
        }
      } else {
        showError(
          "Você excedeu o número máximo de tentativas. Por favor, tente novamente mais tarde.",
        );
        cancelConsent();
      }
    };

    const goToConfirmation = () => {
      router.push("/confirmation");
    };

    return {
      cpfCnpj,
      password,
      showForm,
      showModal,
      showPassword,
      confirmationData,
      loginAttempts,
      loading,
      deviceInfo,
      togglePasswordVisibility,
      formatCpfCnpj,
      login,
      goToConfirmation,
      showError,
      handleRequestError,
      cancel,
      getDeviceInfo,
    };
  },
};
