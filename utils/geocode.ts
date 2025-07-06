// utils/geocode.ts
export async function geocode(addr: string): Promise<[number, number] | null> {
  const key = import.meta.env.VITE_YMAPS_KEY      // ваш API-ключ
  const url =
    `https://geocode-maps.yandex.ru/v1/?apikey=${key}&geocode=${encodeURIComponent(addr)}&format=json`

  const { features } = await $fetch<any>(url)        // <— useFetch или axios

  const pos = features?.[0]?.geometry?.coordinates   // [lon, lat]
  return Array.isArray(pos) ? (pos as [number, number]) : null
}