<template>
  <div class="bg-white rounded-xl shadow-xl py-4 px-5 w-60">
    <ul class="space-y-2 text-gray-800">
      <li v-for="(item, i) in menuItems" :key="i">
        <NuxtLink
          :to="item.link"
          class="block w-full text-left hover:text-blue-600 transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
      <li>
        <button
          @click="logout"
          class="block w-full text-left text-red-500 hover:text-red-600 transition-colors"
        >
          Выйти
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/useAuthStore";

const auth = useAuthStore();

const menuItems = [
  { label: "Профиль", link: "/profile" },
  { label: "Мои заявки", link: "/cabinet/requests" },
  { label: "Мои приглашения", link: "/cabinet/invites" },
  { label: "Мои Идеи", link: "/cabinet/ideas" },
  { label: "Моя Афиша", link: "/cabinet/afisha" },
  { label: "Мои event-услуги", link: "/cabinet/events" },
  { label: "Рекламные возможности", link: "/cabinet/ads" },
  { label: "Сообщения", link: "/cabinet/messages" },
];

const logout = async () => {
  await auth.logout();
};
</script>
