<template>
  <div>
    <q-item-label class="confirmation-title text-title">
      Resumo da transação
    </q-item-label>
    <div v-if="error" id="error-message">Falha</div>
    <div class="content-box">
      <PaymentSchedule :confirmationData="consentData" />

      <div>
        <label>Valor a pagar:</label>
        <span class="row justify-center text-stronger-value payment-amount"
          >R$ {{ consentData.consent.payment.amount.replace(".", ",") }}</span
        >
      </div>
    </div>
    <q-item-label class="confirmation-title text-title">
      Dados do recebedor
    </q-item-label>
    <div class="content-box">
      <div class="row justify-center">
        <label>CPF:</label>
        <span class="q-ml-sm"
          >CPF {{ applyCPFMask(consentData.consent.creditor.cpfCnpj) }}</span
        >
      </div>
      <div>
        <label>Nome:</label>
        <span class="q-ml-sm">{{ consentData.consent.creditor.name }}</span>
      </div>
      <div>
        <label>Chave PIX:</label>
        <span class="q-ml-sm">{{
          consentData.consent.payment.details.proxy
        }}</span>
      </div>
    </div>
  </div>
</template>

<script src="./ConfirmationPaymentScript.js"></script>

<style lang="scss">

.payment-amount {
  font-size: 24px;
}

.checkbox-inline {
  margin-right: 8px;
}

.confirmation-title {
  font-size: 24px;
  margin-bottom: 16px;
}
</style>
