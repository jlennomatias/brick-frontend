import { ref } from "vue";
import RedirectModal from "src/components/RedirectModal.vue";
import PaymentSchedule from "src/components/payment/PaymentSchedule.vue";
import { useCommonFunctions } from "src/composables/useCommonFunctions";
import { useLoginStore } from "src/stores/loginStore";

export default {
  name: "ConfirmationPayment",
  components: {
    RedirectModal,
    PaymentSchedule,
  },
  setup() {
    const { applyCPFMask } = useCommonFunctions();

    const loginStore = useLoginStore();
    const loginData = loginStore.loginData;
    const error = ref(false);
    const consentData = loginData.consentData;

    return {
      error,
      consentData,
      applyCPFMask,
    };
  },
};
