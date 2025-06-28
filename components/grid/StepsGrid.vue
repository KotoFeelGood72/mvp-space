<template>
  <div class="container">
    <div
      class="grid grid-cols-3 gap-14 bg-gray-100 shadow-main rounded-2xl py-7 px-5"
    >
      <div
        v-for="(item, i) in steps"
        :key="'steps-item-' + i"
        class="flex items-center flex-col gap-6 text-center"
      >
        <div>
          <img :src="`/assets/img/steps/${item.img}.webp`" alt="" />
        </div>
        <div class="flex flex-col gap-2 font-plex">
          <h3 class="text-16 text-darkText font-bold">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = ref<any>([
  {
    img: "h1",
    title: "Оставьте заявку",
    description: "Выберите даты, время и тип мероприятия",
  },
  {
    img: "h2",
    title: "С вами свяжется менеджер",
    description:
      "Он подтвердит заявку, ответит на вопросы, пригласит на просмотр",
  },
  {
    img: "h3",
    title: "Оплатите площадку",
    description: "После оплаты площадка будет забронирована за вами",
  },
]);
</script>
