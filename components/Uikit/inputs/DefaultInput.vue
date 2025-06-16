<template>
  <div class="">
    <input type="text" v-model="localValue" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: any;
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss"></style>
