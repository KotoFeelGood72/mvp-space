<template>
  <div
    class="auth fixed top-0 left-0 w-full h-full flex items-center justify-center z-10"
  >
    <form
      @submit.prevent="step === 1 ? send() : confirm()"
      class="relative bg-white p-10 rounded-2xl max-w-[500px] w-full"
    >
      <div
        class="close absolute top-4 right-6 text-xl cursor-pointer text-gray"
      >
        <Icon name="material-symbols:close" />
      </div>

      <div v-if="step === 1">
        <div class="flex flex-col gap-2 mb-6">
          <h3 class="text-xl font-semibold">Вход</h3>
          <p>Введите email для того, чтобы войти</p>
        </div>

        <DefaultInput
          v-model="identifier"
          type="email"
          placeholder="you@example.com"
          class="mb-6"
        />
        <Buttons :buttonName="auth.loading ? 'Отправляем…' : 'Отправить код'" />
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

        <Buttons :buttonName="auth.loading ? 'Проверяем…' : 'Войти'" />

        <button
          type="button"
          class="link text-sm"
          @click="reset"
          :disabled="timer > 0"
        >
          <template v-if="timer > 0">
            Можно отправить повторно через {{ timer }} сек.
          </template>
          <template v-else> Отправить заново </template>
        </button>
      </div>

      <p v-if="auth.error" class="text-red-500 text-sm">{{ auth.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import DefaultInput from "../Uikit/inputs/DefaultInput.vue";
import { useAuthStore } from "~/store/useAuthStore";
import Buttons from "../Uikit/Buttons/Buttons.vue";

const auth = useAuthStore();
const step = ref(1);
const identifier = ref("");
const token = ref("");
const timer = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const startTimer = (seconds = 60) => {
  timer.value = seconds;
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
};

const send = async () => {
  await auth.sendOtp(identifier.value.trim());
  if (!auth.error) {
    step.value = 2;
    startTimer();
  }
};

const confirm = async () => {
  await auth.verifyOtp(identifier.value.trim(), token.value);
};

const reset = async () => {
  token.value = "";
  await send();
};

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>
