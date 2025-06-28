<template>
  <div class="relative w-full font-plex">
    <div
      @click="toggleCalendar"
      class="py-3 px-4 bg-white rounded-[13px] shadow-input flex items-center justify-between"
    >
      <span>{{ displayValue || "Дата и время" }}</span>
      <div class="flex items-center justify-center">
        <Icon
          name="lets-icons:date-today-light"
          class="inline-block ml-2 text-gray-500"
          size="20"
        />
      </div>
    </div>

    <div
      v-if="showCalendar"
      class="absolute top-0 left-0 bg-white shadow-input rounded-[13px] p-6 text-lightText z-20"
      :class="{ 'lg:w-[696px] grid grid-cols-2 gap-10': showTime }"
    >
      <div>
        <div class="flex justify-between items-center mb-2">
          <button @click="prevMonth" class="flex items-center justify-center">
            <Icon name="solar:arrow-left-linear" :size="20" />
          </button>
          <span class="text-16 text-darkText">{{ monthLabel }}</span>
          <button @click="nextMonth" class="flex items-center justify-center">
            <Icon name="solar:arrow-right-linear" :size="20" />
          </button>
        </div>

        <div class="grid grid-cols-7 gap-2 mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="flex items-center justify-center text-14"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-2 text-14">
          <template
            v-for="(day, idx) in days"
            :key="day.date ?? `blank-${idx}`"
          >
            <div v-if="day.blank" class="w-[34px] h-[34px]" />

            <div
              v-else
              @click="selectDate(day.date, day.disabled)"
              class="w-[34px] h-[34px] flex items-center justify-center rounded text-16"
              :class="[
                day.disabled
                  ? 'cursor-default text-gray-300 select-none'
                  : 'cursor-pointer text-darkText hover:bg-gray-100',
                isSelected(day.date) && !day.disabled ? 'text-orange ' : '',
              ]"
            >
              {{ day.label }}
            </div>
          </template>
        </div>
      </div>

      <div v-if="showTime" class="flex flex-col gap-6">
        <div class="flex flex-col gap-6 flex-grow">
          <Selects v-model="startHour" label="Начало" :options="timeOptions" />
          <Selects v-model="endHour" label="Конец" :options="timeOptions" />
        </div>
        <Buttons buttonName="Сохранить" @click="save" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Selects from "../selects/Selects.vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import Buttons from "../Uikit/Buttons/Buttons.vue";

dayjs.locale("ru");

const props = defineProps<{
  modelValue: any;
}>();
const emit = defineEmits(["update:modelValue"]);

const showCalendar = ref(false);
const showTime = ref(false);

const calendarMonth = ref(dayjs());

const startHour = ref("01:00");
const endHour = ref("02:00");

/* ▼ массив «00:00 … 23:00» для селектов */
const timeOptions = Array.from({ length: 24 }, (_, h) => {
  const v = h.toString().padStart(2, "0") + ":00";
  return { label: v, value: v };
});

/* ──────────────────────────────────────────────────────────── */
const today = dayjs().startOf("day"); // 2025-06-28 00:00
const selectedDate = ref(today.format("YYYY-MM-DD")); // активна «сегодня»
/* ──────────────────────────────────────────────────────────── */

// keep local copy for display while parent проп обновляется асинхронно
const internalValue = ref<any>({ start: null, end: null });
watch(
  () => props.modelValue,
  (val) => {
    if (val) internalValue.value = val;
  },
  { immediate: true }
);

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
  showTime.value = false;
};

const prevMonth = () => {
  calendarMonth.value = calendarMonth.value.subtract(1, "month");
};

const nextMonth = () => {
  calendarMonth.value = calendarMonth.value.add(1, "month");
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const days = computed(() => {
  const start = calendarMonth.value.startOf("month");
  const totalDays = calendarMonth.value.daysInMonth();
  const firstWeekday = (start.day() + 6) % 7; // Пн = 0

  const res: {
    date: string | null;
    label: string;
    blank: boolean;
    disabled: boolean;
  }[] = [];

  for (let i = 0; i < firstWeekday; i++)
    res.push({ date: null, label: "", blank: true, disabled: true });

  for (let d = 1; d <= totalDays; d++) {
    const date = start.date(d);
    res.push({
      date: date.format("YYYY-MM-DD"),
      label: String(d),
      blank: false,
      disabled: date.isBefore(today), // ← до сегодняшнего
    });
  }
  return res;
});

function selectDate(date: string | null, disabled = false) {
  if (!date || disabled) return; // заблокировано → ничего
  selectedDate.value = date;
  // showCalendar.value = false;
  showTime.value = true;
}

const isSelected = (date: any) => selectedDate.value === date;
const formatHour = (h: any) => h.toString().padStart(2, "0") + ":00";

const save = () => {
  const start = dayjs(selectedDate.value)
    .hour(parseInt(startHour.value))
    .minute(0)
    .second(0);
  const end = dayjs(selectedDate.value)
    .hour(parseInt(endHour.value))
    .minute(0)
    .second(0);

  const result = { start: start.unix(), end: end.unix() };
  emit("update:modelValue", result);
  internalValue.value = result; // обновляем локальное, чтобы сразу отобразить
  showTime.value = false;
  showCalendar.value = false;
};

const displayValue = computed(() => {
  if (!internalValue.value?.start || !internalValue.value?.end) return "";
  return `${dayjs
    .unix(internalValue.value.start)
    .format("DD.MM.YYYY HH:mm")} - ${dayjs
    .unix(internalValue.value.end)
    .format("HH:mm")}`;
});

const monthLabel = computed(() =>
  calendarMonth.value.locale("ru").format("MMMM YYYY")
);
</script>

<style scoped>
select {
  appearance: none;
  background: white;
}
</style>
