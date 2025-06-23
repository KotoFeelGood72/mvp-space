<template>
  <div class="CardPlace">
    <div>
      <IconButtons iconName="mdi-light:heart" />
      <!-- <img :src="card.img" /> -->
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="1"
        :space-between="12"
        :navigation="{
          prevEl: '.arrow-prev-' + card.id,
          nextEl: '.arrow-next-' + card.id,
        }"
      >
        <swiper-slide v-for="(img, index) in card.places_gallery" :key="index">
          <img :src="img.img" alt="" />
        </swiper-slide>
      </Swiper>

      <!-- Навигационные кнопки (со своими классами) -->
      <div :class="'arrow-prev-' + card.id" class="swiper-button-prev"></div>
      <div :class="'arrow-next-' + card.id" class="swiper-button-next"></div>
    </div>

    <div>
      <div>
        <!-- <div>{{ card.address }}</div> -->
        <ul>
          <li>
            <div class="icon"><Icon name="noto:star" /></div>
            <p>5.0</p>
          </li>
          <li>2 отзыва</li>
        </ul>
      </div>

      <div>
        <!-- <p>{{ card.type }}</p>
        <h3>{{ card.title }}</h3> -->
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

<style scoped lang="scss"></style>
