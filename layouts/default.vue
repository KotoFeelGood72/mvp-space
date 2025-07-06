<template>
  <div class="default-layout">
    <DefaultHeader v-if="!isRouteMarketplaceMapsPage" />
    <NuxtPage />

    <DefaultFooter />
    <transition name="fade-bg">
      <div v-if="isModalActive" class="page-bg" @click="closeAllModals"></div>
    </transition>
    <transition name="fade-bg">
      <AuthModals v-if="modals.auth === true" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from "~/components/shared/Header.vue";
import DefaultFooter from "~/components/shared/Footer.vue";
import AuthModals from "~/components/modals/AuthModals.vue";
import { useModalStore, useModalStoreRefs } from "~/store/useModalStore";
import { useRoute } from "vue-router";

const { modals } = useModalStoreRefs();
const { closeAllModals } = useModalStore();

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

const route = useRoute();

const isRouteMarketplaceMapsPage = computed(() => {
  return route.name === "map-spaces";
});
</script>

<style scoped>
.page-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.fade-bg-enter-active,
.fade-bg-leave-active {
  transition: opacity 0.5s ease;
}

.fade-bg-enter-from,
.fade-bg-leave-to {
  opacity: 0;
}

.fade-bg-enter-to,
.fade-bg-leave-from {
  opacity: 1;
}

.default-layout {
  background: linear-gradient(235deg, #f7f8fb, #fff);
}
</style>
