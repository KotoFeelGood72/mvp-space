<template>
  <div class="container py-8">
    <div class="flex flex-col gap-2 mb-10">
      <h1 class="text-30 font-bold text-darkText">
        Афиша мероприятий в Москве
      </h1>
      <span>8 событий</span>
    </div>
    <div class="grid grid-cols-3 gap-x-7 gap-y-14">
      <CardsAfish
        v-for="(item, i) in afisha"
        :key="'afisha-item-' + i"
        :card="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardsAfish from "~/components/cards/CardsAfish.vue";
import { useAfishaStore, useAfishaStoreRefs } from "~/store/useAfishaStore";

const { fetchAfisha } = useAfishaStore();
const { afisha } = useAfishaStoreRefs();

onMounted(() => {
  fetchAfisha();
});
</script>
