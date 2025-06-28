<template>
  <div class="home">
    <section id="hero" class="lg:mb-20">
      <div class="container flex items-center justify-between">
        <div class="max-w-[50%]">
          <h1 class="lg:text-40 font-bold mb-10">
            Более<br />
            2 900 площадок для<br />
            вашего мероприятия
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
    <section class="popularlace mb-28">
      <SlidersPlace :places="places" title="Популярное" section="popular" />
    </section>
    <section class="newplace mb-28">
      <SlidersPlace :places="places" title="Новые площадки" section="new" />
    </section>
    <section class="newplace mb-28">
      <CategoryGrid />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace
        :places="places"
        title="Площадки для корпоративов"
        section="corporate"
      />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace
        :places="places"
        title="Площадки для Дня рождения"
        section="happy"
      />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace
        :places="places"
        title="Площадки для детских праздников"
        section="happy"
      />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace :places="places" title="Фотостудии" section="happy" />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace :places="places" title="Кафе и рестораны" section="happy" />
    </section>
    <section class="popularlace mb-28">
      <SlidersPlace
        :places="places"
        title="Тренинги и мастер-классы"
        section="happy"
      />
    </section>
    <section class="popularlace mb-28">
      <StepsGrid />
    </section>
    <section class="popularlace mb-28">
      <FaqsBlock />
    </section>
  </div>
</template>

<script setup lang="ts">
import DefaultForm from "~/components/Uikit/forms/DefaultForm.vue";
import ServicesCard from "~/components/Uikit/cards/ServicesCard.vue";
import SlidersPlace from "~/components/sliders/SlidersPlace.vue";
import CategoryGrid from "~/components/grid/CategoryGrid.vue";
import StepsGrid from "~/components/grid/StepsGrid.vue";
import FaqsBlock from "~/components/blocks/FaqsBlock.vue";
import { usePlacesStore, usePlacesStoreRefs } from "~/store/usePlacesStore";

const { fetchPlaces } = usePlacesStore();
const { places } = usePlacesStoreRefs();

// definePageMeta({ middleware: "auth" });
const ServicesList = ref<any>([
  {
    name: "Гарантия вашего мероприятия",
    description: "В случае накладок подберём новую площадку или вернём деньги",
    img: "/assets/img/services/guarantee.webp",
  },
  {
    name: "Только свободные даты",
    description:
      "Мы ежедневно проверяем календари площадок, отмечая занятое время",
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
    description:
      "Мы отправим вам номер телефона менеджера сразу после оставления заявки",
    img: "/assets/img/services/manager.webp",
  },
]);

onMounted(() => {
  fetchPlaces();
});
</script>

<style scoped></style>
