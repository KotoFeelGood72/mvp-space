<template>
  <DefaultHeader />
  <NuxtPage />
  <AuthModals />
  <DefaultFooter />
  <transition name="fade-bg">
    <div v-if="isModalActive" class="page-bg" @click="closeAllModals"></div>
  </transition>
</template>

<script setup lang="ts">
import DefaultHeader from "~/components/shared/DefaultHeader.vue";
import DefaultFooter from "~/components/shared/DefaultFooter.vue";
import AuthModals from "~/components/modals/AuthModals.vue";
import { useModalStore, useModalStoreRefs } from "~/store/useModalStore";

const { modals } = useModalStoreRefs();
const { closeAllModals } = useModalStore();

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
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
  z-index: 100;
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
</style>
