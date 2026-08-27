import axios from 'axios'

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

const openWeatherGeoClient = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
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

function requireOpenWeatherApiKey() {
  if (!hasOpenWeatherApiKey()) {
    throw new Error('VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.')
  }
}

export async function fetchOpenWeatherCoordinates(cityName) {
  requireOpenWeatherApiKey()

  const response = await openWeatherGeoClient.get('/direct', {
    params: {
      q: cityName,
      limit: 1,
      appid: openWeatherApiKey,
    },
  })

  const location = response.data?.[0]

  if (!location) {
    const error = new Error('입력한 도시를 찾지 못했습니다.')
    error.response = { status: 404 }
    throw error
  }

  return location
}

export async function fetchOpenWeatherByCoordinates(lat, lon, units = 'metric') {
  requireOpenWeatherApiKey()

  const response = await openWeatherClient.get('/weather', {
    params: {
      lat,
      lon,
      appid: openWeatherApiKey,
      units,
      lang: 'kr',
    },
  })

  return response.data
}

export async function fetchOpenWeatherForecastByCoordinates(lat, lon, units = 'metric') {
  requireOpenWeatherApiKey()

  const response = await openWeatherClient.get('/forecast', {
    params: {
      lat,
      lon,
      appid: openWeatherApiKey,
      units,
      lang: 'kr',
    },
  })

  return response.data
}

export async function fetchOpenWeatherAirPollution(lat, lon) {
  requireOpenWeatherApiKey()

  const response = await openWeatherClient.get('/air_pollution', {
    params: {
      lat,
      lon,
      appid: openWeatherApiKey,
    },
  })

  return response.data
}

export async function fetchOpenWeatherByCity(cityName, units = 'metric') {
  const location = await fetchOpenWeatherCoordinates(cityName)
  return fetchOpenWeatherByCoordinates(location.lat, location.lon, units)
}

export async function fetchOpenWeatherForecast(cityName, units = 'metric') {
  const location = await fetchOpenWeatherCoordinates(cityName)
  return fetchOpenWeatherForecastByCoordinates(location.lat, location.lon, units)
}

export async function fetchOpenWeatherBundle(cityName, units = 'metric') {
  const location = await fetchOpenWeatherCoordinates(cityName)

  // 같은 좌표를 사용하는 현재값·예보·대기질은 병렬로 받아 대시보드 갱신 시간을 줄입니다.
  const [currentData, forecastData, airPollutionData] = await Promise.all([
    fetchOpenWeatherByCoordinates(location.lat, location.lon, units),
    fetchOpenWeatherForecastByCoordinates(location.lat, location.lon, units),
    fetchOpenWeatherAirPollution(location.lat, location.lon).catch(() => null),
  ])

  return { airPollutionData, currentData, forecastData, location }
}

export async function fetchJsonPlaceholderPosts(limit = 5) {
  const response = await jsonPlaceholderClient.get('/posts', { params: { _limit: limit } })
  return response.data
}

export function toWeatherSummary(data) {
  const timezone = Number(data.timezone ?? 0)

  return {
    id: data.id,
    name: data.name,
    country: data.sys?.country ?? '--',
    temperature: Math.round(data.main?.temp ?? 0),
    feelsLike: Math.round(data.main?.feels_like ?? 0),
    high: Math.round(data.main?.temp_max ?? 0),
    low: Math.round(data.main?.temp_min ?? 0),
    humidity: data.main?.humidity ?? 0,
    wind: Number(data.wind?.speed ?? 0).toFixed(1),
    visibility: `${(Number(data.visibility ?? 0) / 1000).toFixed(1)} km`,
    pressure: `${Number(data.main?.pressure ?? 0).toLocaleString('en-US')} hPa`,
    description: data.weather?.[0]?.description ?? '정보 없음',
    icon: data.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : '',
    sunrise: formatUnixTime(data.sys?.sunrise, timezone),
    sunset: formatUnixTime(data.sys?.sunset, timezone),
  }
}

export function toForecastSummary(data) {
  const timezone = Number(data.city?.timezone ?? 0)

  return (data.list ?? []).slice(0, 6).map((item) => ({
    time: formatUnixTime(item.dt, timezone),
    temperature: Math.round(item.main?.temp ?? 0),
    description: item.weather?.[0]?.description ?? '정보 없음',
    icon: item.weather?.[0]?.icon ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` : '',
    rain: Math.round(Number(item.pop ?? 0) * 100),
  }))
}

export function toAirQualitySummary(data) {
  const current = data?.list?.[0]

  if (!current) return null

  const index = Number(current.main?.aqi ?? 0)
  const labels = ['정보 없음', '좋음', '양호', '보통', '나쁨', '매우 나쁨']

  return {
    index,
    label: labels[index] ?? '정보 없음',
    pm25: Number(current.components?.pm2_5 ?? 0).toFixed(1),
  }
}

function formatUnixTime(timestamp, timezoneOffset) {
  if (!timestamp) return '--:--'

  return new Date((Number(timestamp) + timezoneOffset) * 1000).toISOString().slice(11, 16)
}
