<template>
  <div class="consent-details q-pa-md">
    <!-- Filtro por status -->
    <div class="q-pa-md">
      <q-select
        v-model="selectedStatus"
        :options="statusOptions"
        label="Filtrar por status"
        option-value="value"
        option-label="label"
        emit-value
        clearable
        filled
        outlined
        dense
        class="q-mb-sm"
        @update:model-value="fetchData"
      />
    </div>

    <!-- Carregando ou exibindo dados -->
    <q-spinner v-if="loading || actionLoading" color="primary" />
    <div v-else>
      <p v-if="errorMessage" class="q-mb-md text-negative">
        {{ errorMessage }}
      </p>
      <div v-else class="consent-content">
        <!-- Exibe a lista de consentimentos -->
        <div v-for="(item, index) in consent" :key="index" class="content-box q-pa-xs row">
          <div class="col margin-box">
            <div class="row">
              <span class="small-text text-left" :class="{
                'text-positive': ['AUTHORISED'].includes(item.status),
                'text-negative': ['REVOKED', 'REJECTED'].includes(item.status),
                'text-warning': ['AWAITING_AUTHORISATION'].includes(item.status),
              }">Status: {{ item.status }}</span>
            </div>
            <div class="row">
              <span class="small-text text-left">{{ item.organizationName }}</span>
            </div>
          </div>
          <div class="col-auto margin-box button-group">
            <div class="row items-start justify-end">
              <span class="small-text text-date">
                {{ applyDateFormat(item.creationDateTime) }}</span>
            </div>
            <div class="row justify-center">
              <q-btn @click="viewConsent(item)" color="primary" icon="visibility" size="xs" flat dense />
              <q-btn @click="openConfirmDialog(item.recurringConsentId)" color="negative" icon="delete" size="xs" flat dense />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogos modais -->
    <ViewConsentDialog :isOpen="isViewDialogOpen" :consentItem="selectedConsent"
      @update:isOpen="isViewDialogOpen = $event" />

    <RevokeConsentDialog :isOpen="isConfirmDialogOpen" @confirm="revokeConsent"
      @update:isOpen="isConfirmDialogOpen = $event" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  deleteConsentAutomaticPayment,
  getConsentsAutomaticPayments,
} from "src/services/gestaoConsents/apiGestaoConsentimentoAutomaticPaymentService";
import ViewConsentDialog from "src/components/dialog/ViewConsentDialog.vue";
import RevokeConsentDialog from "src/components/dialog/RevokeConsentDialog.vue";

// Define as opções de status em uma constante única
const statusOptions = [
  { label: "Todos", value: null },
  { label: "Autorizado", value: "AUTHORISED" },
  { label: "Revogado", value: "REVOKED" },
  { label: "Rejeitado", value: "REJECTED" },
  { label: "Consumido", value: "CONSUMED" },
  { label: "Aguardando Autorização", value: "AWAITING_AUTHORISATION" }
];

export default {
  components: { ViewConsentDialog, RevokeConsentDialog },
  props: {
    type: {
      type: String,
      default: "",
    },
    loading: Boolean,
  },
  setup(props, { emit }) {
    const consent = ref([]);
    const selectedStatus = ref(statusOptions[1].value); // "Autorizado" como valor padrão
    const errorMessage = ref("");
    const isViewDialogOpen = ref(false);
    const isConfirmDialogOpen = ref(false);
    const selectedConsent = ref({});
    const selectedConsentId = ref(null);
    const actionLoading = ref(false);

    // Função que busca os consentimentos com base no status selecionado
    const fetchData = async () => {
      emit("update:loading", true);
      try {
        // O valor de 'selectedStatus' já é uma string ("AUTHORISED", "REVOKED", etc.)
        consent.value = await getConsentsAutomaticPayments(selectedStatus.value);

        if (!consent.value.length || consent.value[0].kind !== "AUTOMATIC_PAYMENT") {
          throw "Não localizado.";
        }
        errorMessage.value = "";
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        errorMessage.value =
          error.code === "ERR_NETWORK"
            ? "Não foi possível carregar os dados. Tente novamente mais tarde."
            : "Não localizado.";
      } finally {
        emit("update:loading", false);
      }
    };

    const applyDateFormat = (date) => {
      return new Date(date).toISOString().slice(0, 16).replace("T", " ");
    };

    const viewConsent = (item) => {
      selectedConsent.value = item;
      isViewDialogOpen.value = true;
    };

    const openConfirmDialog = (consentId) => {
      selectedConsentId.value = consentId;
      isConfirmDialogOpen.value = true;
    };

    const revokeConsent = async () => {
      actionLoading.value = true;
      try {
        if (selectedConsentId.value) {
          await deleteConsentAutomaticPayment(selectedConsentId.value);
          await fetchData();
        }
      } catch (error) {
        console.error("Erro ao revogar consentimento:", error);
        errorMessage.value = "Erro ao revogar o consentimento. Tente novamente.";
      } finally {
        actionLoading.value = false;
        isConfirmDialogOpen.value = false;
      }
    };

    // Carrega os consentimentos ao montar o componente
    onMounted(() => {
      fetchData();
    });

    return {
      consent,
      selectedStatus,
      statusOptions,
      errorMessage,
      applyDateFormat,
      viewConsent,
      openConfirmDialog,
      revokeConsent,
      isViewDialogOpen,
      isConfirmDialogOpen,
      selectedConsent,
      actionLoading,
      fetchData, // Exposto para ser chamado no @update:model-value
    };
  },
};
</script>

<style scoped lang="scss">
.consent-details {
  border: 1px solid $quaternary;
  border-radius: 8px;
  max-width: 800px; /* Limita a largura máxima */
  margin: 0 auto; /* Centraliza o conteúdo */
  overflow: hidden;
  width: 100%; /* Garante que ocupe todo o espaço disponível */
}

.consent-content {
  max-height: 400px; /* Ajuste a altura máxima conforme necessário */
  overflow-y: auto; /* Adiciona uma barra de rolagem quando necessário */
  padding: 16px; /* Padding interno para o conteúdo */
}

.content-box {
  margin-bottom: 6px;
  align-items: flex-start;
  width: 100%; /* Garante que o conteúdo se ajuste à largura disponível */
}

.margin-box {
  margin: 0 2px;
  flex: 1;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.q-pa-md {
  padding: 8px;
  max-width: 100%;
}

.q-mb-sm {
  margin-bottom: 8px;
}

.text-date {
  text-align: right;
  color: $text-value;
}

</style>
