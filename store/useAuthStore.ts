import { defineStore, storeToRefs } from 'pinia'
import { useModalStore } from './useModalStore'

export interface WPUser {
  ID: number
  email: string
  username: string
  roles: string[]
  acf?: Record<string, any>      // все кастом-поля ACF
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:   null  as WPUser | null,
    access: null  as string | null,
    loading: false,
    error:   null as string | null,
    otpSentTo: '' as string,
  }),

  getters: {
    isAuth: s => !!s.access,
  },

  actions: {
    /* ---------------- init ---------------- */
    init () {
      if (process.client) {
        const token = localStorage.getItem('access')
        if (token) {
          this.access = token
          const { $api } = useNuxtApp()
          $api.defaults.headers.Authorization = `Bearer ${token}`
        }
        this.fetchUser() 
      }
    },

    /* -------------- send OTP -------------- */
    async sendOtp (email: string) {
      this._reset(); this.loading = true
      const { $api } = useNuxtApp()
      try {
        await $api.post('/send-otp/', { email })
        this.otpSentTo = email
      } catch (e) { return this._fail(e) }
      finally     { this.loading = false }
    },

    /* -------------- verify OTP ------------ */
    async verifyOtp (email: string, token: string) {
      this._reset(); this.loading = true
      const { $api } = useNuxtApp()
      const modal    = useModalStore()

      try {
        const { data } = await $api.post('/verify-otp/', { email, otp_code: token })
        this.access = data.access_token
        this.user   = data.user

        if (process.client) localStorage.setItem('access', this.access!)
        $api.defaults.headers.Authorization = `Bearer ${this.access}`

        modal.closeAllModals()
      } catch (e) { return this._fail(e) }
      finally     { this.loading = false }
    },

    /* -------- fetch current profile ------- */
    async fetchUser () {
      const { $api } = useNuxtApp()
      this.loading = true
      try {
        const { data } = await $api.get('/me/')
        this.user = data                              // весь объект с ACF
        return data
      } catch (e:any) {
        // если даже после auto-refresh 401 → выходим из аккаунта
        if (e?.response?.status === 401) await this.logout()
        return this._fail(e)
      } finally {
        this.loading = false
      }
    },

    /* -------------- manual refresh -------- */
    async refresh () {
      const { $api } = useNuxtApp()
      const { data } = await $api.post('/refresh-token/')
      this.access = data.access_token
      if (process.client) localStorage.setItem('access', this.access!)
      $api.defaults.headers.Authorization = `Bearer ${this.access}`
      return this.access
    },

    /* ---------------- logout -------------- */
    async logout () {
      const { $api } = useNuxtApp()
      await $api.post('/logout/').catch(() => null)
      if (process.client) localStorage.removeItem('access')
      this.user = null
      this.access = null
      delete $api.defaults.headers.Authorization
    },

    /* --------------- helpers -------------- */
    _fail (e:any) {
      this.error   = e?.response?.data?.message || e?.message || 'Ошибка'
      this.loading = false
    },
    _reset () { this.error = null },
  },
})

export const useAuthStoreRefs = () => storeToRefs(useAuthStore())