<script setup lang="ts">
import Logo from "@/components/Uikit/Visuals/Logo.vue";
import MenuLink from "@/components/Uikit/menu/MenuLink.vue";
import Buttons from "@/components/Uikit/Buttons/Buttons.vue";
import IconButtons from "../Uikit/Buttons/IconButtons.vue";

interface MenuItem {
  menuLink: string;
  menuName: string;
  menuIcon: string;
  menuColor: string;
}

const menuList: MenuItem[] = [
  {
    menuLink: "/lofts",
    menuName: "Лофты",
    menuIcon: "mdi:warehouse",
    menuColor: "#66C966",
  },
  {
    menuLink: "/offices",
    menuName: "Кабинеты",
    menuIcon: "mdi:office-building",
    menuColor: "#76C0A1",
  },
  {
    menuLink: "/coworkings",
    menuName: "Коворкинги",
    menuIcon: "mdi:account-group",
    menuColor: "#58C5F8",
  },
  {
    menuLink: "/halls",
    menuName: "Залы",
    menuIcon: "mdi:conference",
    menuColor: "#F7C23A",
  },
  {
    menuLink: "/photo-studios",
    menuName: "Фотостудии",
    menuIcon: "mdi:camera-outline",
    menuColor: "#335FFF",
  },
  {
    menuLink: "/sport",
    menuName: "Спорт",
    menuIcon: "mdi:run",
    menuColor: "#FF7A30",
  },
  {
    menuLink: "/beauty",
    menuName: "Бьюти",
    menuIcon: "mdi:lipstick",
    menuColor: "#E91E63",
  },
  {
    menuLink: "/banquet-halls",
    menuName: "Банкетные залы",
    menuIcon: "mdi:glass-champagne",
    menuColor: "#795548",
  },
];

const actionsLink = ref<any>([
  { name: "mage:message-round", link: "/" },
  { name: "solar:heart-outline", link: "/" },
]);
</script>

<template>
  <header id="header">
    <div class="container">
      <Logo />
      <nav id="header-menu">
        <MenuLink
          v-for="(item, i) in menuList"
          :key="'header-nav-menu-item' + i"
          :menuLink="item.menuLink"
          :menuIcon="item.menuIcon"
          :menuColor="item.menuColor"
          >{{ item.menuName }}
        </MenuLink>
      </nav>
      <Buttons buttonName="Арендодателям" />
      <div>
        <IconButtons
          v-for="(item, i) in actionsLink"
          :iconLink="item.link"
          :iconName="item.name"
          :key="'action-links-' + i"
        />
      </div>
      <div>
        <IconButtons iconName="iconamoon:menu-burger-horizontal" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* При необходимости добавьте стили для иконок и текста */
#header-menu {
  display: flex;
  gap: 1.5rem;
}
#header-menu span {
  margin-left: 0.5rem;
  font-weight: 600;
}
</style>
