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
        <Inputs v-model="price" placeholder="Название пространства" />
        <Inputs v-model="address" placeholder="Адрес" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <Inputs v-model="price" placeholder="Название пространства" />
        <Inputs v-model="address" placeholder="Адрес" />
      </div>
      <div>
        <Selects :options="placeTypesList" v-model="selectedType" />
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
const cities = ref("Москва");
const title = ref(""); // было забыто!
const format_payment = ref("");
const price = ref("");
const address = ref("");
const short = ref("");
const images = ref<string[]>([]); // изображения: base64 или ссылки

// Выбор типа (одиночный выбор для now)
const selectedType = ref(null); // если нужен множественный выбор — делаем selectedTypes = ref([])

// Store
const { createPlace, selectTypePlaces } = usePlacesStore();
const { placeTypes } = usePlacesStoreRefs();

const placeTypesList = computed(() => {
  if (!placeTypes.value) return [];
  return placeTypes.value.map((type: any) => ({
    label: type.title,
    value: type.id,
  }));
});

// Создание площадки
async function onCreatePlace() {
  if (!selectedType.value) {
    return alert("Выберите тип площадки");
  }

  const payload = {
    title: title.value,
    // city: cities.value,
    address: address.value,
    short: short.value,
    price: Number(price.value),
    format_payment: format_payment.value,
    place_type_id: selectedType.value,
  };

  try {
    const placeId = await createPlace(payload, images.value);
    alert("Площадка создана, ID: " + placeId);
  } catch (e) {
    console.error("Ошибка при создании:", e);
    alert("Ошибка при создании площадки");
  }
}

// При монтировании
onMounted(() => {
  selectTypePlaces();
});
</script>

<style scoped></style>
