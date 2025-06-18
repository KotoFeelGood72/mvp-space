// plugins/auth.client.ts
import { useAuthStore } from "~/store/useAuthStore"
export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const auth     = useAuthStore()
  const route    = useRoute()

  /* 1️⃣  пытаемся обменять код из magic-link --------------------------- */
  const code = route.query.code
  const type = route.query.type          // magiclink | signup | recovery

  if (code && ['magiclink', 'signup', 'recovery'].includes(String(type))) {
    const { error } = await supabase.auth.exchangeCodeForSession(String(code))
    if (error) console.error('exchange failed:', error.message)

    await auth.init()                    // заполняем store из новой сессии
    navigateTo(route.path, { replace: true }) // чистим ?code=
    return                               // важно: не создаём гостя
  }

  /* 2️⃣  если сессии нет — создаём анонима ----------------------------- */
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    await supabase.auth.signInAnonymously()
  }

  await auth.init()                      // синхронизируем store
})