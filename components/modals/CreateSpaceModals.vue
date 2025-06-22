<template>
  <div>
    <div>
      <h3>К размещению</h3>
      <p>
        Для того чтобы разместиться, заполните простую форму, а все остальное мы
        уточним в процессе
      </p>
    </div>

    <div class="space-y-4">
      <Selects
        :options="[
          { label: 'Площадка 1', value: 'space1' },
          { label: 'Площадка 2', value: 'space2' },
          { label: 'Площадка 3', value: 'space3' },
        ]"
        v-model="selectedSpace"
      />
      <Inputs v-model="spaceName" placeholder="Введите название площадки" />

      <Selects
        :options="[
          { label: 'Площадка 1', value: 'space1' },
          { label: 'Площадка 2', value: 'space2' },
          { label: 'Площадка 3', value: 'space3' },
        ]"
        v-model="anotherSelection"
      />
      <Inputs v-model="anotherInput" placeholder="Введите название площадки" />

      <Selects
        :options="[
          { label: 'Площадка 1', value: 'space1' },
          { label: 'Площадка 2', value: 'space2' },
          { label: 'Площадка 3', value: 'space3' },
        ]"
        v-model="thirdSelection"
      />

      <ImageUploader v-model="images" />
      <Textarea v-model="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Selects from "../selects/Selects.vue";
import Inputs from "../inputs/Inputs.vue";
import ImageUploader from "@/components/file/ImageUploader.vue";
import Textarea from "../inputs/Textarea.vue";

const selectedSpace = ref("space1");
const description = ref("space1");
const spaceName = ref("");
const anotherSelection = ref("");
const anotherInput = ref("");
const thirdSelection = ref("");
const images = ref<string[]>([]);
</script>

<style scoped></style>
