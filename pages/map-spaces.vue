<template>
  <div class="flex h-full relative">
    <SidebarFilters />

    <ClientOnly>
      <YandexMap
        v-model="map"
        class="flex-1 h-full w-full"
        :settings="{ location: { center: [37.6176, 55.7558], zoom: 10 } }"
        width="100%"
        height="100vh"
      >
        <yandex-map-clusterer
          v-model="clusterer"
          :grid-size="64"
          zoom-on-cluster-click
        >
          <yandex-map-marker
            v-for="marker in markers"
            :key="marker.id"
            :settings="{ coordinates: marker.settings.coordinates }"
            @click="selectMarker(marker.id)"
          >
            <div class="place-marker">
              <div
                :class="{
                  '!bg-orange text-white': selectedPlace?.id === marker.id,
                }"
                class="bg-white shadow-custom-deep rounded-md whitespace-nowrap font-bold px-4 py-2 text-sm hover:bg-orange hover:text-white transition-all cursor-pointer"
              >
                от {{ marker.raw.acf.space.price_group.days }} ₽ / час
              </div>
              <div
                v-if="selectedPlace?.id === marker.id"
                class="max-w-[280px] absolute bottom-[120%] left-[50%] -translate-x-[50%]"
              >
                <CardPlace :card="marker.raw" :short="true" />
              </div>
            </div>
          </yandex-map-marker>

          <template #cluster="{ length }">
            <div class="cluster">+{{ length }}</div>
          </template>
        </yandex-map-clusterer>

        <YandexMapDefaultSchemeLayer />
        <YandexMapDefaultFeaturesLayer />
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import CardPlace from "~/components/Uikit/cards/CardPlace.vue";
import { computed, onMounted, shallowRef, ref } from "vue";
import type { YMap } from "@yandex/ymaps3-types";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapClusterer,
  YandexMapMarker,
} from "vue-yandex-maps";

import SidebarFilters from "~/components/shared/SidebarFilters.vue";
import { usePlacesStoreRefs, usePlacesStore } from "~/store/usePlacesStore";
import type { YMapClusterer } from "@yandex/ymaps3-types/packages/clusterer";

const map = shallowRef<null | YMap>(null);
const clusterer = shallowRef<YMapClusterer | null>(null);
const { places } = usePlacesStoreRefs();
const { fetchPlaces } = usePlacesStore();

const selectedPlace = ref<any | null>(null);

interface Marker {
  id: number;
  settings: {
    coordinates: [number, number];
    marker: { type: "html"; html: string; offset: [number, number] };
  };
  raw: any;
}

const markers = computed<Marker[]>(() =>
  places.value
    .filter((p) => Array.isArray(p.acf?.space?.coords))
    .map((p) => {
      const [lon, lat] = p.acf.space.coords as [number, number];
      return {
        id: p.id,
        raw: p,
        settings: {
          coordinates: [lon, lat],
          marker: {
            type: "html",
            html: "<div>123</div>",
            offset: [-40, -40],
          },
        },
      };
    })
);

function zoomToCluster(e: any) {
  const cl = e.originalEvent?.cluster;
  if (!cl || !map.value?.map) return;
  const nextZoom = Math.min(map.value.map.getZoom() + 2, 19);
  map.value.map.setCenter(cl.geometry.coordinates, nextZoom, {
    duration: 400,
  });
}

function selectMarker(id: number) {
  selectedPlace.value = markers.value.find((m) => m.id === id) || null;
}

onMounted(() => {
  fetchPlaces();
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  // Проверяем, попал ли клик внутрь маркера или карточки
  if (
    target.closest(".place-marker") ||
    target.closest(".card-place-wrapper") // обернём карточку этим классом
  ) {
    return;
  }

  selectedPlace.value = null;
}
</script>

<style scoped>
.price-marker {
  background: #fff;
  border-radius: 8px;
  padding: 4px 10px;
  font: 600 12px/1 system-ui;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  pointer-events: auto;
  cursor: pointer;
}
</style>
