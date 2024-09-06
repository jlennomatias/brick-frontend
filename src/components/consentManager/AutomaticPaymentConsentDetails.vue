<template>
  <div class="consent-details q-pa-md">
    <q-spinner v-if="loading" color="primary" />
    <div v-else>
      <p v-if="errorMessage" class="q-mb-md text-negative">{{ errorMessage }}</p>
      <div v-else class="consent-content">
        <div
          v-for="(item, index) in consent"
          :key="index"
          class="content-box q-pa-xs bg-grey-2 q-rounded q-shadow-2 row items-start"
        >
          <div class="col margin-box">
            <div class="row">
              <label class="text-bold small-text">Nome:</label>
              <span class="small-text">{{ item.creditor.name }}</span>
            </div>
            <div class="row">
              <label class="text-bold small-text">Date:</label>
              <span class="small-text">{{ item.payment.date }}</span>
            </div>
            <div class="row amount-row">
              <label class="text-bold amount-text">Amount: R$</label>
              <span class="amount-text">{{ parseFloat(item.payment.amount).toFixed(2) }}</span>
            </div>
          </div>
          <div class="col-auto self-center margin-box button-group ">
            <q-btn
              @click="alterConsent(item.id)"
              color="primary"
              icon="edit"
              size="xs"
              flat
              dense
            />
            <q-btn
              @click="revokeConsent(item.id)"
              color="negative"
              icon="delete"
              size="xs"
              flat
              dense
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import {
  getConsentsPayments,
  deleteConsentPayment,
  updateConsentPayment,
} from "src/services/gestaoConsents/apiGestaoConsentimentoPaymentService.js";

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
        errorMessage.value =
          "Erro ao revogar o consentimento. Tente novamente.";
      }
    };

    const alterConsent = async (consentId) => {
      try {
        // Lógica para alterar o consentimento (por exemplo, abrir um modal)
        await updateConsentPayment();
        console.log("Alterar consentimento com ID:", consentId);
      } catch (error) {
        console.error("Erro ao alterar consentimento:", error);
        errorMessage.value =
          "Erro ao alterar o consentimento. Tente novamente.";
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
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.consent-content {
  max-height: 500px;
  overflow-y: auto;
}

.row.items-start {
  align-items: flex-start;
}

.small-text {
  font-size: 12px;
}

.amount-text {
  font-size: 14px;
  font-weight: bold;
  color: #003b80;
}

.q-pa-xs {
  padding: 8px;
}

.button-group {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.content-box {
  border: 1px solid #003b80;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 6px;
}

.margin-box {
  margin: 0 9px;
}
</style>
