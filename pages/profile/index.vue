<template>
  <ProfileLayouts title="Профиль" text="Профиль" v-if="user">
    <div class="space-y-6 mb-5">
      <!-- Avatar + Upload -->
      <div class="flex items-center gap-4">
        <div
          class="w-20 h-20 bg-light rounded-xl overflow-hidden flex items-center justify-center"
        >
          <img
            v-if="avatarPreview"
            :src="avatarPreview"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <img
            v-else
            src="@/assets/img/profile.svg"
            class="w-full h-full object-cover"
          />
        </div>
        <label class="cursor-pointer text-sm text-blue-600 hover:underline">
          Загрузить фото
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
          />
        </label>
      </div>

      <!-- Form Fields -->
      <div class="grid grid-cols-2 gap-5">
        <DefaultInput placeholder="Имя" v-model="user.first_name" />
        <DefaultInput placeholder="E-Mail" v-model="user.email" />
      </div>

      <div class="grid grid-cols-2 gap-5">
        <DefaultInput placeholder="Отчество" v-model="user.father_name" />
        <DefaultInput placeholder="Номер телефона" v-model="user.phone" />
      </div>

      <div class="grid grid-cols-2 gap-5">
        <DefaultInput placeholder="Фамилия" v-model="user.last_name" />
        <DefaultSelect
          placeholder="Выбрать пол"
          :options="genderOptions"
          v-model="user.gender"
        />
      </div>

      <div class="grid grid-cols-2 gap-5">
        <DefaultInput placeholder="Дата рождения" v-model="user.birthdate" />
        <DefaultSelect
          placeholder="Часовой пояс"
          :options="timezoneOptions"
          v-model="user.timezone"
        />
      </div>
    </div>

    <Buttons buttonName="Сохранить" @click="saveProfile" />
  </ProfileLayouts>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupabaseClient, useSupabaseUser } from "#imports";
import ProfileLayouts from "@/layouts/ProfileLayouts.vue";
import DefaultInput from "~/components/Uikit/inputs/DefaultInput.vue";
import DefaultSelect from "~/components/Uikit/inputs/DefaultSelect.vue";
import Buttons from "~/components/Uikit/Buttons/Buttons.vue";
import { useUserStore, useUserStoreRefs } from "~/store/useUserSrore";
import { useAuthStoreRefs } from "~/store/useAuthStore";

const { user: userAuth } = useAuthStoreRefs();
const supabase = useSupabaseClient();
const store = useUserStore();

const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);

const { user } = useUserStoreRefs();

const genderOptions = [
  { label: "Женский", value: "woman" },
  { label: "Мужской", value: "man" },
];

const timezoneOptions = [
  { label: "Россия, Москва (+03:00)", value: "MSK" },
  { label: "Россия, Екатеринбург (+05:00)", value: "YEKT" },
  { label: "Россия, Новосибирск (+07:00)", value: "NOVT" },
];

async function fetchUserFromStore() {
  try {
    const userData = await store.getUserById(userAuth.value.id);
    if (userData.avatar) {
      avatarPreview.value = userData.avatar;
    }
  } catch (error) {
    console.error("Ошибка загрузки данных пользователя:", error);
  }
}

onMounted(() => {
  fetchUserFromStore();
});

// 🖼️ Загрузка аватара
async function uploadAvatar(file: File): Promise<string> {
  const fileName = `avatars/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (error) throw new Error("Ошибка загрузки аватара: " + error.message);

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
  return data.publicUrl;
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
  }
}

// 💾 Сохранение профиля
async function saveProfile() {
  try {
    let avatarUrl = "";

    if (avatarFile.value) {
      avatarUrl = await uploadAvatar(avatarFile.value);
    }

    const updatedUser = {
      ...store.user,
      avatar: avatarUrl || avatarPreview.value || null,
    };

    await store.createUser(updatedUser);
    alert("Профиль сохранён!");
  } catch (err) {
    console.error(err);
    alert("Ошибка сохранения профиля");
  }
}
</script>
