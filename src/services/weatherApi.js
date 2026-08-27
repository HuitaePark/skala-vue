import axios from 'axios'

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

const jsonPlaceholderClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() ?? ''

export function hasOpenWeatherApiKey() {
  return Boolean(openWeatherApiKey)
}

export async function fetchOpenWeatherByCity(cityName, units = 'metric') {
  if (!hasOpenWeatherApiKey()) {
    throw new Error('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.')
  }

  const response = await openWeatherClient.get('/weather', {
    params: {
      q: cityName,
      appid: openWeatherApiKey,
      units,
      lang: 'kr',
    },
  })

  return response.data
}

export async function fetchOpenWeatherForecast(cityName, units = 'metric') {
  if (!hasOpenWeatherApiKey()) {
    throw new Error('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.')
  }

  const response = await openWeatherClient.get('/forecast', {
    params: {
      q: cityName,
      appid: openWeatherApiKey,
      units,
      lang: 'kr',
    },
  })

  return response.data
}

export async function fetchJsonPlaceholderPosts(limit = 5) {
  const response = await jsonPlaceholderClient.get('/posts', { params: { _limit: limit } })
  return response.data
}

export function toWeatherSummary(data) {
  return {
    name: data.name,
    country: data.sys?.country ?? '--',
    temperature: Math.round(data.main?.temp ?? 0),
    feelsLike: Math.round(data.main?.feels_like ?? 0),
    high: Math.round(data.main?.temp_max ?? 0),
    low: Math.round(data.main?.temp_min ?? 0),
    humidity: data.main?.humidity ?? 0,
    wind: Number(data.wind?.speed ?? 0).toFixed(1),
    description: data.weather?.[0]?.description ?? '정보 없음',
    icon: data.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '',
  }
}

export function toForecastSummary(data) {
  return (data.list ?? []).slice(0, 5).map((item) => ({
    time: item.dt_txt?.slice(11, 16) ?? '--:--',
    temperature: Math.round(item.main?.temp ?? 0),
    description: item.weather?.[0]?.description ?? '정보 없음',
  }))
}
