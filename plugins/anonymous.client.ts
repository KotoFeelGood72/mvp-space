import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/store/useAuthStore'

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const auth     = useAuthStore()

  await auth.init()               

  if (!auth.isAuth) {
    await supabase.auth.signInAnonymously()
    // auth.onAuthStateChange 
  }
})