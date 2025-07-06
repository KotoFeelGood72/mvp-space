<!-- components/FiltersPanel.vue -->
<template>
  <aside
    class="w-full max-w-[320px] bg-white/70 backdrop-blur-[2px] px-5 pt-6 pb-4 rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,.12)]"
  >
    <!-- кнопка «сбросить всё» -->
    <button
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
      @click="resetAll"
    >
      <!-- <icons icon="mynaui:x" :size="18" class="text-gray-400" /> -->
    </button>

    <div class="flex flex-col gap-6">
      <!-- 1. Город -->
      <Selects v-model="filters.city" :options="cities" placeholder="Город" />

      <!-- 2. Дата и время -->
      <DateTimePicker v-model="filters.date" placeholder="Дата и время" />

      <!-- 3. Тип события -->
      <Selects
        v-model="filters.eventType"
        :options="eventTypes"
        placeholder="Тип события"
      />

      <!-- 4. Тип площадки -->
      <Selects
        v-model="filters.venueType"
        :options="venueTypes"
        placeholder="Тип площадки"
      />

      <!-- 5. Кол-во человек -->
      <Selects
        v-model="filters.people"
        :options="peopleVariants"
        placeholder="Кол-во чел."
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Selects from "../selects/Selects.vue";
import DateTimePicker from "../date/DateTimePicker.vue";

/* реактивные фильтры */
const filters = reactive({
  city: "" as string | number,
  date: null as Date | null,
  eventType: "" as string | number,
  venueType: "" as string | number,
  people: "" as string | number,
});

/* списки вариантов: { label, value } */
const cities = [
  { label: "Москва", value: "msk" },
  { label: "Санкт-Петербург", value: "spb" },
  { label: "Казань", value: "kzn" },
];

const eventTypes = [
  { label: "Спорт", value: "sport" },
  { label: "Конференция", value: "conf" },
  { label: "Корпорат", value: "corp" },
];

const venueTypes = [
  { label: "Манеж", value: "manezh" },
  { label: "Зал", value: "hall" },
  { label: "Открытая площадка", value: "open" },
];

const peopleVariants = [
  { label: "до 50", value: "to-50" },
  { label: "51-100", value: "51-100" },
  { label: "101-200", value: "101-200" },
  { label: "200+", value: "200-plus" },
];

function resetAll() {
  filters.city = "";
  filters.date = null;
  filters.eventType = "";
  filters.venueType = "";
  filters.people = "";
}
</script>
