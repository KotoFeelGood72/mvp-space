<template>
  <NuxtLink
    v-if="iconLink"
    :to="iconLink"
    class="icon-btn"
    @click="handleClick"
  >
    <Icon :name="iconName" />
  </NuxtLink>
  <button v-else type="button" class="icon-btn" @click="handleClick">
    <Icon :name="iconName" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  iconLink?: string;
}>();

const emit = defineEmits<{
  (e: "click", evt: MouseEvent): void;
}>();

function handleClick(evt: MouseEvent) {
  emit("click", evt);
}
</script>
