<template>
  <div class="container">
    <div>
      <ProfileSidebars :page-name="pageName" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSidebars from "~/components/shared/ProfileSidebars.vue";
const props = defineProps<{
  pageName: string;
}>();
</script>

<style scoped></style>
