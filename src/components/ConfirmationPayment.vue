<template>
  <div class="col">
    <div v-if="confirmationData.consent.payment?.date">
      <label>Data de Pagamento:</label>
      <span class="space-left text-value">{{
        applyDateFormat(confirmationData.consent.payment.date)
      }}</span>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.single?.date">
      <label>Data de Pagamento:</label>
      <span class="space-left text-value">{{
        applyDateFormat(confirmationData.consent.payment.schedule.single.date)
      }}</span>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.daily">
      <label class="row justify-center">Pagamento Diário</label>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="space-left text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.daily.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="space-left text-value">{{
          confirmationData.consent.payment.schedule.daily.quantity
        }}</span>
      </div>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.weekly">
      <label class="row justify-center">Pagamento Semanal</label>
      <div class="row justify-center">
        <label>Dia da Semana:</label>
        <span class="space-left text-value">{{
          confirmationData.consent.payment.schedule.weekly.dayOfWeek
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="space-left text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.weekly.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="space-left text-value">{{
          confirmationData.consent.payment.schedule.weekly.quantity
        }}</span>
      </div>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.monthly">
      <label class="row justify-center">Pagamento Mensal</label>
      <div class="row justify-center">
        <label>Dia do Mês:</label>
        <span class="space-left text-value">{{
          confirmationData.consent.payment.schedule.monthly.dayOfMonth
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="space-left text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.monthly.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="space-left text-value">{{
          confirmationData.consent.payment.schedule.monthly.quantity
        }}</span>
      </div>
    </div>

    <div
      v-else-if="confirmationData.consent.payment?.schedule?.custom"
      class="custom-payment"
    >
      <label class="row justify-center">Pagamento Customizado</label>
      <div class="row justify-center">
        <label>Datas de pagamento:</label>
        <div class="space-left dates-list">
          <span class="date-item text-value">
            {{
              confirmationData.consent.payment.schedule.custom.dates.join(" | ")
            }}
          </span>
        </div>
      </div>
      <!-- <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="space-left text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.monthly.startDate,
          )
        }}</span>
      </div> -->
      <!-- <div class="row justify-center">
        <label>Informações Adicionais:</label>
        <div class="text-body2">
          {{
            confirmationData.consent.payment.schedule.custom
              .additionalInformation
          }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationPayment",
  props: {
    confirmationData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    applyDateFormat(date) {
      return date.split("T")[0];
    },
  },
};
</script>

<style>
.space-left {
  margin-left: 10px;
}

.dates-list {
  display: block;
}
.date-item {
  margin: 2px;
}
</style>
