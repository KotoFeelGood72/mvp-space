<!-- src/components/AuthLoginForm.vue -->
<template>
  <form class="auth max-w-sm mx-auto" @submit.prevent="handleLogin">
    <header class="mb-6">
      <h3 class="text-xl font-semibold">Вход</h3>
      <p class="text-muted">Введите e-mail (или телефон) и пароль</p>
    </header>

    <div class="space-y-4">
      <DefaultInput
        v-model="email"
        type="email"
        placeholder="you@example.com"
        label="E-mail"
        required
      />

      <DefaultInput
        v-model="password"
        type="password"
        placeholder="••••••••"
        label="Пароль"
        required
      />
    </div>

    <button
      class="btn-primary w-full mt-6 disabled:opacity-60"
      :disabled="auth.loading"
    >
      {{ auth.loading ? "Входим…" : "Войти" }}
    </button>

    <p v-if="auth.error" class="mt-3 text-sm text-red-500">
      {{ auth.error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DefaultInput from "../Uikit/inputs/DefaultInput.vue";
import { useAuthStore } from "~/store/useAuthStore";

/* локальные реактивные поля формы */
const email = ref("");
const password = ref("");

/* подключаем стор авторизации */
const auth = useAuthStore();

const handleLogin = async () => {
  await auth.signIn(email.value.trim(), password.value);
  // По успеху можно редиректнуть:
  // if (auth.isAuth) router.push('/')
};
</script>
