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
      getDeviceInfo,
      applyCPFMask,
    } = useCommonFunctions();

    const loginStore = useLoginStore();
    const loginData = loginStore.loginData;
    const error = ref(false);
    const selectedAccount = ref(0);
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

    const applyDateFormat = (date) => {
      return date.split("T")[0];
    };

    return {
      error,
      selectedAccount,
      consentData,
      contas,
      applyDateFormat,
      applyCPFMask,
      getAccountTypeLabel,
      getDeviceInfo,
    };
  },
};
