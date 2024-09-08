<template>
  <q-dialog v-model="internalIsOpen">
    <q-card>
      <q-card-section class="row items-center">
        <img :src="consentItem.organizationLogo" alt="Logo" class="logo-img" />
        <span class="q-ml-md text-h6">Consentimento Detalhes</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-for="(value, key) in consentItem" :key="key" class="q-mb-md">
          <label class="text-stronger-value">{{ formatKey(key) }}:</label>
          <div class="formatted-content">
            <template v-if="isObject(value)">
              <template v-if="Array.isArray(value)">
                <div v-for="(item, index) in value" :key="index" class="q-mb-sm">
                  <div class="text-bold small-text">Item {{ index + 1 }}:</div>
                  <pre class="formatted-object">{{ formatObject(item) }}</pre>
                </div>
              </template>
              <template v-else>
                <pre class="formatted-object">{{ formatObject(value) }}</pre>
              </template>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    isOpen: Boolean,
    consentItem: Object,
  },
  setup(props, { emit }) {
    const internalIsOpen = computed({
      get: () => props.isOpen,
      set: (value) => emit('update:isOpen', value),
    });

    const closeDialog = () => {
      internalIsOpen.value = false;
    };

    const formatKey = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
    };

    const isObject = (value) => {
      return typeof value === 'object' && value !== null;
    };

    const formatObject = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(item => formatObject(item)).join('\n\n');
      }
      if (isObject(obj)) {
        return Object.entries(obj).map(([key, value]) => {
          const formattedKey = formatKey(key);
          const formattedValue = isObject(value) ? formatObject(value) : value;
          return `${formattedKey}: ${formattedValue}`;
        }).join('\n');
      }
      return obj;
    };

    return {
      internalIsOpen,
      closeDialog,
      formatKey,
      isObject,
      formatObject,
    };
  },
};
</script>

<style scoped>
.small-text {
  font-size: 12px;
  text-align: left;
  display: block;
}

.text-bold {
  font-weight: bold;
}

.logo-img {
  height: 35px;
  margin-left: 8px;
}

.formatted-object {
  white-space: pre-wrap;
  font-family: monospace;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px;
  margin-top: 4px;
}
</style>
