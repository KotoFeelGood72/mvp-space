<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "@/components/Uikit/Visuals/Logo.vue";
import MenuLink from "@/components/Uikit/menu/MenuLink.vue";
import { useModalStore } from "~/store/useModalStore";
import { useAuthStore, useAuthStoreRefs } from "~/store/useAuthStore";
import ProfileDropdown from "../Uikit/Dropdown/ProfileDropdown.vue";

const { openModal } = useModalStore();
const { user } = useAuthStoreRefs();
const toggleProfileDropdown = ref<boolean>(false);

const menuList = [
  { menuLink: "/lofts", menuName: "Выбрать зал" },
  { menuLink: "/basg", menuName: "Bash+" },
  { menuLink: "/sales", menuName: "Акции" },
  { menuLink: "/ideas", menuName: "Идеи" },
  { menuLink: "/afisha", menuName: "Афиша" },
  { menuLink: "/event", menuName: "Event-услуги" },
  {
    menuLink: "/",
    menuName: "Ещё",
    children: [
      { menuLink: "/likes", menuName: "Избранное" },
      { menuLink: "/view", menuName: "Вы смотрели" },
      { menuLink: "/contacts", menuName: "Контакты" },
    ],
  },
  // { menuLink: "/add-places", menuName: "Добавить площадку" },
];

const open = ref<number | null>(null);

function toggle(i: number) {
  open.value = open.value === i ? null : i;
}

function handleOutside(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest("#header-menu")) open.value = null;
}
onMounted(() => window.addEventListener("click", handleOutside));
onUnmounted(() => window.removeEventListener("click", handleOutside));
</script>

<template>
  <header id="header">
    <div class="container flex items-center justify-between py-6">
      <Logo />

      <nav id="header-menu" class="flex items-center justify-center gap-6">
        <div
          v-for="(item, i) in menuList"
          :key="'menu-item-' + i"
          class="menu-item"
        >
          <MenuLink
            :menuLink="item.menuLink"
            class="menu-link"
            @click.stop="item.children ? toggle(i) : null"
          >
            {{ item.menuName }}
            <span v-if="item.children" class="chevron">▾</span>
          </MenuLink>
          <ul
            v-if="item.children"
            class="dropdown"
            :class="{ show: open === i }"
            @click.stop
          >
            <li
              v-for="(child, j) in item.children"
              :key="'submenu-' + j"
              class="dropdown-item"
            >
              <MenuLink :menuLink="child.menuLink">
                {{ child.menuName }}
              </MenuLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- auth block -->
      <div class="auth flex items-center justify-center gap-2 relative">
        <template v-if="!user">
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="openModal('auth')"
          >
            <Icon name="stash:signin-light" :size="24" />
            <p>Войти</p>
          </div>
        </template>

        <template v-else>
          <div
            class="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer"
            @click="toggleProfileDropdown = !toggleProfileDropdown"
          >
            <img src="@/assets/img/profile.svg" alt="" />
            <div class="flex flex-col">
              <span class="text-14">Гость</span>
              <span class="text-12 opacity-50">Клиент</span>
            </div>
          </div>
        </template>
        <ProfileDropdown
          class="absolute top-[100%] left-0"
          v-if="toggleProfileDropdown"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.menu-item {
  position: relative;
}
.chevron {
  margin-left: 0.25rem;
}

/* дропдаун */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  padding: 0.5rem 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 100;
}
.dropdown.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.dropdown-item {
  padding: 0 0.75rem;
  white-space: nowrap;
}
.dropdown-item + .dropdown-item {
  margin-top: 0.25rem;
}
.dropdown-item a {
  display: block;
  padding: 0.25rem 0;
}
</style>
