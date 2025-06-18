<template>
  <div @click="handleClick">
    <button class="bg-orange py-3 px-8 rounded-full text-white w-full">
      {{ buttonName }}
    </button>
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
