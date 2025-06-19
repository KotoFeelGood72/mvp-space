<template>
  <ProfileLayouts pageName="Профиль">
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <!-- Левая колонка -->
      <div class="space-y-4">
        <!-- Фото -->
        <div class="flex items-start gap-4">
          <div
            class="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center"
          >
            <Icon name="mdi:account" class="text-gray-400 text-4xl" />
          </div>
          <div>
            <p class="text-sm text-gray-700 font-medium">Загрузите фото</p>
            <p class="text-xs text-gray-400">JPEG, PNG</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Имя"
          class="input"
          v-model="form.firstName"
        />
        <input
          type="text"
          placeholder="Отчество"
          class="input"
          v-model="form.middleName"
        />
        <input
          type="text"
          placeholder="Фамилия"
          class="input"
          v-model="form.lastName"
        />
        <input
          type="date"
          placeholder="Дата рождения"
          class="input"
          v-model="form.birthdate"
        />
      </div>

      <!-- Правая колонка -->
      <div class="space-y-4">
        <input
          type="email"
          placeholder="Email"
          class="input"
          v-model="form.email"
        />
        <input
          type="tel"
          placeholder="Номер телефона"
          class="input"
          v-model="form.phone"
        />

        <select class="input" v-model="form.gender">
          <option disabled value="">Выбрать пол</option>
          <option>Мужской</option>
          <option>Женский</option>
        </select>

        <select class="input" v-model="form.timezone">
          <option disabled value="">Часовой пояс</option>
          <option>Россия, Москва (+03:00)</option>
          <option>Россия, Екатеринбург (+05:00)</option>
          <option>Другое</option>
        </select>
      </div>

      <!-- Кнопка -->
      <div class="md:col-span-2">
        <button
          type="submit"
          class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-8 py-3 rounded-full"
        >
          Сохранить
        </button>
      </div>
    </form>
  </ProfileLayouts>
</template>

<script setup lang="ts">
import ProfileLayouts from "@/layouts/ProfileLayouts.vue";

const form = reactive({
  firstName: "Гость",
  middleName: "",
  lastName: "",
  birthdate: "",
  email: "",
  phone: "+7",
  gender: "",
  timezone: "Россия, Москва (+03:00)",
});
</script>
