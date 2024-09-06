import ConfirmationPayment from "src/components/payment/ConfirmationPayment.vue";
import ConfirmationAutomaticPayment from "src/components/automaticPayment/ConfirmationAutomaticPayment.vue";
import ConfirmationData from "src/components/data/ConfirmationData.vue";
import RedirectModal from "src/components/RedirectModal.vue";
import {
  holderApproveConsent,
  holderCancelConsent,
} from "src/services/holderConsentsService/holderConsentsService";
import { useCommonFunctions } from "src/composables/useCommonFunctions";
import { useLoginStore } from "src/stores/loginStore";
import { useAuthStore } from "src/stores/authStore";
import { ref } from "vue";

export default {
  components: {
    RedirectModal,
    ConfirmationPayment,
    ConfirmationAutomaticPayment,
    ConfirmationData,
  },

  setup() {
    const { cancel: cancelComposable, getDeviceInfo } = useCommonFunctions();

    const showModal = ref(false);
    const loginStore = useLoginStore();
    const authStore = useAuthStore();
    const selectedAccount = ref(0);
    const loginData = loginStore.loginData;

    const contas = loginData.accountData;
    const consentData = loginData.consentData;

    const kind = consentData?.consent?.kind || consentData?.kind;
    const expirationDateTime =
      consentData?.consent?.expirationDateTime ||
      consentData?.expirationDateTime;
    const interactionId = consentData?.interactionId;

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

    const approve = async () => {
      showModal.value = true;
      const { issuer, number, accountType, ispb } =
        contas[selectedAccount.value];

      const body = {
        debtorAccount: {
          issuer: issuer,
          number: number,
          accountType: accountType,
          ispb: ispb,
        },
        device: getDeviceInfo(),
      };
      console.log("body:", body);
      const consentResponse = await holderApproveConsent(interactionId, body);

      loginStore.clearLoginData();
      authStore.clearAuthToken();
      setTimeout(() => {
        window.location.href = consentResponse.url;
      }, 2500);
    };

    const cancel = () => {
      showModal.value = true;
      getDeviceInfo();
      cancelComposable(consentResponse.url);
    };

    return {
      kind,
      consentData,
      contas,
      selectedAccount,
      showModal,
      getAccountTypeLabel,
      approve,
      cancel,
      getDeviceInfo,
    };
  },
};
