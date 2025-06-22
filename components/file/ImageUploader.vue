<template>
  <div>
    <div
      class="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 transition"
      @dragover.prevent
      @drop.prevent="onDrop"
      @click="openFileDialog"
    >
      <span class="text-center"
        >Перетащите фотографию в эту область или
        <span class="underline">выберите файл с компьютера</span></span
      >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        @change="onFileChange"
      />
    </div>

    <div v-if="modelValue.length > 0" class="mt-4">
      <div class="flex gap-4 flex-wrap">
        <div
          v-for="(image, index) in modelValue"
          :key="index"
          class="w-20 h-20 rounded overflow-hidden relative group"
        >
          <img :src="image" class="w-full h-full object-cover rounded" />
          <button
            @click.stop="removeImage(index)"
            class="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs rounded-bl px-1 opacity-0 group-hover:opacity-100 transition"
          >
            Удалить
          </button>
        </div>
        <div
          v-if="modelValue.length < maxImages"
          class="w-20 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer"
          @click="openFileDialog"
        >
          <span class="text-xl">+</span>
        </div>
      </div>
      <p class="text-sm text-gray-500 mt-2">
        Загружено {{ modelValue.length }}
        {{ modelValue.length === 1 ? "фотография" : "фотографии" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: string[];
}>();
const emit = defineEmits(["update:modelValue"]);

const fileInput = ref<HTMLInputElement | null>(null);
const maxImages = 20;

const openFileDialog = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (files) {
    addFilesToGallery(files);
    input.value = ""; // ✅ корректно
  }
};

const onDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    addFilesToGallery(event.dataTransfer.files);
  }
};

const addFilesToGallery = (fileList: FileList) => {
  const currentImages = props.modelValue.slice();
  const newImages = Array.from(fileList).slice(
    0,
    maxImages - currentImages.length
  );

  newImages.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        emit("update:modelValue", [...props.modelValue, reader.result]);
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index: number) => {
  const updated = [...props.modelValue];
  updated.splice(index, 1);
  emit("update:modelValue", updated);
};
</script>

<style scoped></style>
