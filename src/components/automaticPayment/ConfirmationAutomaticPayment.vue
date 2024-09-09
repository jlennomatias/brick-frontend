<template>
  <div>
    <q-item-label class="confirmation-title text-title">
      Resumo da transação
    </q-item-label>
    <div v-if="error" id="error-message">Falha</div>
    <div class="content-box">
      <PaymentSchedule :confirmationData="consentData" />

      <div>
        <label>Data de vencimento do consentimento:</label>
        <span class="row justify-center">
          {{ applyDateFormat(consentData.consent.expirationDateTime) }}</span
        >
      </div>
      <div class="row justify-center">
        <label v-if="consentData.consent.recurringConfiguration?.automatic"
          >Valor à pagar:</label
        >
        <label v-if="consentData.consent.recurringConfiguration?.sweeping"
          >Valor total de transações:</label
        >
        <label v-if="consentData.consent.recurringConfiguration?.vrp"
          >Limite máximo para transação:</label
        >
      </div>
      <div class="row justify-center">
        <span class="payment-amount text-stronger-value">{{
          consentData.consent.recurringConfiguration?.sweeping
            ?.totalAllowedAmount ||
          consentData.consent.recurringConfiguration?.automatic?.amount ||
          consentData.consent.recurringConfiguration?.vrp?.transactionLimit
        }}</span>
      </div>
    </div>
    <q-item-label class="confirmation-title text-title">
      Dados do recebedor
    </q-item-label>
    <div
      v-for="(creditor, index) in consentData.consent.creditors"
      :key="index"
      class="content-box"
    >
      <div class="row justify-center">
        <label>Nome:</label>
        <span class="q-ml-sm">{{ applyCPFMask(creditor.name) }}</span>
      </div>
      <div class="row justify-center">
        <label>CPF/CNPJ:</label>
        <span class="q-ml-sm">{{ applyCPFMask(creditor.cpfCnpj) }}</span>
      </div>
    </div>
  </div>
</template>

<script src="./ConfirmationAutomaticPaymentScript.js"></script>

<style scoped>
.open-finance-message {
  margin-top: 16px;
  font-size: 14px;
}

.payment-amount {
  font-size: 24px;
}

.checkbox-inline {
  margin-right: 8px;
}

.logo-img {
  height: 24px;
  margin-left: 8px;
}

.confirmation-title {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
