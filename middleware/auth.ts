
import { useSupabaseUser } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const isFullyAuthed = user.value && !user.value.is_anonymous

  if (!isFullyAuthed) {
    return navigateTo('/')
  }
})