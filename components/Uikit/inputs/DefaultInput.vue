<template>
  <div class="">
    <input
      type="text"
      v-model="localValue"
      :placeholder="placeholder"
      class="border border-gray w-full rounded py-3 px-6"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

const props = defineProps<{
  modelValue: any;
  placeholder: any;
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss"></style>
