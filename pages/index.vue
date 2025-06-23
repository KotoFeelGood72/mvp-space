<template>
  <div class="home">
    <section id="hero" class="lg:mb-20">
      <div class="container flex items-center justify-between">
        <div class="max-w-[50%]">
          <h1 class="lg:text-40 font-bold">
            Более 2 900 площадок для вашего мероприятия
          </h1>

          <DefaultForm />
        </div>
        <div>
          <img
            src="@/assets/img/main-page-illustration.webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
    <section id="home-services" class="lg:mb-20">
      <div class="container">
        <ul class="grid grid-cols-4 gap-12">
          <li v-for="(item, i) in ServicesList">
            <ServicesCard :card="item" :key="'services-item-' + i" />
          </li>
        </ul>
      </div>
    </section>
    <section class="newplace">
      <SlidersPlace :places="places" title="Популярное" section="popular" />
    </section>
  </div>
</template>

<script setup lang="ts">
import DefaultForm from "~/components/Uikit/forms/DefaultForm.vue";
import ServicesCard from "~/components/Uikit/cards/ServicesCard.vue";
import { usePlacesStore, usePlacesStoreRefs } from "~/store/usePlacesStore";

const { selectPlaces } = usePlacesStore();
const { places } = usePlacesStoreRefs();
import SlidersPlace from "~/components/sliders/SlidersPlace.vue";

// definePageMeta({ middleware: "auth" });
const ServicesList = ref<any>([
  {
    name: "Гарантия вашего мероприятия",
    description: "В случае накладок подберём новую площадку или вернём деньги",
    img: "/assets/img/services/guarantee.webp",
  },
  {
    name: "Только свободные даты",
    description: "Мы ежедневно проверяем календари площадок, отмечая занятое время",
    img: "/assets/img/services/calendar.webp",
  },
  {
    name: "Только реальные цены",
    description:
      "Указав тип и даты мероприятия, вы увидите реальную стоимость аренды площадки",
    img: "/assets/img/services/price.webp",
  },
  {
    name: "Прямой контакт с менеджером",
    description: "Мы отправим вам номер телефона менеджера сразу после оставления заявки",
    img: "/assets/img/services/manager.webp",
  },
]);

onMounted(() => {
  selectPlaces();
});
</script>

<style scoped></style>
