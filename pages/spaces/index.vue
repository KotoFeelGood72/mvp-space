<template>
  <div class="container space-y-10 py-10">
    <div class="mb-10">
      <h1 class="text-30 text-darkText font-bold">Площадки для мероприятий</h1>
      <p class="text-grey font-bold">{{ totalVenues }} площадки</p>
    </div>

    <div class="grid grid-cols-5 gap-4">
      <Selects label="Город" :options="cities" v-model="filters.city" />
      <DateTimePicker label="Дата и время" v-model="filters.datetime" />
      <Selects
        label="Тип события"
        :options="eventTypes"
        v-model="filters.eventType"
      />
      <Selects
        label="Тип площадки"
        :options="venueTypes"
        v-model="filters.venueType"
      />
      <Inputs
        label="Кол-во чел."
        type="number"
        v-model="filters.peopleCount"
        placeholder=""
      />
    </div>

    <MapTrigger />

    <div class="grid grid-cols-3 gap-4">
      <CardPlace
        v-for="(item, i) in places"
        :key="'places-item-' + i"
        :card="item"
        :short="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DateTimePicker from "~/components/date/DateTimePicker.vue";
import Selects from "~/components/selects/Selects.vue";
import Inputs from "~/components/inputs/Inputs.vue";
import MapTrigger from "~/components/Uikit/Buttons/MapTrigger.vue";
import CardPlace from "~/components/Uikit/cards/CardPlace.vue";

import { usePlacesStore, usePlacesStoreRefs } from "~/store/usePlacesStore";

const { fetchPlaces } = usePlacesStore();
const { places } = usePlacesStoreRefs();

const totalVenues = 773;

const filters = ref({
  city: null,
  datetime: "",
  eventType: null,
  venueType: null,
  peopleCount: null,
});

const cities = [
  { label: "Краснодар", value: "Краснодар" },
  { label: "Сочи", value: "Сочи" },
  { label: "Анапа", value: "Анапа" },
  { label: "Геленджик", value: "Геленджик" },
  { label: "Новороссийск", value: "Новороссийск" },
  { label: "Армавир", value: "Армавир" },
  { label: "Ейск", value: "Ейск" },
  { label: "Туапсе", value: "Туапсе" },
  { label: "Темрюк", value: "Темрюк" },
  { label: "Крымск", value: "Крымск" },
];

const eventTypes = [
  { label: "Свадьба", value: "Свадьба" },
  { label: "Корпоратив", value: "Корпоратив" },
  { label: "День рождения", value: "День рождения" },
  { label: "Презентация", value: "Презентация" },
  { label: "Выставка", value: "Выставка" },
];

const venueTypes = [
  { label: "Банкетный зал", value: "Банкетный зал" },
  { label: "Конференц-зал", value: "Конференц-зал" },
  { label: "Открытая площадка", value: "Открытая площадка" },
  { label: "Лофт", value: "Лофт" },
  { label: "Клуб", value: "Клуб" },
];

onMounted(() => {
  fetchPlaces();
});
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}
</style>
