<template>
  <div @click="handleClick">
    <button>{{ buttonName }}</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttonName: string;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
const handleClick = () => {
  emit("click");
};
</script>

<style scoped></style>
