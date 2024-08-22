<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="info-container">
        <div class="info-icon">
          <q-icon name="info" color="primary" size="24px" />
        </div>
        <div class="info-message">
          Para que possamos concluir o pagamento, iremos lhe redirecionar para a
          instituição <span class="stronger-1">Finansystech</span>
        </div>
      </div>

      <q-form @submit.prevent="approve">
        <div>
          <ConfirmationPayment
            v-if="kind === 'payment'"
            :confirmationData="consentData"
          />
          <ConfirmationAutomaticPayment
            v-if="kind === 'AUTOMATIC_PAYMENT'"
            :confirmationData="consentData"
          />
          <ConfirmationData
            v-if="kind === 'data'"
            :confirmationData="consentData"
          />
          <q-btn
            label="Confirmar"
            color="primary"
            class="login-button"
            @click="approve"
          >
            <q-spinner v-if="loading" color="white" />
          </q-btn>

          <q-btn
            label="Cancelar"
            color="negative"
            flat
            class="login-button"
            @click="cancel"
          >
            <q-spinner v-if="loading" color="white" />
          </q-btn>
        </div>
      </q-form>
    </div>

    <RedirectModal v-if="showModal" />
  </q-page>
</template>

<script>
import ConfirmationPayment from "src/components/payment/ConfirmationPayment.vue";
import ConfirmationAutomaticPayment from "src/components/automaticPayment/ConfirmationAutomaticPayment.vue";
import ConfirmationData from "src/components/data/ConfirmationData.vue";
import RedirectModal from "src/components/RedirectModal.vue";
import { useCommonFunctions } from "src/composables/useCommonFunctions";
import { useLoginStore } from "src/stores/loginStore";

export default {
  components: {
    RedirectModal,
    ConfirmationPayment,
    ConfirmationAutomaticPayment,
    ConfirmationData,
  },

  setup() {
    const { cancel: cancelComposable, getDeviceInfo } = useCommonFunctions();

    const loginStore = useLoginStore();
    const loginData = loginStore.loginData;
    const kind =
      loginData.consentData?.consent?.kind || loginData.consentData?.kind;

    const consentData = loginData.consentData;

    const showModal = false;

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

    return {
      kind,
      consentData,
      showModal,
      approve,
      cancel,
      getDeviceInfo,
    };
  },
};
</script>

<style scoped>
.info-container {
  background-color: rgb(116, 175, 248);
  margin: 16px;
  padding: 8px;
  border-radius: 5px;
  color: black;
  display: flex;
  box-shadow: 0px 1px 0px 0px rgba(193, 217, 247, 0.48);
}

.info-icon {
  margin-right: 12px;
}

.stronger-1 {
  font-weight: bold;
  color: #003b80;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-button {
  width: 100%;
  margin-top: 15px;
  font-size: 18px;
  padding: 12px;
}
</style>
