// /stores/auth.ts
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import type { AuthError, User, Session } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    session: null as Session | null,
    loading: false,
    error: null as string | null,
    otpSentTo: '' as string,        // ← куда отправили код
  }),

  getters: { isAuth: s => !!s.user },

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

    /** ---------- OTP step 1: отправка кода ---------- */
    async sendOtp (identifier: string, channel: 'email' | 'sms' = 'email') {
      this._reset()
      this.loading = true
      const supabase = useSupabaseClient()

      const { error } = await supabase.auth.signInWithOtp(
        channel === 'email'
          ? { email: identifier, options: { emailRedirectTo: window.location.origin } }
          : { phone: identifier }
      )

      if (error) return this._fail(error)
      this.otpSentTo = identifier
      this.loading = false
    },

    /** ---------- OTP step 2: подтверждение ---------- */
    async verifyOtp (identifier: string, token: string, channel: 'email' | 'sms' = 'email') {
      this._reset()
      this.loading = true
      const supabase = useSupabaseClient()

      const { data, error } = await supabase.auth.verifyOtp({
        type: channel === 'email' ? 'magiclink' : 'sms',
        email: channel === 'email' ? identifier : undefined,
        phone: channel === 'sms'   ? identifier : undefined,
        token,
      })

      if (error) return this._fail(error)
      this.session = data.session
      this.user    = data.user
      this.loading = false
    },

    /* helpers */
    _fail (e: AuthError) { this.error = e.message; this.loading = false },
    _reset () { this.error = null },
  },
})