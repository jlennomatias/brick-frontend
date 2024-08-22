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
          {{ applyDateFormat(consentData.expirationDateTime) }}</span
        >
      </div>
      <div class="row justify-center">
        <label v-if="consentData.recurringConfiguration?.automatic"
          >Valor à pagar:</label
        >
        <label v-if="consentData.recurringConfiguration?.sweeping"
          >Valor total de transações:</label
        >
        <label v-if="consentData.recurringConfiguration?.vrp"
          >Limite máximo para transação:</label
        >
      </div>
      <div class="row justify-center">
        <span class="payment-amount">{{
          consentData.recurringConfiguration?.sweeping?.totalAllowedAmount ||
          consentData.recurringConfiguration?.automatic?.amount ||
          consentData.recurringConfiguration?.vrp?.transactionLimit
        }}</span>
      </div>
    </div>
    <q-item-label class="confirmation-title text-title">
      Dados do recebedor
    </q-item-label>
    <div
      v-for="(creditor, index) in consentData.creditors"
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
    <q-item-label class="confirmation-title text-title">
      Fonte de pagamento
    </q-item-label>
    <div v-for="(conta, index) in contas" :key="index" class="content-box">
      <div class="row justify-center">
        <q-radio
          :id="index"
          class="checkbox-inline confirmation-radio"
          v-model="selectedAccount"
          :val="index"
          size="24px"
        />
        <label class="" :for="index">{{
          `Ag ${conta.branchCode} |
                ${getAccountTypeLabel(conta.accountType).sigla}
                ${conta.accountNumber}-${conta.checkDigit}`
        }}</label>
      </div>
      <label class="row justify-center"
        >Saldo em conta: R$ {{ conta.balance.toFixed(2) }}</label
      >
    </div>
    <q-item-label class="confirmation-title text-title">
      Forma de pagamento
    </q-item-label>
    <div class="open-finance-message">
      <p>
        Para concluir o pagamento, lhe redirecionaremos devolta para a
        instituição
        <span class="stronger-1"
          >{{ consentData.organizationName }}
          <img :src="consentData.organizationLogo" alt="Logo" class="logo-img"
        /></span>
      </p>
    </div>
  </div>
</template>

<script src="./ConfirmationAutomaticPaymentScript.js"></script>

<style scoped>
.stronger-1 {
  font-weight: bold;
  color: #003b80;
}

.content-box {
  border: 1px solid #003b80;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 12px;
}

.open-finance-message {
  margin-top: 16px;
  font-size: 14px;
}

.payment-amount {
  color: #003b80;
  font-weight: bold;
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
