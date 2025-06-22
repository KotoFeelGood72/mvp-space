<template>
  <div>
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="onInput"
      rows="1"
      class="w-full border border-gray-300 rounded p-2 resize-none overflow-hidden"
      placeholder="Введите текст..."
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const resize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

const onInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;
  emit("update:modelValue", value);
  resize();
};

watch(() => props.modelValue, resize);
onMounted(resize);
</script>

<style scoped>
/* При необходимости можно задать максимальную высоту: */
/* textarea { max-height: 300px; } */
</style>
