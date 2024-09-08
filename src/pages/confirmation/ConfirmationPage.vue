<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="info-container">
        <div class="info-icon">
          <q-icon name="info" color="primary" size="24px" />
        </div>
        <div class="info-message">
          Para que possamos concluir o pagamento, iremos lhe redirecionar para a
          instituição <span class="text-stronger-value">Finansystech</span>
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
                `Ag ${conta.issuer} |
              ${getAccountTypeLabel(conta.accountType).sigla}
              ${conta.number}`
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
            >{{ consentData?.consent?.payment?.type }}
          </div>
          <div class="open-finance-message">
            <p>
              Para concluir o pagamento, lhe redirecionaremos devolta para a
              instituição
              <span class="text-stronger-value"
                >{{ consentData?.consent.organizationName }}
                <img
                  :src="consentData?.consent.organizationLogo"
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

.open-finance-message {
  margin-top: 16px;
  font-size: 14px;
}

.logo-img {
  height: 24px;
  margin-left: 8px;
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

.confirmation-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.checkbox-inline {
  margin-right: 8px;
}

</style>
