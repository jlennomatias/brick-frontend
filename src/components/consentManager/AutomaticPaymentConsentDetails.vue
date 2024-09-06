<template>
  <div class="consent-details">
    <q-spinner v-if="loading" color="primary" />
    <div v-else>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div v-else>
        <div v-for="(item, index) in consent" :key="index" class="payment-info">
          <div class="creditor-info">
            <label class="lh-12">Creditor: </label> {{ item.creditor.name }}
          </div>
          <div class="date-info">
            <label class="lh-12">Date: </label> {{ item.payment.date }}
          </div>
          <div class="amount-info">
            <label class="lh-12">Amount: R$ </label>
            {{ parseFloat(item.payment.amount).toFixed(2) }}
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getConsentsPayments } from "src/services/gestaoConsents/apiGestaoConsentimentoPaymentService.js";

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

    onMounted(() => {
      fetchData();
    });

    watch(
      () => props.loading,
      (newVal) => {
        loading.value = newVal;
      },
    );

    return {
      consent,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.consent-details {
  border: 1px solid #003b80;
  border-radius: 8px;
  padding: 12px;
  background-color: #f9f9f9;
}

.error-message {
  font-weight: bold;
  margin-bottom: 12px;
}

.payment-info,
.account-info {
  margin-top: 8px;
}
</style>
