import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import weatherRouteData from '@/data/weatherRouteData.js'
import {
  fetchOpenWeatherBundle,
  hasOpenWeatherApiKey,
  toAirQualitySummary,
  toForecastSummary,
  toWeatherSummary,
} from '@/services/weatherApi.js'

const DEFAULT_FAVORITE_IDS = ['city_01', 'city_03']

const API_CITY_QUERIES = {
  city_01: 'Seoul,KR',
  city_02: 'Suwon,KR',
  city_03: 'Busan,KR',
  city_04: 'Jeju,KR',
  city_05: 'Incheon,KR',
  city_06: 'Daegu,KR',
  city_07: 'Daejeon,KR',
  city_08: 'Gwangju,KR',
}

function percentageValue(value) {
  return Number.parseInt(String(value), 10) || 0
}

function comfortScore(temperature, humidity) {
  const temperaturePenalty = Math.abs(temperature - 23) * 0.28
  const humidityPenalty = Math.abs(humidity - 50) * 0.035
  return Math.max(3.5, Math.min(9.7, 9.4 - temperaturePenalty - humidityPenalty)).toFixed(1)
}

function comfortLabel(score) {
  const numericScore = Number(score)

  if (numericScore >= 8.5) return 'Excellent conditions'
  if (numericScore >= 7.5) return 'Comfortable'
  if (numericScore >= 6.5) return 'Plan with care'
  return 'Indoor time recommended'
}

function bestWindow(city) {
  if (percentageValue(city.precipitation) >= 60) return '09:00–12:00'
  if (city.temp >= 30) return '08:00–11:00'
  if (city.temp <= 10) return '12:00–15:00'
  return '10:00–17:00'
}

function normalizeMockForecast(city) {
  return city.forecast.map((item, index) => ({
    day: index === 0 ? 'Now' : (item.time ?? item.day),
    temp: item.temp,
    icon: item.icon,
    iconUrl: '',
    status: city.status,
    rain: percentageValue(item.rain),
  }))
}

function normalizeMockCity(city) {
  const humidity = percentageValue(city.humidity)
  const precipitation = `${percentageValue(city.forecast[0]?.rain)}%`
  const score = comfortScore(city.temp, humidity)
  const normalized = {
    ...city,
    apiQuery: API_CITY_QUERIES[city.id] ?? city.name,
    iconUrl: '',
    precipitation,
    comfortScore: score,
    comfortLabel: comfortLabel(score),
    forecast: normalizeMockForecast(city),
    dataSource: 'mock',
    updatedAt: null,
  }

  return {
    ...normalized,
    bestWindow: bestWindow(normalized),
  }
}

function loadFavoriteCityIds() {
  if (typeof window === 'undefined') return DEFAULT_FAVORITE_IDS

  try {
    const storedIds = JSON.parse(window.localStorage.getItem('skala-vue:weather-favorites') ?? 'null')
    return Array.isArray(storedIds) ? storedIds : DEFAULT_FAVORITE_IDS
  } catch {
    return DEFAULT_FAVORITE_IDS
  }
}

function requestErrorMessage(error) {
  const status = error?.response?.status

  if (status === 401) return 'API 키가 아직 활성화되지 않았거나 올바르지 않습니다.'
  if (status === 404) return '입력한 도시를 찾지 못했습니다. 영문 도시명도 시도해 보세요.'
  if (status === 429) return 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.'
  if (error instanceof Error && error.message) return error.message
  return '실시간 날씨를 불러오지 못했습니다.'
}

function findKnownCity(cities, query, weatherSummary) {
  const normalizedQuery = query.split(',')[0].trim().toLowerCase()

  return cities.find((city) => {
    const apiName = city.apiQuery.split(',')[0].toLowerCase()
    return (
      city.apiId === weatherSummary.id || city.name.toLowerCase() === normalizedQuery || apiName === normalizedQuery
    )
  })
}

