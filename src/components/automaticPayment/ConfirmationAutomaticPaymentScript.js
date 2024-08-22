import { ref } from "vue";
import RedirectModal from "src/components/RedirectModal.vue";
import { useCommonFunctions } from "src/composables/useCommonFunctions";
import { useLoginStore } from "src/stores/loginStore";

export default {
  name: "ConfirmationAutomaticPayment",
  components: {
    RedirectModal,
  },
  setup() {
    const {
      cancel: cancelComposable,
      getDeviceInfo,
      applyCPFMask,
    } = useCommonFunctions();

    const loginStore = useLoginStore();
    const loginData = loginStore.loginData;
    const error = ref(false);
    const selectedAccount = ref(0);
    const showModal = ref(false);
    const consentData = loginData.consentData;
    const contas = loginData.accountData;

    const getAccountTypeLabel = (accountType) => {
      const accountTypes = {
        CONTA_CORRENTE: { label: "Conta Corrente", sigla: "CC" },
        CONTA_POUPANCA: { label: "Conta Poupança", sigla: "CP" },
        // Outros tipos de conta...
      };
      return (
        accountTypes[accountType] || { label: "Tipo desconhecido", sigla: "" }
      );
    };

    const approve = () => {
      showModal.value = true;
      getDeviceInfo();
      setTimeout(() => {
        window.location.href = "https://www.finansystech.com.br/";
      }, 2500);
    };

    const cancel = () => {
      showModal.value = true;
      getDeviceInfo();
      cancelComposable();
    };

    const applyDateFormat = (date) => {
      return date.split("T")[0];
    };

    return {
      error,
      selectedAccount,
      showModal,
      consentData,
      contas,
      applyDateFormat,
      applyCPFMask,
      getAccountTypeLabel,
      approve,
      cancel,
      getDeviceInfo,
    };
  },
};
