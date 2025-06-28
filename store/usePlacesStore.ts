/* ~/store/usePlacesStore.ts
 * Pinia-стор для работы с REST-эндпоинтами “/space/v1/places”
 * (см. place.php, где зарегистрированы CRUD-роуты).
 */

import { defineStore, storeToRefs } from 'pinia'

interface Place {
  id: number
  title: string
  content: string
  acf?: Record<string, any>
  [k: string]: any
}

export const usePlacesStore = defineStore('places', {
  state: () => ({
    places:      []   as Place[],
    placeTypes:  null as any,   // при необходимости – отдельный эндпоинт
    categories:  null as any,
    loading:     false,
    error:       null as string | null,
  }),

  actions: {
    /* ----------------------- helpers ----------------------- */
    _fail (e: any) {
      // перехватываем Axios / fetch ошибки
      this.error   = e?.response?.data?.message || e?.message || 'Ошибка'
      this.loading = false
      throw e
    },

    /* ----------------------- GET all ----------------------- */
    async fetchPlaces (page = 1, perPage = 20) {
      this.loading = true
      const { $placesApi } = useNuxtApp()

      try {
        const { data } = await $placesApi.get('/places?acf=space.gallery,space.short_address,space.short_params, space.price_group', {
          params: { page, per_page: perPage },
        })
        this.places = data.items
      } catch (e) { this._fail(e) }
      finally     { this.loading = false }
    },

    /* ----------------------- GET one ----------------------- */
    async fetchPlace (id: number) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.get(`/places/${id}`)
      return data as Place
    },

    /* ----------------------- CREATE ------------------------ */
    async createPlace (payload: {
      title: string
      content?: string
      acf?: Record<string, any>
    }) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.post('/places', payload)
      // обновляем список локально
      this.places.unshift(data)
      return data.id as number
    },

    /* ----------------------- UPDATE ------------------------ */
    async updatePlace (id: number, payload: Partial<Place>) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.put(`/places/${id}`, payload)
      // заменяем элемент в state
      const idx = this.places.findIndex(p => p.id === id)
      if (idx !== -1) this.places[idx] = data
      return data as Place
    },

    /* ----------------------- DELETE ------------------------ */
    async deletePlace (id: number) {
      const { $placesApi } = useNuxtApp()
      await $placesApi.delete(`/places/${id}`)
      this.places = this.places.filter(p => p.id !== id)
    },

    /* -------------------- (optionally) gallery upload ------ */
    /**
     * API place.php поддерживает обновление ACF-поля
     * так что можно сохранить массив ссылок в acf.gallery
     */
    async uploadGallery (id: number, urls: string[]) {
      return this.updatePlace(id, { acf: { gallery: urls } })
    },

    /* -------------------- categories / types --------------- */
    // примеры-заглушки: настроить при появлении соответствующих эндпоинтов
    async fetchCategories () {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.get('/categories')
      this.categories = data
    },
    async fetchPlaceTypes () {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.get('/place-types')
      this.placeTypes = data
    },
  },
})

export const usePlacesStoreRefs = () => storeToRefs(usePlacesStore())