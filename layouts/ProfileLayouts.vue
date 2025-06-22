<template>
  <div>
    <PageHeadDefault :title="title" :text="text" />
    <div class="container flex gap-24">
      <div>
        <ProfileSidebars />
      </div>
      <div>
        <slot />
      </div>
    </div>
    <transition name="fade-bg">
      <CreateSpaceModals v-if="modals.createSpace === true" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import ProfileSidebars from "~/components/shared/ProfileSidebars.vue";
import PageHeadDefault from "~/components/PageHead/PageHeadDefault.vue";
import CreateSpaceModals from "~/components/modals/CreateSpaceModals.vue";

import { useModalStore, useModalStoreRefs } from "~/store/useModalStore";

const { modals } = useModalStoreRefs();
const { closeAllModals } = useModalStore();

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});
const props = defineProps<{
  title: string;
  text: string;
}>();
</script>

<style scoped></style>
