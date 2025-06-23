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
        <Selects :options="placeTypes" v-model="cities" />
        <Inputs v-model="address" placeholder="Адрес" />
      </div>

      <!-- Множественный выбор типов -->
      <div>
        <Selects :options="placeTypesList" v-model="selectedTypes" multiple />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <Inputs v-model="price" placeholder="Начальная стоимость" />

        <Selects
          :options="[
            { label: 'В час', value: 'space1' },
            { label: 'В день', value: 'space2' },
            { label: 'Депозит на человека', value: 'space3' },
            { label: 'Сеанс', value: 'space3' },
          ]"
          v-model="format_payment"
        />
      </div>

      <div>
        <ImageUploader v-model="images" />
      </div>

      <div>
        <Textarea v-model="short" />
      </div>

      <Buttons button-name="Разместить площадку" @click="onCreatePlace" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Selects from "../selects/Selects.vue";
import Inputs from "../inputs/Inputs.vue";
import ImageUploader from "@/components/file/ImageUploader.vue";
import Textarea from "../inputs/Textarea.vue";
import Buttons from "../Uikit/Buttons/Buttons.vue";
import { usePlacesStore, usePlacesStoreRefs } from "~/store/usePlacesStore";

// Поля формы
const cities = ref(["Москва"]);
const title = ref("");
const format_payment = ref("");
const price = ref("");
const address = ref("");
const short = ref("");
const images = ref([]); // массив строк (URL или base64)

// Множественный выбор типов
const selectedTypes = ref([]); // массив ID типов

// Доступ к стору
const { createPlace, selectTypePlaces } = usePlacesStore();
const { placeTypes } = usePlacesStoreRefs();

// Маппинг типов в формат Select
const placeTypesList = computed(() => {
  return placeTypes?.value.map((type: any) => ({
    label: type.title,
    value: type.id,
  }));
});

// Обработка создания
async function onCreatePlace() {
  await createPlace(
    {
      cities: cities.value,
      title: title.value,
      format_payment: format_payment.value,
      price: price.value,
      address: address.value,
      short: short.value,
    },
    selectedTypes.value,
    images.value
  );
}

// Получение типов при загрузке
onMounted(() => {
  selectTypePlaces();
});
</script>

<style scoped></style>
