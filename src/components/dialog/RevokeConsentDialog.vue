<template>
  <q-dialog v-model="internalIsOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirmação de Cancelamento</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>
          O processo de
          <span class="text-stronger-value">Cancelamento</span> do
          <span class="text-stronger-value">Agendamento</span> é uma ação
          <span class="text-stronger-value text-warning">irreversível</span>. O
          agendamento não será efetivado, caso mude de ideia, será necessário
          solicitar um novo consentimento.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
        <q-btn flat label="Confirmar" color="negative" @click="confirmRevoke" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  setup(props, { emit }) {
    const internalIsOpen = computed({
      get: () => props.isOpen,
      set: (value) => emit("update:isOpen", value),
    });

    const closeDialog = () => {
      internalIsOpen.value = false;
    };

    const confirmRevoke = () => {
      emit("confirm");
      closeDialog();
    };

    return {
      internalIsOpen,
      closeDialog,
      confirmRevoke,
    };
  },
});
</script>

<style lang="scss">
</style>
