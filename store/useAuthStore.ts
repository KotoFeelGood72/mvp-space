// /stores/auth.ts
import { defineStore } from 'pinia'
import { useSupabaseClient } from '#imports'
import type { AuthError, User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    session: null as Session | null,
    loading: false,
    error: null as string | null,
    otpSentTo: '' as string,
  }),

  getters: {
    isAuth: s => !!s.user,
  },

  actions: {
    async init () {
      const supabase = useSupabaseClient()
      const { data } = await supabase.auth.getSession()
      this.session = data.session ?? null
      this.user    = data.session?.user ?? null

      supabase.auth.onAuthStateChange((_e, s) => {
        this.session = s
        this.user    = s?.user ?? null
      })
    },

    /** ---------- Отправка email-кода ---------- */
    async sendOtp (email: string) {
      this._reset()
      this.loading = true
      const supabase = useSupabaseClient()

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin }
      })

      if (error) return this._fail(error)
      this.otpSentTo = email
      this.loading = false
    },

    /** ---------- Подтверждение email-кода ---------- */
    async verifyOtp (email: string, token: string) {
      this._reset()
      this.loading = true
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.auth.verifyOtp({
        type: 'email',     // ✅ ВАЖНО: 'email', а не 'magiclink'
        email,
        token,
      })

      if (error) return this._fail(error)
      this.session = data.session
      this.user    = data.user
      this.loading = false
    },

    _fail (e: AuthError) {
      this.error = e.message
      this.loading = false
    },

    _reset () {
      this.error = null
    },
  },
})

export const useAuthStoreRefs = () => storeToRefs(useAuthStore());