function createLiveCity(baseCity, query, weatherSummary, forecastSummary, airQualitySummary) {
  const humidity = Number(weatherSummary.humidity)
  const score = comfortScore(weatherSummary.temperature, humidity)
  const forecast = forecastSummary.slice(0, 6).map((item) => ({
    day: item.time,
    temp: item.temperature,
    icon: baseCity?.icon ?? '☁️',
    iconUrl: item.icon,
    status: item.description,
    rain: item.rain,
  }))
  const precipitation = `${forecast[0]?.rain ?? 0}%`
  const city = {
    ...(baseCity ?? {}),
    id: baseCity?.id ?? `live_${weatherSummary.id}`,
    apiId: weatherSummary.id,
    apiQuery: query,
    name: baseCity?.name ?? weatherSummary.name,
    region: baseCity?.region ?? `${weatherSummary.name}, ${weatherSummary.country}`,
    temp: weatherSummary.temperature,
    feelsLike: weatherSummary.feelsLike,
    high: weatherSummary.high,
    low: weatherSummary.low,
    status: weatherSummary.description,
    description: `${weatherSummary.name}의 OpenWeather 실시간 관측과 5일·3시간 예보를 반영했습니다.`,
    icon: baseCity?.icon ?? '☁️',
    iconUrl: weatherSummary.icon,
    humidity: `${weatherSummary.humidity}%`,
    wind: `${weatherSummary.wind} m/s`,
    visibility: weatherSummary.visibility,
    pressure: weatherSummary.pressure,
    airQuality: airQualitySummary
      ? `${airQualitySummary.label} · AQI ${airQualitySummary.index} · PM2.5 ${airQualitySummary.pm25}`
      : '정보 없음',
    uvIndex: '정보 없음',
    precipitation,
    sunrise: weatherSummary.sunrise,
    sunset: weatherSummary.sunset,
    comfortScore: score,
    comfortLabel: comfortLabel(score),
    forecast,
    dataSource: 'live',
    updatedAt: new Date().toISOString(),
  }

  return {
    ...city,
    bestWindow: bestWindow(city),
  }
}

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref(weatherRouteData.map(normalizeMockCity))
  const selectedCityId = ref(cities.value[0].id)
  const favoriteCityIds = ref(loadFavoriteCityIds())
  const isLoading = ref(false)
  const errorMessage = ref('')
  let isHydrated = false
  let latestRequestId = 0

  const selectedCity = computed(() => cities.value.find((city) => city.id === selectedCityId.value) ?? cities.value[0])
  const favoriteCitiesCount = computed(() => favoriteCityIds.value.length)
  const apiKeyConfigured = computed(() => hasOpenWeatherApiKey())
  const sourceLabel = computed(() => (selectedCity.value?.dataSource === 'live' ? 'OpenWeather Live' : 'Mock fallback'))

  watch(
    favoriteCityIds,
    (nextIds) => {
      if (typeof window === 'undefined') return

      try {
        window.localStorage.setItem('skala-vue:weather-favorites', JSON.stringify(nextIds))
      } catch {
        // localStorage가 차단돼도 현재 세션의 즐겨찾기는 유지됩니다.
      }
    },
    { deep: true },
  )

  function selectCity(cityOrId) {
    selectedCityId.value = typeof cityOrId === 'string' ? cityOrId : cityOrId.id
  }

  function hydrateCities(seedCities) {
    if (isHydrated || !Array.isArray(seedCities) || !seedCities.length) return

    const previousSelectedId = selectedCityId.value
    cities.value = seedCities.map(normalizeMockCity)
    selectedCityId.value = cityById(previousSelectedId)?.id ?? cities.value[0].id
    isHydrated = true
  }

  function cityById(cityId) {
    return cities.value.find((city) => city.id === cityId) ?? null
  }

  function isFavorite(cityId) {
    return favoriteCityIds.value.includes(cityId)
  }

  function toggleFavorite(cityOrId) {
    const cityId = typeof cityOrId === 'string' ? cityOrId : cityOrId.id
    favoriteCityIds.value = isFavorite(cityId)
      ? favoriteCityIds.value.filter((id) => id !== cityId)
      : [...favoriteCityIds.value, cityId]
  }

  async function loadLiveWeather(query) {
    const normalizedQuery = query.trim()

    if (!apiKeyConfigured.value) {
      errorMessage.value = 'VITE_OPENWEATHER_API_KEY가 설정되지 않아 Mock 데이터를 표시합니다.'
      return { ok: false, reason: 'missing-key', message: errorMessage.value }
    }

    if (!normalizedQuery) {
      errorMessage.value = '조회할 도시 이름을 입력해 주세요.'
      return { ok: false, reason: 'empty-query', message: errorMessage.value }
    }

    // 도시를 빠르게 바꿀 수 있으므로 요청 순서를 기록해 최신 요청만 화면에 반영합니다.
    const requestId = ++latestRequestId
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { currentData, forecastData, airPollutionData } = await fetchOpenWeatherBundle(normalizedQuery)

      // 먼저 시작한 요청이 늦게 도착해 현재 선택 도시를 덮어쓰지 않도록 합니다.
      if (requestId !== latestRequestId) {
        return { ok: false, reason: 'stale-request', message: '최신 검색 결과를 기다리는 중입니다.' }
      }

      const weatherSummary = toWeatherSummary(currentData)
      const forecastSummary = toForecastSummary(forecastData)
      const airQualitySummary = toAirQualitySummary(airPollutionData)
      const knownCity = findKnownCity(cities.value, normalizedQuery, weatherSummary)
      const liveCity = createLiveCity(
        knownCity,
        knownCity?.apiQuery ?? normalizedQuery,
        weatherSummary,
        forecastSummary,
        airQualitySummary,
      )
      const cityIndex = cities.value.findIndex((city) => city.id === liveCity.id)

      if (cityIndex >= 0) {
        cities.value[cityIndex] = liveCity
      } else {
        cities.value = [liveCity, ...cities.value]
      }

      selectedCityId.value = liveCity.id
      return { ok: true, city: liveCity }
    } catch (error) {
      if (requestId !== latestRequestId) {
        return { ok: false, reason: 'stale-request', message: '최신 검색 결과를 기다리는 중입니다.' }
      }

      errorMessage.value = requestErrorMessage(error)
      return { ok: false, reason: 'request-error', message: errorMessage.value }
    } finally {
      if (requestId === latestRequestId) {
        isLoading.value = false
      }
    }
  }

  function refreshSelectedCity() {
    return loadLiveWeather(selectedCity.value.apiQuery ?? selectedCity.value.name)
  }

  return {
    apiKeyConfigured,
    cities,
    cityById,
    errorMessage,
    favoriteCitiesCount,
    favoriteCityIds,
    hydrateCities,
    isFavorite,
    isLoading,
    loadLiveWeather,
    refreshSelectedCity,
    selectCity,
    selectedCity,
    selectedCityId,
    sourceLabel,
    toggleFavorite,
  }
})
