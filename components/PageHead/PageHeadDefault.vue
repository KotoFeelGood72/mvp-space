<template>
  <div class="container mb-9">
    <p class="text-lightText">{{ text }}</p>
    <h1 class="text-darkText text-30 font-bold">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  text: string;
}>();
</script>

<style scoped></style>
