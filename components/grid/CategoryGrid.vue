<template>
  <div class="container">
    <h3 class="mb-10 font-bold text-24">Все типы площадок</h3>

    <div id="grid" class="grid grid-cols-4 gap-6">
      <NuxtLink
        v-for="item in categories"
        :key="item.id"
        to="/"
        class="relative block min-h-[160px] rounded-[13px] overflow-hidden bg-center bg-no-repeat bg-contain grid-category bg-gray-100"
        :style="{
          backgroundImage: `url(/assets/img/categories/${item.img}.webp)` /* ← без ; */,
        }"
      >
        <h4
          class="relative z-10 flex items-start h-full px-5 pt-6 text-darkText font-bold font-plex"
        >
          {{ item.name }}
        </h4>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const categories = ref<any[]>([
  { id: 1, name: "Все площадки", img: "all" },
  { id: 2, name: "Бары", img: "bar" },
  { id: 3, name: "Коворкинги", img: "coworking" },
  { id: 4, name: "Танцевальные залы", img: "dance" },
  { id: 5, name: "Переговорные", img: "meeting" },
  { id: 6, name: "Рестораны", img: "restaurant" },
  { id: 7, name: "Инстаграмные площадки", img: "photo" },
  { id: 8, name: "Крыши", img: "roofs" },
  { id: 9, name: "Арт-пространства", img: "art" },
  { id: 10, name: "Аудитории", img: "audience" },
]);
</script>

<style lang="css">
.grid-category:nth-child(1) {
  grid-column: span 2;
  grid-row: span 2;
}
.grid-category:nth-child(2) {
  grid-row: span 2;
}
.grid-category:nth-child(3) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
.grid-category:nth-child(4) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
.grid-category:nth-child(5) {
  /* grid-column: span 2; */
  grid-row: span 2;
}
.grid-category:nth-child(6) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
.grid-category:nth-child(7) {
  /* grid-column: span 2; */
  grid-row: span 2;
}
.grid-category:nth-child(8) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
.grid-category:nth-child(9) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
.grid-category:nth-child(10) {
  /* grid-column: span 2;
  grid-row: span 2; */
}
</style>
