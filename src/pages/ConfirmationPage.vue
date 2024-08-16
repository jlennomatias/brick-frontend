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
          <q-item-label class="confirmation-title text-title">
            Resumo da transação
          </q-item-label>
          <div v-if="error" id="error-message">Falha</div>
          <div class="content-box">
            <ConfirmationPayment :confirmationData="consentData" />
            <!-- <div v-if="consentData.consent.payment?.date">
              <label>Data de Pagamento:</label>
              <span class="space-left">{{
                applyDateFormat(consentData.consent.payment.date)
              }}</span>
            </div> -->

            <div>
              <label>Valor a pagar:</label>
              <span class="row justify-center payment-amount">R$ {{
                consentData.consent.payment.amount.replace('.', ',')
              }}</span>
            </div>
          </div>
          <q-item-label class="confirmation-title text-title">
            Dados do recebedor
          </q-item-label>
          <div class="content-box">
            <div>
              <label>CPF:</label>
              <span class="space-left"
                >CPF
                {{ applyCPFMask(consentData.consent.creditor.cpfCnpj) }}</span
              >
            </div>
            <div>
              <label>Nome:</label>
              <span class="space-left">{{
                consentData.consent.creditor.name
              }}</span>
            </div>
            <div>
              <label>Chave PIX:</label>
              <span class="space-left">{{
                consentData.consent.payment.details.proxy
              }}</span>
            </div>
          </div>
          <q-item-label class="confirmation-title text-title">
            Fonte de pagamento
          </q-item-label>
          <div
            v-for="(conta, index) in contas"
            :key="index"
            class="content-box"
          >
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
          <div class="content-box">
            <label class="lh-12">Tipo: </label
            >{{ consentData.consent.payment.type }}
          </div>
          <div class="open-finance-message">
            <p>
              Para concluir o pagamento, lhe redirecionaremos devolta para a
              instituição
              <span class="stronger-1"
                >{{ consentData.consent.organizationName }}
                <img
                  :src="consentData.consent.organizationLogo"
                  alt="Logo"
                  class="logo-img"
              /></span>
            </p>
          </div>
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

<script src="./ConfirmationPageScript.js"></script>

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

.content-box {
  border: 1px solid #003b80;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 12px;
}

.hr-line {
  border: 0.5px solid #003b80;
}

.empty-button {
  color: #003b80;
  border: 2px solid #003b80;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 8px;
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

.label-inline {
  display: inline;
  font-size: 14px;
}

.logo-img {
  height: 24px;
  margin-left: 8px;
}

.button-submit {
  background-color: #2179e1;
  font-weight: bold;
  width: 100%;
  margin-top: 16px;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.confirmation-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.login-button {
  width: 100%;
  margin-top: 15px;
  font-size: 18px;
  padding: 12px;
}

.space-left {
  margin-left: 10px;
}
</style>
