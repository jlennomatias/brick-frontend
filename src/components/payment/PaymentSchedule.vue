<template>
  <div class="col">
    <div v-if="confirmationData.consent.payment?.date">
      <label>Data de Pagamento:</label>
      <span class="q-ml-sm text-value">{{
        applyDateFormat(confirmationData.consent.payment.date)
      }}</span>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.single?.date">
      <label>Data de Pagamento:</label>
      <span class="q-ml-sm text-value">{{
        applyDateFormat(confirmationData.consent.payment.schedule.single.date)
      }}</span>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.daily">
      <label class="row justify-center">Pagamento Diário</label>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="q-ml-sm text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.daily.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="q-ml-sm text-value">{{
          confirmationData.consent.payment.schedule.daily.quantity
        }}</span>
      </div>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.weekly">
      <label class="row justify-center">Pagamento Semanal</label>
      <div class="row justify-center">
        <label>Dia da Semana:</label>
        <span class="q-ml-sm text-value">{{
          confirmationData.consent.payment.schedule.weekly.dayOfWeek
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="q-ml-sm text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.weekly.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="q-ml-sm text-value">{{
          confirmationData.consent.payment.schedule.weekly.quantity
        }}</span>
      </div>
    </div>

    <div v-else-if="confirmationData.consent.payment?.schedule?.monthly">
      <label class="row justify-center">Pagamento Mensal</label>
      <div class="row justify-center">
        <label>Dia do Mês:</label>
        <span class="q-ml-sm text-value">{{
          confirmationData.consent.payment.schedule.monthly.dayOfMonth
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Data de Início:</label>
        <span class="q-ml-sm text-value">{{
          applyDateFormat(
            confirmationData.consent.payment.schedule.monthly.startDate,
          )
        }}</span>
      </div>
      <div class="row justify-center">
        <label>Quantidade:</label>
        <span class="q-ml-sm text-value">{{
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
        <div class="q-ml-sm dates-list">
          <span class="date-item text-value">
            {{
              confirmationData.consent.payment.schedule.custom.dates.join(" | ")
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSchedule",
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

.dates-list {
  display: block;
}
.date-item {
  margin: 2px;
}
</style>
