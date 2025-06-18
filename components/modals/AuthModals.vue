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
      <div v-if="step === 1" class="">
        <div class="flex flex-col gap-2 mb-6">
          <h3 class="text-xl font-semibold">Вход</h3>
          <p>Введите телефон или email для того, чтобы войти</p>
        </div>

        <DefaultInput
          v-model="identifier"
          type="email"
          placeholder="you@example.com"
          class="mb-6"
        />
        <Buttons
          :buttonName="auth.loading ? 'Отправляем…' : 'Отправить код'"
        ></Buttons>
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import DefaultInput from "../Uikit/inputs/DefaultInput.vue";
import { useAuthStore } from "~/store/useAuthStore";
import Buttons from "../Uikit/Buttons/Buttons.vue";

const auth = useAuthStore();
const step = ref(1);
const identifier = ref("");
const token = ref("");
const channel = ref<"email" | "sms">("email");

watch(
  () => auth.otpSentTo,
  (val) => {
    if (val) step.value = 2;
  }
);

const send = () => auth.sendOtp(identifier.value.trim());
const confirm = () => auth.verifyOtp(identifier.value.trim(), token.value);
const reset = () => {
  step.value = 1;
  auth.otpSentTo = "";
  token.value = "";
};
</script>
