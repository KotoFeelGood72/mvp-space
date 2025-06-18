<!-- src/components/AuthOtpForm.vue -->
<template>
  <form
    @submit.prevent="step === 1 ? send() : confirm()"
    class="max-w-sm mx-auto space-y-6"
  >
    <!-- Шаг 1 -->
    <div v-if="step === 1" class="space-y-4">
      <h3 class="text-xl font-semibold">Получить код входа</h3>

      <DefaultInput
        v-model="identifier"
        :type="channel === 'email' ? 'email' : 'tel'"
        :placeholder="channel === 'email' ? 'you@example.com' : '+79991234567'"
        label="E-mail или телефон"
        required
      />

      <select v-model="channel" class="input w-full">
        <option value="email">через e-mail</option>
        <option value="sms">через SMS</option>
      </select>

      <button :disabled="auth.loading" class="btn-primary w-full">
        {{ auth.loading ? "Отправляем…" : "Отправить код" }}
      </button>
    </div>

    <!-- Шаг 2 -->
    <div v-else class="space-y-4">
      <h3 class="text-xl font-semibold">Введите код</h3>
      <p class="text-sm text-gray-500">
        Код отправлен на <strong>{{ auth.otpSentTo }}</strong>
      </p>

      <DefaultInput
        v-model="token"
        maxlength="6"
        placeholder="6-значный код"
        label="Код"
        required
      />

      <button :disabled="auth.loading" class="btn-primary w-full">
        {{ auth.loading ? "Проверяем…" : "Войти" }}
      </button>

      <button type="button" @click="reset" class="link text-sm">
        Отправить заново
      </button>
    </div>

    <p v-if="auth.error" class="text-red-500 text-sm">{{ auth.error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import DefaultInput from "../Uikit/inputs/DefaultInput.vue";
import { useAuthStore } from "~/store/useAuthStore";

const auth = useAuthStore();
const step = ref(1);
const identifier = ref("");
const token = ref("");
const channel = ref<"email" | "sms">("email");

/* Переход на 2-й шаг после успешной отправки */
watch(
  () => auth.otpSentTo,
  (val) => {
    if (val) step.value = 2;
  }
);

const send = () => auth.sendOtp(identifier.value.trim(), channel.value);
const confirm = () =>
  auth.verifyOtp(identifier.value.trim(), token.value, channel.value);
const reset = () => {
  step.value = 1;
  auth.otpSentTo = "";
  token.value = "";
};
</script>
