<template>
  <div
    class="bg-light rounded-3xl p-6 w-64 min-h-[400px] flex flex-col justify-between py-7 px-9 w-full"
  >
    <ul class="space-y-4 text-gray-700 text-[16px] font-medium">
      <li v-for="item in menuItems" :key="item.label">
        <NuxtLink :to="item.link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
    <Buttons button-name="Создать площадку" @click="openModal('createSpace')" />
    <button
      @click="logout"
      class="mt-10 flex items-center text-gray-400 hover:text-gray-600 transition text-sm"
    >
      <Icon name="material-symbols:logout" class="mr-2" />
      Выйти
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/useAuthStore";
import { useModalStore } from "~/store/useModalStore";
import Buttons from "../Uikit/Buttons/Buttons.vue";

const auth = useAuthStore();

const menuItems = [
  { label: "Профиль", link: "/profile" },
  { label: "Безопасность", link: "/profile/security" },
  { label: "Интеграции", link: "/profile/integrations" },
  { label: "Реквизиты", link: "/profile/requisites" },
  { label: "Уведомления", link: "/profile/notifications" },
];

const logout = async () => {
  await auth.logout();
  location.href = "/"; // или router.push('/'), если используешь useRouter
};

const { openModal } = useModalStore();
</script>
