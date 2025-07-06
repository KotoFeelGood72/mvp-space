<template>
  <div
    class="CardPlace rounded-2xl bg-white overflow-hidden shadow-main font-plex"
    v-if="card"
  >
    <div class="relative group" :class="{ 'h-60': !short, 'h-32': short }">
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
          v-for="(img, index) in card.acf.space.gallery"
          :key="index"
          class="h-full"
        >
          <img :src="img.url" alt="" class="w-full h-full object-cover" />
        </swiper-slide>
      </Swiper>

      <div
        class="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-between z-10 w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          :class="[
            'prev-' + card.id,
            { 'w-10 h-10 ': !short, 'w-8 h-8': short },
          ]"
          class="next bg-white text-darkText flex items-center justify-center rounded-full swiper-button-disabled:opacity-50 swiper-button-disabled:cursor-not-allowed"
        >
          <Icon name="line-md:arrow-left" :size="short ? 20 : 14" />
        </div>
        <div
          :class="[
            'next-' + card.id,
            { 'w-10 h-10 ': !short, 'w-8 h-8': short },
          ]"
          class="prev bg-white text-darkText flex items-center justify-center rounded-full"
        >
          <Icon name="line-md:arrow-right" :size="short ? 20 : 14" />
        </div>
      </div>
    </div>

    <div
      class=""
      :class="{ 'px-6 pb-8 pt-6': !short, 'px-4 pb-6 pt-4': short }"
    >
      <div
        class="flex items-center justify-between gap-2"
        :class="{ 'mb-5': !short, 'mb-2': short }"
      >
        <div class="flex-grow">{{ card.acf.space.short_address }}</div>
        <ul class="flex items-center justify-end gap-2">
          <li class="flex items-center justify-start gap-1">
            <div class="icon"><Icon name="noto:star" /></div>
            <p>5.0</p>
          </li>
          <li v-if="!short">2 отзыва</li>
        </ul>
      </div>

      <div class="flex flex-col gap-1">
        <p
          class="text-14 text-gray-500"
          v-for="item in card.categories.slice(0, 1)"
          :key="item.id"
        >
          {{ item.name }}
        </p>
        <h3 class="text-18 font-bold text-darkText">{{ card.title }}</h3>
      </div>

      <div
        class=""
        :class="{
          'border-t border-[##eee] mt-6 pt-6': !short,
          'mt-4 pt-4': short,
        }"
      >
        <ul class="grid grid-cols-3 gap-4 mb-6" v-if="!short">
          <li
            v-for="(item, i) in card.acf.space.short_params.slice(0, 3)"
            :key="i"
          >
            <span class="text-lightText text-[13px] block mb-1">{{
              item.icon.label
            }}</span>
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 flex items-center justify-center">
                <img :src="`/assets/icons/${item.icon.value}.svg`" alt="" />
              </div>
              <p class="text-14">{{ item.value }}</p>
            </div>
          </li>
        </ul>
        <div class="text-18 text-darkText font-bold">{{ priceRange }}</div>
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
const props = defineProps<{
  card: any;
  short: boolean;
}>();

const priceRange = computed(() => {
  const group = props.card?.acf?.space.price_group;

  if (!group) return "";

  const nums = Object.values(group)
    .map((n) => Number(n))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);

  if (!nums.length) return "";
  const fmt = new Intl.NumberFormat("ru-RU");
  return `от ${fmt.format(nums[0])} до ${fmt.format(nums.at(-1)!)} ₽ / час`;
});
</script>

<style scoped>
.swiper-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
