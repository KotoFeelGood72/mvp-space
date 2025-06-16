<template>
  <div class="flex flex-col gap-3">
    <div class="w-32">
      <img :src="card.img" />
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-18 font-semibold">{{ card.name }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss"></style>
