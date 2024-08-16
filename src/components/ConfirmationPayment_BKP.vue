<template>
  <div class="main-container">
    <div class="info-container">
        <div class="info-icon">
          <q-icon name="info" color="primary" size="24px" />
        </div>
        <div class="info-message">
          Para que possamos concluir o pagamento, iremos lhe redirecionar para a
          instituição <span class="stronger-1">Finansystech</span>
        </div>
      </div>
    <q-form @submit.prevent="approveConsent">
      <h3>Resumo da transação</h3>
      <div v-if="error" id="error-message">Falha</div>
      <div class="content-box">

        <div class="content-box-item">
          <div v-if="confirmationData.consentData.consent.payment?.date">
            <p>
              <span class="bold-label">Data de Pagamento:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.date
              }}</span>
            </p>
          </div>

          <div v-else-if="confirmationData.consentData.consent.payment?.schedule?.single?.date">
            <p>
              <span class="bold-label">Data de Pagamento Único:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.single.date
              }}</span>
            </p>
          </div>

          <div v-else-if="confirmationData.consentData.consent.payment?.schedule?.daily">
            <p>
              <span class="bold-label">Pagamento Diário - Data de Início:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.daily.startDate
              }}</span>
            </p>
            <p><br /></p>
            <p>
              <span class="bold-label">Quantidade:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.daily.quantity
              }}</span>
            </p>
          </div>

          <div v-else-if="confirmationData.consentData.consent.payment?.schedule?.weekly">
            <p>
              <span class="bold-label">Pagamento Semanal - Dia da Semana:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.weekly.dayOfWeek
              }}</span>
            </p>
            <p><br /></p>
            <p>
              <span class="bold-label">Data de Início:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.weekly.startDate
              }}</span>
            </p>
            <p><br /></p>
            <p>
              <span class="bold-label">Quantidade:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.weekly.quantity
              }}</span>
            </p>
          </div>

          <div v-else-if="
            confirmationData.consentData.consent.payment?.schedule?.monthly?.startDate
          ">
            <p>
              <span class="bold-label">Pagamento Mensal - Dia do Mês:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.monthly.dayOfMonth
              }}</span>
            </p>
            <p><br /></p>

            <p>
              <span class="bold-label">Data de Início:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.monthly.startDate
              }}</span>
            </p>
            <p><br /></p>
            <p>
              <span class="bold-label">Quantidade:</span>
              <span class="float-right bold">{{
                confirmationData.consentData.consent.payment.schedule.monthly.quantity
              }}</span>
            </p>
          </div>

          <div v-else-if="confirmationData.consentData.consent.payment?.schedule?.custom" class="custom-payment">
            <p>
              <span class="bold-label">Pagamento Customizado - Datas:</span>
            </p>
            <div class="dates-list">
              <span v-for="date in confirmationData.consentData.consent.payment.schedule.custom
                .dates" :key="date" class="date-item">
                {{ date }}
              </span>
            </div>
            <p><br /></p>
            <p style="flex-wrap: wrap">
              <span class="bold-label">Informações Adicionais:</span>
            </p>
            <div class="text-body2">
              {{
                confirmationData.consentData.consent.payment.schedule.custom
                  .additionalInformation
              }}
            </div>
          </div>
        </div>

        <br />
        <div class="hr-line"></div>
        <br />
        <div class="content-box-item">
          <p>Valor a pagar</p>
          <p class="payment-amount">
            R$ {{ confirmationData.consentData.consent.payment.amount }}
          </p>
        </div>
      </div>
      <br />
      <h4>Dados do recebedor</h4>
      <div class="content-box">
        <div class="content-box-item">
          <label>CPF:</label>
          <span>CPF
            {{
              applyCPFMask(
                confirmationData.consentData.consent.creditor.cpfCnpj
              )
            }}</span>
        </div>
        <div class="content-box-item">
          <label>Nome:</label>
          {{ confirmationData.consentData.consent.creditor.name }}
        </div>
        <div class="content-box-item">
          <label>Chave PIX:</label>
          <span>{{
            confirmationData.consentData.consent.payment.details.proxy
          }}</span>
        </div>
      </div>
      <br />
      <h4>Fonte de pagamento</h4>

      <div v-for="(conta, index) in confirmationData.account" :key="index" class="content-box">
        <!-- <div class="content-box"> -->
        <!-- <div class="content-box-item"> -->
        <q-radio :id="index" class="checkbox-inline confirmation-radio" v-model="selectedAccount" :val="index"
          size="28px" />
        <label class="label-inline lh-12 confirmation-label" :for="index">{{
          `Ag ${conta.issuer} |
          ${getAccountTypeLabel(conta.accountType).sigla}
          ${conta.number}`
        }}</label>
        <p></p>
        <!-- <p>Saldo em conta: R$ {{ conta.balance.toFixed(2) }}</p> -->
        <p>Saldo em conta: R$ 200</p>
        <!-- </div> -->
        <!-- </div> -->
      </div>
      <h4>Forma de pagamento</h4>
      <div class="content-box">
        <label class="lh-12">Tipo: </label>{{ confirmationData.consentData.consent.payment.type }}
      </div>
      <br />
      <div class="open-finance-message">
        <p>
          Para concluir o pagamento, lhe redirecionaremos devolta para a
          instituição
          <span class="stronger-1">{{ confirmationData.consentData.consent.organizationName }}
            <img src="https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg" alt="Logo" class="logo-img" /></span>
        </p>
      </div>
      <div>
        <q-btn label="Concluir pagamento" class="button-submit" no-caps type="submit" />
      </div>
      <div>
        <q-btn label="Cancelar" class="empty-button" no-caps @click="cancelConsent" />
      </div>
    </q-form>

    <RedirectModal v-if="showModal" />
  </div>
