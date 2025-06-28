// stores/useAfishaStore.ts --------------------------------------------------
import { defineStore, storeToRefs } from 'pinia'

/** структура одной афиши (минимум полей – расширяйте при необходимости) */
export interface AfishaItem {
  id:        number
  title:     string
  excerpt:   string
  categories: { id:number; name:string; slug:string }[]
  acf:       Record<string, any>
}

export const useAfishaStore = defineStore('afisha', {
  state: () => ({
    afisha:      []  as AfishaItem[],
    categories:  []  as any[],          // если потом будут эндпоинты
    loading:     false,
    error:       null as string | null,
  }),

  actions: {
    /* ------------------------- helpers -------------------- */
    _fail (e:any) {
      this.error   = e?.response?.data?.message || e?.message || 'Ошибка'
      this.loading = false
      // eslint-disable-next-line no-console
      console.error('[AfishaStore]', this.error)
    },

    /* ------------------------- GET all -------------------- */
    async fetchAfisha (page = 1, perPage = 20) {
      this.loading = true
      const { $placesApi } = useNuxtApp()      // <— в плагине nuxt.provide('afishaApi', …)

      try {
        const { data } = await $placesApi.get(
          '/afisha',
          { params: { page, per_page: perPage } },
        )
        this.afisha = data.items
      } catch (e) { this._fail(e) }
      finally     { this.loading = false }
    },

    /* ------------------------- GET one ------------------- */
    async fetchAfishaItem (id:number) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.get(`/afisha/${id}`)
      return data as AfishaItem
    },

    /* ------------------------- CREATE -------------------- */
    async createAfisha (payload:{
      title: string
      content?: string
      acf?: Record<string, any>
    }) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.post('/afisha', payload)
      this.afisha.unshift(data)
      return data.id as number
    },

    /* ------------------------- UPDATE -------------------- */
    async updateAfisha (id:number, payload:Partial<AfishaItem>) {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.put(`/afisha/${id}`, payload)
      const idx = this.afisha.findIndex(a => a.id === id)
      if (idx !== -1) this.afisha[idx] = data
      return data as AfishaItem
    },

    /* ------------------------- DELETE -------------------- */
    async deleteAfisha (id:number) {
      const { $placesApi } = useNuxtApp()
      await $placesApi.delete(`/afisha/${id}`)
      this.afisha = this.afisha.filter(a => a.id !== id)
    },

    /* -------------- (опционально) upload gallery --------- */
    async uploadGallery (id:number, urls:string[]) {
      return this.updateAfisha(id, { acf: { gallery: urls } })
    },

    /* -------------- примеры-заглушки ---------------------- */
    async fetchCategories () {
      const { $placesApi } = useNuxtApp()
      const { data } = await $placesApi.get('/afisha-categories')
      this.categories = data
    },
  },
})

export const useAfishaStoreRefs = () => storeToRefs(useAfishaStore())