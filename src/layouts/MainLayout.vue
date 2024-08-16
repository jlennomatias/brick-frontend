<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <q-page class="page-content">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>

defineOptions({
  name: "MainLayout",
});
</script>
