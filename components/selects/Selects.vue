<template>
  <div class="w-full">
    <select
      v-model="selected"
      @change="emitChange"
      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const selected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal;
  }
);

function emitChange() {
  emit("update:modelValue", selected.value);
}
</script>

<style scoped></style>
