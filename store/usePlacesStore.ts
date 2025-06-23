import { defineStore, storeToRefs } from "pinia";
import { useSupabaseClient } from "#imports";

export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: null as any,
    placeTypes: null as any,
  }),

  actions: {
    // Загрузка всех площадок
    async selectPlaces() {
      const supabase = useSupabaseClient();
      try {
        const { data: places, error } = await supabase
          .from("places")
          .select("*"); // можешь добавить JOIN или фильтр
        if (error) throw error;
        this.places = places;
      } catch (error) {
        console.error("Ошибка при загрузке places:", error);
      }
    },

    // Загрузка типов площадок
    async selectTypePlaces() {
      const supabase = useSupabaseClient();
      try {
        const { data: places_types, error } = await supabase
          .from("places_types")
          .select("*");
        if (error) throw error;
        this.placeTypes = places_types;
      } catch (error) {
        console.error("Ошибка при загрузке типов:", error);
      }
    },

    // Создание площадки + загрузка изображений
    async createPlace(placeData: any, images: string[]) {
      const supabase = useSupabaseClient();
      try {
        // 1. Сохраняем площадку
        const { data, error } = await supabase
          .from("places")
          .insert([placeData])
          .select("id"); // получим ID площадки
        if (error) throw error;

        const placeId = data[0].id;

        // 2. Загружаем изображения (если есть)
        if (images && images.length > 0) {
          await this.uploadGallery(placeId, images);
        }

        // 3. Обновим список
        await this.selectPlaces();

        return placeId;
      } catch (error) {
        console.error("Ошибка при создании площадки:", error);
        throw error;
      }
    },

    // Добавление изображений в places_gallery
    async uploadGallery(placeId: number, images: string[]) {
      const supabase = useSupabaseClient();
      try {
        const galleryData = images.map((img) => ({
          place_id: placeId,
          img,
        }));

        const { error } = await supabase
          .from("places_gallery")
          .insert(galleryData);

        if (error) throw error;
      } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
      }
    },
  },
});

export const usePlacesStoreRefs = () => storeToRefs(usePlacesStore());
