<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "./store/useAuthStore";

const { init } = useAuthStore();

onMounted(() => {
  init();
});
</script>
