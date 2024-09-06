<template>
  <q-page class="login-page">
    <div class="login-container">
      <q-item-label class="login-title text-title">
        Minhas Autorizações
      </q-item-label>

      <q-list>
        <q-expansion-item
          label="Transferências Inteligentes"
          icon="money"
          v-model="expandedItems.smartTransfersData"
          @before-show="setData('smartTransfersData')"
        >
          <template v-if="expandedItems.smartTransfersData">
            <AutomaticPaymentConsentDetails
              type="smartTransfersData"
              :loading="isLoading.smartTransfersData"
              @loading="handleLoading('smartTransfersData')"
            />
          </template>
        </q-expansion-item>

        <q-expansion-item
          label="Pagamento Recorrente"
          icon="repeat"
          v-model="expandedItems.recurringPaymentData"
          @before-show="setData('recurringPaymentData')"
        >
          <template v-if="expandedItems.recurringPaymentData">
            <PaymentConsentDetails
              type="recurringPaymentData"
              :loading="isLoading.recurringPaymentData"
              @loading="handleLoading('recurringPaymentData')"
            />
          </template>
        </q-expansion-item>

        <q-expansion-item
          label="Compartilhamento de Dados"
          icon="share"
          v-model="expandedItems.dataSharingData"
          @before-show="setData('dataSharingData')"
        >
          <template v-if="expandedItems.dataSharingData">
            <DataConsentDetails
              type="dataSharingData"
              :loading="isLoading.dataSharingData"
              @loading="handleLoading('dataSharingData')"
            />
          </template>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import AutomaticPaymentConsentDetails from "src/components/consentManager/AutomaticPaymentConsentDetails.vue";
import PaymentConsentDetails from "src/components/consentManager/PaymentConsentDetails.vue";
import DataConsentDetails from "src/components/consentManager/DataConsentDetails.vue";

export default {
  components: {
    AutomaticPaymentConsentDetails,
    PaymentConsentDetails,
    DataConsentDetails,
  },
  setup() {
    const expandedItems = ref({
      smartTransfersData: false,
      recurringPaymentData: false,
      dataSharingData: false,
    });

    const isLoading = ref({
      smartTransfersData: false,
      recurringPaymentData: false,
      dataSharingData: false,
    });

    const setData = (item) => {
      if (!expandedItems.value[item]) {
        isLoading.value[item] = true;
      }
    };

    const handleLoading = (item) => {
      isLoading.value[item] = false;
    };

    return {
      expandedItems,
      isLoading,
      setData,
      handleLoading,
    };
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 600px;
}

.login-title {
  font-size: 28px;
  margin-bottom: 30px;
}
</style>
