<template>
  <div class="card">
    <component
      :is="link ? link : 'div'"
      v-bind="link ? { to: link } : {}"
      class="card__media-wrapper"
    >
      <NuxtImg
        v-if="imageFill"
        :src="imageFill"
        alt=""
        class="card__image"
        fill
      />
      <div v-else class="card__placeholder"></div>
    </component>
    <h3 class="card__title">{{ title }}</h3>
    <ul v-if="links?.length" class="card__links">
      <li v-for="(item, idx) in links" :key="idx">
        <NuxtLink :to="item.href" class="card__link">{{ item.text }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageFill: string | null;
  title: string;
  link: string | null;
  links?: Array<{ text: string; href: string }>;
}>();
</script>
