<template>
  <div class="">
    <div class="container">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h3 class="text-24 text-darkText font-bold">{{ title }}</h3>
        </div>
        <div>
          <div class="prev" :class="'arrow-prev' + section.name"></div>
          <div class="next" :class="'arrow-next' + section.name"></div>
        </div>
      </div>
      <Swiper
        class="!px-3 !py-3 !-mx-3 !-my-3"
        :modules="[Navigation]"
        :slides-per-view="3.1"
        :space-between="12"
        :navigation="{
          prevEl: '.arrow-prev' + section.name,
          nextEl: '.arrow-next' + section.name,
        }"
      >
        <swiper-slide v-for="(place, index) in places" :key="index"
          ><CardPlace :card="place" :short="false" />
        </swiper-slide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import CardPlace from "../Uikit/cards/CardPlace.vue";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps<{
  places: any;
  section: any;
  title: string;
}>();
</script>

<style scoped lang="scss"></style>
