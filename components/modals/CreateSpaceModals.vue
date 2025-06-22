<template>
  <div
    class="max-w-4xl fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-full flex items-center justify-center flex-col bg-white rounded-3xl shadow-md max-h-[90dvh] overflow-auto z-50"
  >
    <div class="text-center flex flex-col gap-3 max-w-md mb-10">
      <h3 class="text-30 text-darkText font-bold">К размещению</h3>
      <p>
        Для того чтобы разместиться, заполните простую форму, а все остальное мы
        уточним в процессе
      </p>
    </div>

    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <Selects
          :options="[
            { label: 'Москва', value: 'space1' },
            { label: 'Краснодар', value: 'space2' },
            { label: 'Ставрополь', value: 'space3' },
          ]"
          v-model="selectedSpace"
        />
        <Inputs v-model="spaceName" placeholder="Адрес" />
      </div>
      <div>
        <Selects
          :options="[
            { label: 'Площадка 1', value: 'space1' },
            { label: 'Площадка 2', value: 'space2' },
            { label: 'Площадка 3', value: 'space3' },
          ]"
          v-model="anotherSelection"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <Inputs v-model="anotherInput" placeholder="Начальная стоимость" />

        <Selects
          :options="[
            { label: 'В час', value: 'space1' },
            { label: 'В день', value: 'space2' },
            { label: 'Депозит на человека', value: 'space3' },
            { label: 'Сеанс', value: 'space3' },
          ]"
          v-model="thirdSelection"
        />
      </div>

      <div>
        <ImageUploader v-model="images" />
      </div>

      <div>
        <Textarea v-model="description" />
      </div>

      <Buttons button-name="Разместить площадку" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Selects from "../selects/Selects.vue";
import Inputs from "../inputs/Inputs.vue";
import ImageUploader from "@/components/file/ImageUploader.vue";
import Textarea from "../inputs/Textarea.vue";
import Buttons from "../Uikit/Buttons/Buttons.vue";

const selectedSpace = ref("space1");
const description = ref("space1");
const spaceName = ref("");
const anotherSelection = ref("");
const anotherInput = ref("");
const thirdSelection = ref("");
const images = ref<string[]>([]);
</script>

<style scoped></style>
