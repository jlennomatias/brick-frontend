<template>
  <div class="consent-details q-pa-md">
    <q-spinner v-if="loading" color="primary" />
    <div v-else>
      <p v-if="errorMessage" class="q-mb-md text-negative">{{ errorMessage }}</p>
      <div v-else>
        <div v-for="(item, index) in consent" :key="index" class="q-mb-md q-pa-sm bg-grey-2 q-rounded q-shadow-2 row items-center">
          <div class="col">
            <div class="q-mb-sm">
              <label class="text-bold">Creditor: </label> {{ item.creditor.name }}
            </div>
            <div class="q-mb-sm">
              <label class="text-bold">Date: </label> {{ item.payment.date }}
            </div>
            <div class="q-mb-sm">
              <label class="text-bold">Amount: R$ </label>
              {{ parseFloat(item.payment.amount).toFixed(2) }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn @click="revokeConsent(item.id)" color="negative" label="Revogar" size="small" class="q-mb-sm" />
            <q-btn @click="alterConsent(item.id)" color="primary" label="Alterar" size="small" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getConsentsPayments, deleteConsentPayment, updateConsentPayment } from "src/services/gestaoConsents/apiGestaoConsentimentoPaymentService.js";

export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    loading: Boolean,
  },
  setup(props, { emit }) {
    const consent = ref([]);
    const loading = ref(props.loading);
    const errorMessage = ref("");

    const fetchData = async () => {
      if (props.type) {
        emit("update:loading", true);
        try {
          consent.value = await getConsentsPayments();
          errorMessage.value = ""; // Clear error message on successful fetch
        } catch (error) {
          console.error("Erro ao carregar dados:", error.code);
          if (error.code === "ERR_NETWORK") {
            errorMessage.value =
              "Não foi possível carregar os dados. Tente novamente mais tarde.";
          } else {
            errorMessage.value = "Não localizado ";
          }
        } finally {
          emit("update:loading", false);
        }
      }
    };

    const revokeConsent = async (consentId) => {
      try {
        await deleteConsentPayment(consentId); // Assumindo que essa função revoga o consentimento
        await fetchData(); // Recarregar os dados após revogação
      } catch (error) {
        console.error("Erro ao revogar consentimento:", error);
        errorMessage.value = "Erro ao revogar o consentimento. Tente novamente.";
      }
    };

    const alterConsent = async (consentId) => {
      try {
        // Lógica para alterar o consentimento (por exemplo, abrir um modal)
        await updateConsentPayment();
        console.log("Alterar consentimento com ID:", consentId);
      } catch (error) {
        console.error("Erro ao alterar consentimento:", error);
        errorMessage.value = "Erro ao alterar o consentimento. Tente novamente.";
      }
    };

    onMounted(() => {
      fetchData();
    });

    watch(
      () => props.loading,
      (newVal) => {
        loading.value = newVal;
      }
    );

    return {
      consent,
      errorMessage,
      revokeConsent,
      alterConsent,
    };
  },
};
</script>

<style scoped>
.consent-details {
  border: 1px solid #003b80;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.error-message {
  font-weight: bold;
}

.payment-info,
.account-info {
  margin-top: 8px;
}
</style>
