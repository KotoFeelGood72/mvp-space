<template>
  <div class="flex flex-col gap-4">
    <div class="h-64 relative afisha-img rounded-lg overflow-hidden">
      <img
        :src="card.acf.afisha.preview_img.url"
        alt=""
        class="w-full object-cover h-full"
      />
      <IconButtons
        iconName="mdi-light:heart"
        :iconSize="24"
        class="absolute top-2 right-2 z-20 text-white"
      />
      <div
        class="price absolute bottom-3 right-3 bg-white px-4 py-2 rounded-lg font-plex font-medium text-darkText z-20"
      >
        {{ formattedPrice }}
      </div>
    </div>
    <div>
      <div
        class="flex items-center justify-start gap-3 text-gray-500 font-plex"
      >
        <div>{{ formattedDate }}</div>
        <div v-for="item in card.categories.slice(0, 1)">
          {{ item.name }}
        </div>
      </div>
      <div class="mb-2">
        <h3 class="text-20 font-bold text-darkText line-clamp-2">
          {{ card.acf.afisha.title }}
        </h3>
      </div>
      <div class="font-plex text-darkText">
        <p class="line-clamp-2">{{ card.acf.afisha.short_description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButtons from "../Uikit/Buttons/IconButtons.vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
const props = defineProps<{
  card: any;
}>();

const formattedDate = computed(
  () =>
    dayjs(props.card.acf.afisha.date_start, "DD/MM/YYYY") // <--  исходный формат
      .format("D MMM YYYY, dd") // <--  желаемый вид
);

const formattedPrice = computed(() => {
  const raw = Number(props.card.acf.afisha.price);
  if (isNaN(raw)) return props.card.acf.afisha.price; // если пришла строка-текст
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "narrowSymbol", // даёт «₽»
    maximumFractionDigits: 0, // без копеек
  }).format(raw); // «9 500 ₽»
});
</script>

<style scoped>
.afisha-img:before {
  background: linear-gradient(0deg, #3b445366, #3b445300);
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 15;
  width: 100%;
  height: 100%;
}
</style>