</template>

<script>
import axios from "axios";
import RedirectModal from "../components/RedirectModal.vue";

export default {
  name: "ConfirmationPayment",
  components: {
    RedirectModal,
  },
  props: {
    confirmationData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: false,
      selectedAccount: 0,
      showModal: false,
      deviceInfo: {
        platform: "",
        osVersion: "",
        os: "",
      },
    };
  },
  methods: {
    getDeviceInfo() {
      const platform = navigator.platform;
      let os = "Unknown OS";
      let osVersion = "Unknown Version";

      if (navigator.userAgent.indexOf("Win") != -1) {
        os = "Windows";
        osVersion = navigator.userAgent.match(/Windows NT (\d+\.\d+)/)[1];
      } else if (navigator.userAgent.indexOf("Mac") != -1) {
        os = "MacOS";
        osVersion = navigator.userAgent
          .match(/Mac OS X (\d+[_\.]\d+)/)[1]
          .replace("_", ".");
      } else if (navigator.userAgent.indexOf("Linux") != -1) {
        os = "Linux";
        osVersion = navigator.userAgent.match(/Linux (\d+\.\d+)/)
          ? navigator.userAgent.match(/Linux (\d+\.\d+)/)[1]
          : "Unknown Version";
      } else if (navigator.userAgent.indexOf("Android") != -1) {
        os = "Android";
        osVersion = navigator.userAgent.match(/Android (\d+\.\d+)/)[1];
      } else if (navigator.userAgent.indexOf("like Mac") != -1) {
        os = "iOS";
        osVersion = navigator.userAgent
          .match(/CPU OS (\d+[_\.]\d+)/)[1]
          .replace("_", ".");
      }

      this.deviceInfo = {
        platform: platform,
        osVersion: osVersion,
        os: os,
      };
    },
    async approveConsent() {
      const body = {
        debtorAccount: this.confirmationData.account[this.selectedAccount],
        device: this.deviceInfo,
      };
      const respostaLogin = await axios.post(
        `/api/${process.env.CLIENT_ID}/consents/v1/interactions/${this.confirmationData.consentData.interactionId}/consent`,
        body
      );

      this.showModal = true;
      setTimeout(function () {
        window.location.href = respostaLogin.data.url;
      }, 2500);
    },
    applyCPFMask(cpf) {
      cpf = cpf.replace(/\D/g, "");
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "***.$2.$3-**");

      return cpf;
    },
    getAccountTypeLabel(type) {
      switch (type) {
        case "CACC":
          return { name: "Conta Corrente", sigla: "CC" };
        case "SVGS":
          return { name: "Conta Poupança", sigla: "CP" };
        default:
          return "Tipo de Conta Desconhecido";
      }
    },
    async cancelConsent() {
      const body = {
        rejectionReason: {
          code: "REJEITADO_USUARIO",
          detail: "O usuário rejeitou a autorização do consentimento ",
        },
        device: this.deviceInfo,
      };
      const respostaLogin = await axios.post(
        `/api/${process.env.CLIENT_ID}/consents/v1/interactions/${this.confirmationData.consentData.interactionId}/cancel`,
        body
      );

      this.showModal = true;
      setTimeout(function () {
        window.location.href = respostaLogin.data.url;
      }, 2500);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    document.title = "Confirmation Page";
    this.getDeviceInfo();
  },
};
</script>

<style scoped>
@import url("../assets/css/confirmationStyle.css");

.logo-img {
  width: 50px;
  /* Ajuste o tamanho conforme necessário */
  height: auto;
  /* Mantém a proporção da altura */
  vertical-align: middle;
  /* Alinha verticalmente ao centro com o texto */
  margin-left: 20px;
  /* Espaçamento lateral esquerdo */
}


.bold-label {
  font-weight: bold;
}

.custom-payment {
  padding: 10px;
}

.custom-payment p {
  margin-bottom: 15px;
}

.dates-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.custom-payment .dates-list li {
  margin-top: 5px;
  display: block;
}

.date-item {
  margin: 2px;
}

.info-item {
  margin: 2px;
  flex-wrap: wrap;
}

.additional-info {
  display: block;
  margin-top: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
