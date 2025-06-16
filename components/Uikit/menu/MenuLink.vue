<template>
  <div class="menu-link">
    <NuxtLink :to="menuLink">
      <p><slot /></p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuLink: string;
}>();
</script>

<style scoped></style>
