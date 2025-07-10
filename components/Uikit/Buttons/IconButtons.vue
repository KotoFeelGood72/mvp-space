<template>
  <NuxtLink
    v-if="iconLink"
    :to="iconLink"
    class="icon-btn"
    @click="handleClick"
  >
    <Icon :name="iconName" :size="iconSize" />
  </NuxtLink>
  <button
    v-else
    type="button"
    class="icon-btn flex items-center justify-center"
    @click="handleClick"
  >
    <Icon :name="iconName" :size="iconSize" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  iconLink?: string;
  iconSize?: number;
}>();

const emit = defineEmits<{
  (e: "click", evt: MouseEvent): void;
}>();

function handleClick(evt: MouseEvent) {
  emit("click", evt);
}
</script>
