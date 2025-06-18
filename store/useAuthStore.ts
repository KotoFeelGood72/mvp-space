// /stores/auth.ts
import { defineStore } from 'pinia'
import type { Session, User, AuthError } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:    null as User | null,
    session: null as Session | null,
    loading: false,
    error:   null as string | null,
  }),

  getters: {
    isAuth:  (s) => !!s.user,
  },

  actions: {

    async init () {
      const supabase = useSupabaseClient()
      const { data }  = await supabase.auth.getSession()
      this.session    = data.session ?? null
      this.user       = data.session?.user ?? null

      supabase.auth.onAuthStateChange((_e, newSession) => {
        this.session = newSession
        this.user    = newSession?.user ?? null
      })
    },

    async signUp (email: string, password: string) {
      this._wrap(async (supabase) =>
        supabase.auth.signUp({ email, password }))
    },

    async signIn (email: string, password: string) {
      this._wrap(async (supabase) =>
        supabase.auth.signInWithPassword({ email, password }))
    },

    async signOut () {
      this._wrap(async (supabase) => supabase.auth.signOut())
    },


    async _wrap (
      fn: (s: ReturnType<typeof useSupabaseClient>) => Promise<any>
    ) {
      this.error = null
      this.loading = true
      const supabase = useSupabaseClient()

      const { data, error } = await fn(supabase)
      if (error) return this._onError(error)


      if (data?.session !== undefined) this.session = data.session
      if (data?.user    !== undefined) this.user    = data.user
      this.loading = false
    },

    _onError (e: AuthError) {
      this.error = e.message
      this.loading = false
    },
  },
})