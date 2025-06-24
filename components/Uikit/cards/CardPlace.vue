<template>
  <div
    class="CardPlace rounded-2xl bg-white overflow-hidden shadow-md"
    v-if="card"
  >
    <div class="relative h-60 group">
      <IconButtons
        iconName="mdi-light:heart"
        :iconSize="24"
        class="absolute top-2 right-2 z-10 text-white"
      />
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="1"
        :space-between="12"
        class="h-full"
        :navigation="{
          prevEl: '.prev-' + card.id,
          nextEl: '.next-' + card.id,
        }"
      >
        <swiper-slide
          v-for="(img, index) in card.places_gallery"
          :key="index"
          class="h-full"
        >
          <img :src="img.img" alt="" class="w-full h-full object-cover" />
        </swiper-slide>
      </Swiper>

      <div
        class="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-between z-10 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          :class="'prev-' + card.id"
          class="next bg-white text-darkText w-10 h-10 flex items-center justify-center rounded-full swiper-button-disabled:opacity-50 swiper-button-disabled:cursor-not-allowed"
        >
          <Icon name="line-md:arrow-left" :size="20" />
        </div>
        <div
          :class="'next-' + card.id"
          class="prev bg-white text-darkText w-10 h-10 flex items-center justify-center rounded-full"
        >
          <Icon name="line-md:arrow-right" :size="20" />
        </div>
      </div>
    </div>

    <div class="px-6 pb-8 pt-6">
      <div class="grid grid-cols-2 gap-2 mb-5">
        <div>{{ card.street }}</div>
        <ul class="flex items-center justify-start gap-2">
          <li class="flex items-center justify-start gap-1">
            <div class="icon"><Icon name="noto:star" /></div>
            <p>5.0</p>
          </li>
          <li>2 отзыва</li>
        </ul>
      </div>

      <div class="flex flex-col gap-1">
        <p class="text-14 text-gray-500">{{ card?.places_types?.title }}</p>
        <h3 class="text-18 font-bold text-darkText">{{ card.title }}</h3>
      </div>

      <div>
        <ul>
          <!-- <li v-for="(item, i) in card.characters" :key="i">
            <span>{{ item.label }}</span>
            <div>
              <div class="icon"><Icon :name="item.icon" /></div>
              <p>{{ item.param }}</p>
            </div>
          </li> -->
        </ul>
        <div>{{ card.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButtons from "../Buttons/IconButtons.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
defineProps<{
  card: any;
}>();
</script>

<style scoped>
.swiper-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
