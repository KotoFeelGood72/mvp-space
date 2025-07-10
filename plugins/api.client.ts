import axios from 'axios'
import type {
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useAuthStore } from '~/store/useAuthStore'

/* ---------- расширяем тип конфигурации, добавляя _retry ---------- */
interface ExtConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export default defineNuxtPlugin(() => {
  const { public: { SITE_URL } } = useRuntimeConfig()

  const api = axios.create({
    baseURL: `${SITE_URL}wp-json/custom-auth/v1/`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  })


  const placesApi = axios.create({
    baseURL: `${SITE_URL}wp-json/space/v1/`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  })


api.interceptors.request.use((config: ExtConfig) => {
  if (typeof window !== 'undefined') {
    const auth = useAuthStore()
    if (auth.access) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${auth.access}`
    }
  }
  return config
})

  /* --------------- response ---------------- */
  let isRefreshing = false

  /** очередь «зависших» запросов */
  const queue: Array<(token: string | null, err?: AxiosError) => void> = []

  const flush = (token: string | null, err?: AxiosError) => {
    queue.forEach(fn => fn(token, err))
    queue.length = 0
  }

  api.interceptors.response.use(
    res => res,
    async (err: AxiosError) => {
      const auth     = useAuthStore()
      const original = err.config as ExtConfig

      const code = err.response?.status
      const needRefresh = (code === 401 || code === 403)

      if (needRefresh && !original._retry) {
        original._retry = true

        /* уже идёт refresh → ждём */
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push((tok, e) => {
              if (e) return reject(e)
              if (tok) original.headers!.Authorization = `Bearer ${tok}`
              resolve(api(original))
            })
          })
        }

        /* запускаем refresh */
        isRefreshing = true
        try {
          const { data } = await api.post('/refresh-token/')
          const newTok   = data.access_token

          auth.access = newTok
          localStorage.setItem('access', newTok)

          flush(newTok)
          original.headers!.Authorization = `Bearer ${newTok}`
          return api(original)
        } catch (e) {
          flush(null, e as AxiosError)
          auth.logout()
          return Promise.reject(e)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(err)
    }
  )

  /* доступно как `const { $api } = useNuxtApp()` */
  return { provide: { api, placesApi } }
})