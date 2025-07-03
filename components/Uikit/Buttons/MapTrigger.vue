<template>
  <div class="relative h-44 flex items-center justify-center">
    <img src="/assets/img/map.jpg" class="w-full" />

    <div
      class="absolute bottom-5 left-5 flex items-center justify-center px-12 py-4 bg-white shadow-custom-deep rounded-xl gap-3 font-semibold text-darkText cursor-pointer"
    >
      <Icon name="rivet-icons:map-pin-solid" :size="24" class="text-orange" />
      <p>Площадки на карте</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Buttons from "./Buttons.vue";
</script>
