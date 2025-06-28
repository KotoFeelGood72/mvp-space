<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";

/* ------------------------------------------------------------------ */
/* 1. Типы                                                            */
/* ------------------------------------------------------------------ */
type Item = { label: string; value: string | number };
type Group = { group: string; items: Item[] };
type Entry = Item | Group; // объединяем

/* ------------------------------------------------------------------ */
/* 2. Props / emits                                                   */
/* ------------------------------------------------------------------ */
const props = defineProps<{
  label?: string;
  options: Entry[]; // 👈 теперь это Entry[]
  modelValue: string | number | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string | number): void;
}>();

/* ------------------------------------------------------------------ */
/* 3. Уплощаем список, чтобы легко работать с клавиатурой             */
/* ------------------------------------------------------------------ */
const flat = computed<Item[]>(() =>
  props.options.flatMap((e) => ("items" in e ? e.items : e))
);

/* ------------------------------------------------------------------ */
/* 4. Начальное выбранное                                              */
/* ------------------------------------------------------------------ */
const selected = ref<Item | null>(null);

watch(
  () => props.modelValue,
  (v) => {
    selected.value = flat.value.find((o) => o.value === v) ?? null;
  },
  { immediate: true }
);

// если извне не передали value → ставим первый пункт
if (props.modelValue == null && flat.value.length)
  emit("update:modelValue", flat.value[0].value);

/* ------------------------------------------------------------------ */
/* 5. Открытие / выбор / клавиатура                                   */
/* ------------------------------------------------------------------ */
const open = ref(false);

function choose(opt: Item) {
  selected.value = opt;
  emit("update:modelValue", opt.value);
  open.value = false;
}

function toggle() {
  open.value = !open.value;
}

function onKey(e: KeyboardEvent) {
  if (!open.value && ["ArrowDown", "Enter", " "].includes(e.key)) {
    e.preventDefault();
    open.value = true;
    return;
  }
  if (open.value) {
    if (e.key === "Escape") {
      e.preventDefault();
      open.value = false;
    }
    const idx = flat.value.findIndex((o) => o === selected.value);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      choose(flat.value[(idx + 1) % flat.value.length]);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      choose(flat.value[(idx - 1 + flat.value.length) % flat.value.length]);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      open.value = false;
    }
  }
}

/* click-outside */
const root = ref<HTMLElement>();
function outside(ev: MouseEvent) {
  if (root.value && !root.value.contains(ev.target as Node)) open.value = false;
}
onMounted(() => window.addEventListener("pointerdown", outside));
onBeforeUnmount(() => window.removeEventListener("pointerdown", outside));
</script>

<template>
  <div ref="root" class="relative w-full font-plex">
    <!-- label над инпутом -->
    <p v-if="label" class="text-14 absolute left-4 -top-2 text-grey">
      {{ label }}
    </p>

    <!-- псевдо-инпут -->
    <div
      @click="toggle"
      @keydown="onKey"
      tabindex="0"
      class="bg-white py-3 px-4 text-16 shadow-input rounded-[13px] text-darkText"
    >
      {{ selected?.label ?? "—" }}
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <Icon name="mdi-light:chevron-down" :size="20" />
      </div>
    </div>

    <!-- выпадающий -->
    <div
      v-if="open"
      class="absolute z-20 top-0 left-0 w-full py-3 px-4 bg-white shadow-input rounded-[13px]"
    >
      <ul
        class="text-16 font-plex max-h-[200px] overflow-y-auto flex flex-col gap-1"
      >
        <!-- проходим по исходному, чтобы сохранить группы -->
        <template v-for="blk in props.options" :key="blk.group ?? blk.value">
          <!-- ① заголовок группы -->
          <li
            v-if="'group' in blk"
            class="mt-4 mb-2 text-grey cursor-default select-none text-14"
          >
            {{ blk.group }}
          </li>

          <!-- ② элементы группы или одиночные пункты -->
          <li
            v-for="opt in 'items' in blk ? blk.items : [blk]"
            :key="opt.value"
            role="option"
            :aria-selected="selected?.value === opt.value"
            @click="choose(opt)"
            class="relative cursor-pointer select-none hover:text-orange text-darkText"
          >
            <span
              v-if="selected?.value === opt.value"
              class="absolute left-0 top-0 h-full w-1 rounded-r bg-primary-500"
            />
            {{ opt.label }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
