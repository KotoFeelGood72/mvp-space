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
  </div>
</template>

<script setup lang="ts">
import ProfileSidebars from "~/components/shared/ProfileSidebars.vue";
import PageHeadDefault from "~/components/PageHead/PageHeadDefault.vue";
const props = defineProps<{
  title: string;
  text: string;
}>();
</script>

<style scoped></style>
