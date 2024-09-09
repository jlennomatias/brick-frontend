<template>
  <div class="consent-details q-pa-md">
    <q-spinner v-if="loading || actionLoading" color="primary" />
    <div v-else>
      <p v-if="errorMessage" class="q-mb-md text-negative">
        {{ errorMessage }}
      </p>
      <div v-else class="consent-content">
        <div
          v-for="(item, index) in consent"
          :key="index"
          class="content-box q-pa-xs row"
        >
          <div class="col margin-box">
            <div class="row">
              <span
                class="small-text text-left"
                :class="{
                  'text-positive': ['AUTHORISED','CONSUMED'].includes(item.status),
                  'text-negative': ['REJECTED'].includes(item.status),
                  'text-warning': item.status === 'AWAITING_AUTHORISATION',
                }"
                >Status: {{ item.status }}</span
              >
            </div>
            <div class="row">
              <span class="small-text text-left"
                >{{ item.organizationName }}</span
              >
            </div>
          </div>
          <div class="col-auto margin-box button-group">
            <div class="row items-start justify-end">
              <span class="small-text text-date">
                {{ applyDateFormat(item.creationDateTime) }}</span
              >
            </div>
            <div class="row justify-center">
              <q-btn
                @click="viewConsent(item)"
                color="primary"
                icon="visibility"
                size="xs"
                flat
                dense
              />

              <!-- Desabilitado para detentora de conta -->
              <!-- <q-btn
              @click="alterConsent(item)"
              color="primary"
              icon="edit"
              size="xs"
              flat
              dense
            /> -->

              <q-btn
                @click="openConfirmDialog(item.consentId)"
                color="negative"
                icon="delete"
                size="xs"
                flat
                dense
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <ViewConsentDialog
      :isOpen="isViewDialogOpen"
      :consentItem="selectedConsent"
      @update:isOpen="isViewDialogOpen = $event"
    />

    <AlterConsentDialog
      :isOpen="isAlterDialogOpen"
      :consentItem="selectedConsent"
      @update:isOpen="isAlterDialogOpen = $event"
    />

    <RevokeConsentDialog
      :isOpen="isConfirmDialogOpen"
      @confirm="revokeConsent"
      @update:isOpen="isConfirmDialogOpen = $event"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  getConsentsPayments,
  deleteConsentPayment,
} from "src/services/gestaoConsents/apiGestaoConsentimentoPaymentService.js";
import ViewConsentDialog from "src/components/dialog/ViewConsentDialog.vue";
import AlterConsentDialog from "src/components/dialog/AlterConsentDialog.vue";
import RevokeConsentDialog from "src/components/dialog/RevokeConsentDialog.vue";

export default {
  components: { ViewConsentDialog, AlterConsentDialog, RevokeConsentDialog },
  props: {
    type: {
      type: String,
      default: "",
    },
    loading: Boolean,
  },
  setup(props, { emit }) {
    const consent = ref([]);
    const errorMessage = ref("");
    const isViewDialogOpen = ref(false);
    const isAlterDialogOpen = ref(false);
    const isConfirmDialogOpen = ref(false);
    const selectedConsent = ref({});
    const selectedConsentId = ref(null);
    const actionLoading = ref(false);

    const fetchData = async () => {
      if (props.type) {
        emit("update:loading", true);
        try {
          consent.value = await getConsentsPayments();
          if (consent.value[0].kind !== "PAYMENT") {
            throw "Não localizado."
          }
          errorMessage.value = "";
        } catch (error) {
          console.error("Erro ao carregar dados:", error.code);
          errorMessage.value =
            error.code === "ERR_NETWORK"
              ? "Não foi possível carregar os dados. Tente novamente mais tarde."
              : "Não localizado.";
        } finally {
          emit("update:loading", false);
        }
      }
    };

    const applyDateFormat = (date) => {
      return new Date(date).toISOString().slice(0, 16).replace("T", " ");
    };

    const viewConsent = (item) => {
      selectedConsent.value = item;
      isViewDialogOpen.value = true;
    };

    const alterConsent = (item) => {
      selectedConsent.value = item;
      isAlterDialogOpen.value = true;
    };

    const openConfirmDialog = (consentId) => {
      selectedConsentId.value = consentId;
      isConfirmDialogOpen.value = true;
    };

    const revokeConsent = async () => {
      actionLoading.value = true;
      try {
        if (selectedConsentId.value) {
          await deleteConsentPayment(selectedConsentId.value);
          await fetchData();
        }
      } catch (error) {
        console.error("Erro ao revogar consentimento:", error);
        errorMessage.value =
          "Erro ao revogar o consentimento. Tente novamente.";
      } finally {
        actionLoading.value = false;
        isConfirmDialogOpen.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      consent,
      errorMessage,
      applyDateFormat,
      openConfirmDialog,
      viewConsent,
      alterConsent,
      revokeConsent,
      isViewDialogOpen,
      isAlterDialogOpen,
      isConfirmDialogOpen,
      selectedConsent,
      actionLoading,
    };
  },
};
</script>

<style scoped lang="scss">
.consent-details {
  border: 1px solid $quaternary;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.consent-content {
  max-height: 500px;
  overflow-y: auto;
}

.small-text {
  font-size: 12px;
  text-align: left;
  display: block;
}

.text-stronger-value {
  font-size: 14px;
  text-align: left;
  display: block;
}

.q-pa-xs {
  padding: 4px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.content-box {
  margin-bottom: 6px;
  align-items: flex-start;
}

.margin-box {
  margin: 0 2px;
}

.text-date {
  text-align: right;
  color: $text-value;
}

</style>
