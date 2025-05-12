<template>
  <div class="menu-link" :style="{ color: menuColor }">
    <NuxtLink :to="menuLink">
      <div>
        <Icon :name="menuIcon" />
      </div>
      <p><slot /></p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuLink: string;
  menuIcon: string;
  menuColor: string;
}>();
</script>

<style scoped></style>
