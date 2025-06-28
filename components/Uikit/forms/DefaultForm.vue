<template>
  <div id="default-forms" class="max-w-[320px] flex flex-col gap-4">
    <Selects
      label="Город"
      :options="[{ label: 'Москва', value: 'Москва' }]"
      v-model="formData.city"
    />

    <DateTimePicker v-model="formData.bookingTime" />
    <Selects :options="options" v-model="formData.categories" />
  </div>
</template>

<script setup lang="ts">
import Selects from "~/components/selects/Selects.vue";
import DateTimePicker from "~/components/date/DateTimePicker.vue";
// import { usePlacesStore, usePlacesStoreRefs } from "~/store/usePlacesStore";

// const { selectCategories } = usePlacesStore();
// const { categories } = usePlacesStoreRefs();

const options = [
  {
    // ─ обычная опция
    label: "Коктейльная вечеринка",
    value: "party",
  },
  {
    group: "Другое", // ─ подзаголовок
    items: [
      { label: "Йога", value: "yoga" },
      { label: "Выставка", value: "expo" },
    ],
  },
  {
    group: "Спортивные",
    items: [
      { label: "Волейбол", value: "volley" },
      { label: "Футбол", value: "football" },
    ],
  },
];

const isCategoriesList = computed(() => {
  // return (
  // categories.value?.map((el: any) => ({
  //   label: el.title,
  //   value: el.id,
  // })) ?? []
  // );
});

const formData = ref({
  city: "",
  bookingTime: "",
  categories: "",
});

onMounted(() => {
  // selectCategories();
});
</script>

<style scoped lang="scss"></style>
