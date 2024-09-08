<template>
  <div class="main-container">
    <div class="header-simple">
      <h1>Checkout</h1>
    </div>
    <div class="info-container">
      <div class="info-icon">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.22202 27.6406C10.5243 29.1789 13.2311 30 16 30C19.7118 29.9959 23.2704 28.5196 25.895 25.895C28.5196 23.2704 29.9959 19.7118 30 16C30 13.2311 29.1789 10.5243 27.6406 8.22202C26.1022 5.91973 23.9157 4.12532 21.3576 3.06569C18.7994 2.00607 15.9845 1.72882 13.2687 2.26901C10.553 2.80921 8.05845 4.14258 6.10051 6.10051C4.14258 8.05845 2.80921 10.553 2.26901 13.2687C1.72882 15.9845 2.00607 18.7994 3.06569 21.3576C4.12532 23.9157 5.91973 26.1022 8.22202 27.6406Z"
            fill="#2179E1"
          />
          <path
            d="M19.5002 23H13.9002C13.7145 23 13.5365 22.9263 13.4052 22.795C13.2739 22.6637 13.2002 22.4857 13.2002 22.3C13.2002 22.1143 13.2739 21.9363 13.4052 21.805C13.5365 21.6737 13.7145 21.6 13.9002 21.6H16.0002V14.6H13.9002C13.7145 14.6 13.5365 14.5263 13.4052 14.395C13.2739 14.2637 13.2002 14.0857 13.2002 13.9C13.2002 13.7143 13.2739 13.5363 13.4052 13.405C13.5365 13.2737 13.7145 13.2 13.9002 13.2H16.7002C16.8858 13.2 17.0639 13.2737 17.1952 13.405C17.3264 13.5363 17.4002 13.7143 17.4002 13.9V21.6H19.5002C19.6858 21.6 19.8639 21.6737 19.9952 21.805C20.1264 21.9363 20.2002 22.1143 20.2002 22.3C20.2002 22.4857 20.1264 22.6637 19.9952 22.795C19.8639 22.9263 19.6858 23 19.5002 23ZM16.7002 11.8H15.3002C15.1145 11.8 14.9365 11.7262 14.8052 11.595C14.6739 11.4637 14.6002 11.2857 14.6002 11.1V9.7C14.6002 9.51435 14.6739 9.3363 14.8052 9.20503C14.9365 9.07375 15.1145 9 15.3002 9H16.7002C16.8858 9 17.0639 9.07375 17.1952 9.20503C17.3264 9.3363 17.4002 9.51435 17.4002 9.7V11.1C17.4002 11.2857 17.3264 11.4637 17.1952 11.595C17.0639 11.7262 16.8858 11.8 16.7002 11.8Z"
            fill="white"
          />
        </svg>
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
          <p>
            Prazo de autorização:
            <span class="float-right bold">{{
              applyDataFormat(
                confirmationData.consentData.consent.expirationDateTime,
              )
            }}</span>
          </p>
        </div>
        <br />
        <div class="hr-line"></div>
        <br />
        <div class="content-box-item">
          <p
            v-if="
              confirmationData.consentData.consent.recurringConfiguration
                ?.automatic
            "
          >
            Valor à pagar
          </p>
          <p
            v-if="
              confirmationData.consentData.consent.recurringConfiguration
                ?.sweeping
            "
          >
            Valor total de transações
          </p>
          <p
            v-if="
              confirmationData.consentData.consent.recurringConfiguration?.vrp
            "
          >
            Limite máximo para transação
          </p>
          <p class="payment-amount">
            R$
            {{
              confirmationData.consentData.consent.recurringConfiguration
                ?.sweeping?.totalAllowedAmount ||
              confirmationData.consentData.consent.recurringConfiguration
                ?.automatic?.amount ||
              confirmationData.consentData.consent.recurringConfiguration?.vrp
                ?.transactionLimit
            }}
          </p>
        </div>
      </div>
      <br />
      <h4>Dados do recebedor</h4>
      <div
        v-for="(creditor, index) in confirmationData.consentData.consent
          .creditors"
        :key="index"
      >
        <div class="content-box">
          <p><strong>Nome:</strong> {{ creditor.name }}</p>
          <p><strong>CPF/CNPJ:</strong> {{ applyCPFMask(creditor.cpfCnpj) }}</p>
        </div>
      </div>
      <br />
      <h4>Fonte de pagamento</h4>
      <div
        v-for="(conta, index) in confirmationData.account"
        :key="index"
        class="content-box"
      >
        <q-radio
          :id="index"
          class="checkbox-inline confirmation-radio"
          v-model="selectedAccount"
          :val="index"
          size="28px"
        />
        <label class="label-inline lh-12 confirmation-label" :for="index">{{
          `Ag ${conta.issuer} |
                    ${getAccountTypeLabel(conta.accountType).sigla}
                    ${conta.number}`
        }}</label>
        <p></p>
      </div>
      <br />
      <div class="open-finance-message">
        <p>
          Para concluir o pagamento, lhe redirecionaremos devolta para a
          instituição
          <span class="stronger-1"
            >{{ confirmationData.consentData.consent.organizationName }}
            <img
              src="https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg"
              alt="Logo"
              class="logo-img"
          /></span>
        </p>
      </div>
      <div>
        <q-btn
          :label="loading ? '' : 'Concluir pagamento'"
          class="button-submit"
          no-caps
          type="submit"
        >
          <q-spinner v-if="loading" color="white" />
        </q-btn>
      </div>
      <div>
        <q-btn
          :label="loading ? '' : 'Cancelar'"
          class="empty-button"
          no-caps
          @click="cancelConsent"
        >
          <q-spinner v-if="loading" color="white" />
        </q-btn>
      </div>
    </q-form>

    <RedirectModal v-if="showModal" />
  </div>
</template>

<script>
import RedirectModal from "../../components/dialog/RedirectModal.vue";

export default {
  name: "ConfirmationAutomaticPayment",
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
      loading: false,
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
      this.loading = true;
      const body = {
        debtorAccount: this.confirmationData.account[this.selectedAccount],
        device: this.deviceInfo,
      };
      // const respostaLogin = await axios.post(`/api/${process.env.CLIENT_ID}/consents/v1/interactions/${this.confirmationData.consentData.interactionId}/consent`, body)

      this.loading = false;
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
    applyDataFormat(originalDate) {
      return originalDate.split("T")[0];
      // const timePart = originalDate.split('T')[1].split(':').slice(0, 2).join(':');
      // return `${datePart} ${timePart}`;
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
      this.loading = true;
      const body = {
        rejectionReason: {
          code: "REJEITADO_USUARIO",
          detail: "O usuário rejeitou a autorização do consentimento ",
        },
        device: this.deviceInfo,
      };
      const respostaLogin = await axios.post(
        `/api/${process.env.CLIENT_ID}/consents/v1/interactions/${this.confirmationData.consentData.interactionId}/cancel`,
        body,
      );

      this.loading = false;
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
    console.log("componente auutomatic payments", this.consentData);
  },
};
</script>

<style scoped>
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
</style>
