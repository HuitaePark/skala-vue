<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import UnitToggler from '@/components/practices/pinia/UnitToggler.vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'
import { toDisplayTemperature } from '@/utils/temperature.js'

const props = defineProps({
  detailMode: {
    type: String,
    default: 'modal',
  },
})

const emit = defineEmits(['click-detail'])
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

function displayTemperature(value) {
  return toDisplayTemperature(value, configStore.unit)
}

const weatherSeed = [
  {
    id: 'city_01',
    name: '서울',
    region: 'South Korea',
    temp: 28,
    feelsLike: 30,
    high: 31,
    low: 23,
    status: '맑음',
    description: '맑고 쾌청한 하루예요. 가벼운 외출을 추천해요.',
    icon: '☀️',
    humidity: '45%',
    wind: '12 km/h',
    visibility: '10 km',
    pressure: '1,018 hPa',
    airQuality: '좋음 · 32 AQI',
    uvIndex: '6 / 11',
    precipitation: '10%',
    sunrise: '05:42',
    sunset: '19:22',
    comfortScore: '8.4',
    comfortLabel: 'Great for plans',
    bestWindow: '10:00–17:00',
    forecast: [
      { day: 'Now', temp: 28, icon: '☀️', status: 'Clear', rain: 10 },
      { day: '13:00', temp: 29, icon: '☀️', status: 'Clear', rain: 8 },
      { day: '15:00', temp: 30, icon: '🌤️', status: 'Bright', rain: 6 },
      { day: '17:00', temp: 28, icon: '🌤️', status: 'Bright', rain: 7 },
      { day: '19:00', temp: 25, icon: '🌙', status: 'Calm', rain: 5 },
      { day: '21:00', temp: 23, icon: '🌙', status: 'Calm', rain: 4 },
    ],
  },
  {
    id: 'city_02',
    name: '수원',
    region: 'South Korea',
    temp: 24,
    feelsLike: 23,
    high: 26,
    low: 20,
    status: '비',
    description: '오후에 약한 비가 예상돼요. 우산을 챙겨보세요.',
    icon: '🌧️',
    humidity: '72%',
    wind: '9 km/h',
    visibility: '7 km',
    pressure: '1,012 hPa',
    airQuality: '보통 · 58 AQI',
    uvIndex: '3 / 11',
    precipitation: '70%',
    sunrise: '05:43',
    sunset: '19:23',
    comfortScore: '6.3',
    comfortLabel: 'Keep an umbrella',
    bestWindow: '09:00–12:00',
    forecast: [
      { day: 'Now', temp: 24, icon: '🌧️', status: 'Rain', rain: 70 },
      { day: '13:00', temp: 25, icon: '🌧️', status: 'Rain', rain: 68 },
      { day: '15:00', temp: 26, icon: '🌦️', status: 'Showers', rain: 55 },
      { day: '17:00', temp: 24, icon: '🌧️', status: 'Rain', rain: 62 },
      { day: '19:00', temp: 22, icon: '☁️', status: 'Cloudy', rain: 36 },
      { day: '21:00', temp: 21, icon: '☁️', status: 'Cloudy', rain: 28 },
    ],
  },
  {
    id: 'city_03',
    name: '부산',
    region: 'South Korea',
    temp: 26,
    feelsLike: 27,
    high: 29,
    low: 22,
    status: '구름',
    description: '구름 사이로 햇살이 비치는 여유로운 날씨예요.',
    icon: '⛅',
    humidity: '58%',
    wind: '15 km/h',
    visibility: '9 km',
    pressure: '1,015 hPa',
    airQuality: '좋음 · 41 AQI',
    uvIndex: '7 / 11',
    precipitation: '20%',
    sunrise: '05:37',
    sunset: '19:18',
    comfortScore: '8.1',
    comfortLabel: 'Comfortable',
    bestWindow: '11:00–18:00',
    forecast: [
      { day: 'Now', temp: 26, icon: '⛅', status: 'Cloudy', rain: 20 },
      { day: '13:00', temp: 27, icon: '⛅', status: 'Cloudy', rain: 18 },
      { day: '15:00', temp: 28, icon: '🌤️', status: 'Bright', rain: 12 },
      { day: '17:00', temp: 27, icon: '⛅', status: 'Cloudy', rain: 15 },
      { day: '19:00', temp: 24, icon: '🌙', status: 'Calm', rain: 9 },
      { day: '21:00', temp: 23, icon: '🌙', status: 'Calm', rain: 7 },
    ],
  },
  {
    id: 'city_04',
    name: '제주',
    region: 'South Korea',
    temp: 22,
    feelsLike: 21,
    high: 24,
    low: 19,
    status: '바람',
    description: '바람이 조금 강해요. 가벼운 겉옷을 준비하세요.',
    icon: '🌬️',
    humidity: '63%',
    wind: '23 km/h',
    visibility: '11 km',
    pressure: '1,020 hPa',
    airQuality: '좋음 · 18 AQI',
    uvIndex: '5 / 11',
    precipitation: '30%',
    sunrise: '05:49',
    sunset: '19:31',
    comfortScore: '7.5',
    comfortLabel: 'Light layers recommended',
    bestWindow: '11:00–15:00',
    forecast: [
      { day: 'Now', temp: 22, icon: '🌬️', status: 'Windy', rain: 30 },
      { day: '13:00', temp: 23, icon: '🌬️', status: 'Windy', rain: 26 },
      { day: '15:00', temp: 24, icon: '⛅', status: 'Cloudy', rain: 20 },
      { day: '17:00', temp: 23, icon: '🌬️', status: 'Windy', rain: 23 },
      { day: '19:00', temp: 21, icon: '🌙', status: 'Calm', rain: 14 },
      { day: '21:00', temp: 20, icon: '🌙', status: 'Calm', rain: 12 },
    ],
  },
  {
    id: 'city_05',
    name: '인천',
    region: 'South Korea',
    temp: 27,
    feelsLike: 28,
    high: 30,
    low: 22,
    status: '구름 조금',
    description: '해안 바람이 선선해요. 오후 일정도 편안하게 이어갈 수 있어요.',
    icon: '🌥️',
    humidity: '54%',
    wind: '18 km/h',
    visibility: '12 km',
    pressure: '1,016 hPa',
    airQuality: '좋음 · 28 AQI',
    uvIndex: '7 / 11',
    precipitation: '20%',
    sunrise: '05:43',
    sunset: '19:28',
    comfortScore: '8.0',
    comfortLabel: 'Good for plans',
    bestWindow: '11:00–17:00',
    forecast: [
      { day: 'Now', temp: 27, icon: '🌥️', status: 'Cloudy', rain: 20 },
      { day: '13:00', temp: 28, icon: '🌤️', status: 'Bright', rain: 17 },
      { day: '15:00', temp: 29, icon: '🌤️', status: 'Bright', rain: 14 },
      { day: '17:00', temp: 28, icon: '🌥️', status: 'Cloudy', rain: 17 },
      { day: '19:00', temp: 25, icon: '🌙', status: 'Calm', rain: 10 },
      { day: '21:00', temp: 23, icon: '🌙', status: 'Calm', rain: 8 },
    ],
  },
  {
    id: 'city_06',
    name: '대구',
    region: 'South Korea',
    temp: 30,
    feelsLike: 32,
    high: 33,
    low: 24,
    status: '더움',
    description: '한낮에는 더워요. 물을 자주 마시고 강한 햇빛은 피해주세요.',
    icon: '🌞',
    humidity: '41%',
    wind: '10 km/h',
    visibility: '9 km',
    pressure: '1,011 hPa',
    airQuality: '보통 · 58 AQI',
    uvIndex: '9 / 11',
    precipitation: '10%',
    sunrise: '05:35',
    sunset: '19:31',
    comfortScore: '7.6',
    comfortLabel: 'Plan heat breaks',
    bestWindow: '08:00–11:00',
    forecast: [
      { day: 'Now', temp: 30, icon: '🌞', status: 'Hot', rain: 10 },
      { day: '13:00', temp: 32, icon: '☀️', status: 'Hot', rain: 8 },
      { day: '15:00', temp: 33, icon: '☀️', status: 'Hot', rain: 6 },
      { day: '17:00', temp: 31, icon: '🌤️', status: 'Bright', rain: 8 },
      { day: '19:00', temp: 27, icon: '🌙', status: 'Clear', rain: 5 },
      { day: '21:00', temp: 25, icon: '🌙', status: 'Clear', rain: 4 },
    ],
  },
  {
    id: 'city_07',
    name: '대전',
    region: 'South Korea',
    temp: 27,
    feelsLike: 28,
    high: 29,
    low: 21,
    status: '맑음',
    description: '공기가 깨끗하고 안정적인 날씨예요. 야외 활동을 계획해보세요.',
    icon: '🌤️',
    humidity: '48%',
    wind: '8 km/h',
    visibility: '13 km',
    pressure: '1,017 hPa',
    airQuality: '좋음 · 24 AQI',
    uvIndex: '6 / 11',
    precipitation: '15%',
    sunrise: '05:40',
    sunset: '19:26',
    comfortScore: '8.2',
    comfortLabel: 'Comfortable',
    bestWindow: '10:00–18:00',
    forecast: [
      { day: 'Now', temp: 27, icon: '🌤️', status: 'Bright', rain: 15 },
      { day: '13:00', temp: 28, icon: '☀️', status: 'Clear', rain: 12 },
      { day: '15:00', temp: 29, icon: '☀️', status: 'Clear', rain: 9 },
      { day: '17:00', temp: 27, icon: '🌤️', status: 'Bright', rain: 11 },
      { day: '19:00', temp: 24, icon: '🌙', status: 'Calm', rain: 7 },
      { day: '21:00', temp: 22, icon: '🌙', status: 'Calm', rain: 5 },
    ],
  },
  {
    id: 'city_08',
    name: '광주',
    region: 'South Korea',
    temp: 25,
    feelsLike: 25,
    high: 28,
    low: 20,
    status: '소나기',
    description: '오후 소나기 가능성이 있어요. 짧은 외출에도 우산을 준비하세요.',
    icon: '🌦️',
    humidity: '68%',
    wind: '11 km/h',
    visibility: '8 km',
    pressure: '1,014 hPa',
    airQuality: '좋음 · 36 AQI',
    uvIndex: '5 / 11',
    precipitation: '45%',
    sunrise: '05:45',
    sunset: '19:29',
    comfortScore: '7.0',
    comfortLabel: 'Keep an umbrella',
    bestWindow: '12:00–15:00',
    forecast: [
      { day: 'Now', temp: 25, icon: '🌦️', status: 'Showers', rain: 45 },
      { day: '13:00', temp: 27, icon: '🌦️', status: 'Showers', rain: 48 },
      { day: '15:00', temp: 28, icon: '🌧️', status: 'Rain', rain: 55 },
      { day: '17:00', temp: 26, icon: '🌦️', status: 'Showers', rain: 42 },
      { day: '19:00', temp: 23, icon: '☁️', status: 'Cloudy', rain: 26 },
      { day: '21:00', temp: 21, icon: '☁️', status: 'Cloudy', rain: 18 },
    ],
  },
]

weatherStore.hydrateCities(weatherSeed)

const {
  apiKeyConfigured,
  cities: weatherList,
  errorMessage: apiErrorMessage,
  favoriteCitiesCount,
  isLoading: isRefreshing,
  selectedCity,
  selectedCityId,
  sourceLabel,
} = storeToRefs(weatherStore)

const cityQuery = ref('')
const detailCityId = ref(null)
const showFavoritesOnly = ref(false)
const alertDismissed = ref(false)
const searchActivityMessage = ref('전체 도시를 둘러보는 중입니다.')
const modalCloseButton = ref(null)
let detailReturnFocus = null

const filteredWeather = computed(() => {
  const query = cityQuery.value.trim().toLowerCase()
  const source = showFavoritesOnly.value ? weatherList.value.filter((city) => isFavorite(city.id)) : weatherList.value

  if (!query) {
    return source
  }

  return source.filter((city) => `${city.name} ${city.region}`.toLowerCase().includes(query))
})

const detailCity = computed(() => weatherList.value.find((city) => city.id === detailCityId.value))
const weatherAlert = computed(() => {
  const city = selectedCity.value
  const precipitation = Number.parseInt(city.precipitation, 10)
  const uvIndex = Number.parseInt(city.uvIndex, 10)

  if (precipitation >= 60) {
    return {
      tone: 'rain',
      icon: '☔',
      title: '우산을 챙기세요',
      message: `${city.name}은(는) 강수확률 ${city.precipitation}로 비가 예상돼요. 실내 일정이나 짧은 외출을 추천합니다.`,
      action: '우산 준비',
    }
  }

  if (city.temp >= 30) {
    return {
      tone: 'heat',
      icon: '☀️',
      title: '더위 주의보',
      message: `현재 ${city.name}은(는) ${city.temp}°로 더워요. 물을 자주 마시고 한낮 활동을 줄여보세요.`,
      action: '수분 보충',
    }
  }

  if (uvIndex >= 8) {
    return {
      tone: 'uv',
      icon: '🧴',
      title: '자외선이 강해요',
      message: `자외선 지수 ${city.uvIndex}입니다. 외출 전 선크림과 모자를 준비해 보세요.`,
      action: '햇빛 대비',
    }
  }

  return {
    tone: 'clear',
    icon: '🌿',
    title: '외출하기 좋은 날',
    message: `${city.name}은(는) ${city.bestWindow} 사이가 가장 편안해요. ${city.description}`,
    action: '일정 계획',
  }
})
const selectedMetrics = computed(() => [
  { label: 'Humidity', value: selectedCity.value.humidity, icon: '◌', tone: 'mint' },
  { label: 'Wind', value: selectedCity.value.wind, icon: '↗', tone: 'blue' },
  { label: 'Visibility', value: selectedCity.value.visibility, icon: '◉', tone: 'lavender' },
  { label: 'Pressure', value: selectedCity.value.pressure, icon: '⌁', tone: 'sand' },
  { label: 'Air quality', value: selectedCity.value.airQuality, icon: '≋', tone: 'sky' },
  { label: 'UV index', value: selectedCity.value.uvIndex, icon: '☼', tone: 'rose' },
])
const lastUpdated = computed(() => {
  if (!selectedCity.value.updatedAt) return 'Mock dataset'

  return new Date(selectedCity.value.updatedAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
const apiStatusMessage = computed(() => {
  if (apiErrorMessage.value) return apiErrorMessage.value
  if (selectedCity.value.dataSource === 'live') return `${selectedCity.value.name} 실시간 관측값이 적용됐습니다.`
  if (apiKeyConfigured.value) return '도시를 선택하거나 검색할 때마다 OpenWeather를 다시 조회합니다.'
  return 'API 키가 없어 안전한 Mock 데이터로 동작 중입니다.'
})

watch(selectedCityId, (nextId, previousId) => {
  if (nextId !== previousId) {
    alertDismissed.value = false
  }
})

watchEffect(() => {
  const query = cityQuery.value.trim()
  searchActivityMessage.value = query
    ? `“${query}” 검색 결과 ${filteredWeather.value.length}개`
    : `전체 도시 ${weatherList.value.length}곳을 표시하고 있습니다.`
})

async function selectCity(city, options = {}) {
  weatherStore.selectCity(city)

  if (options.refresh === false) return

  await requestLiveWeather(city.apiQuery ?? city.name, {
    notify: false,
    syncQuery: false,
  })
}

function showDetail(city) {
  void selectCity(city, { refresh: props.detailMode !== 'route' })

  if (props.detailMode === 'route') {
    emit('click-detail', city)
    return
  }

  detailReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  detailCityId.value = city.id
  void nextTick(() => modalCloseButton.value?.focus())
}

function closeDetails() {
  detailCityId.value = null
  void nextTick(() => {
    detailReturnFocus?.focus()
    detailReturnFocus = null
  })
}

function handleModalKeydown(event) {
  if (event.key === 'Escape' && detailCity.value) {
    closeDetails()
  }
}

function handleQueryUpdate(query) {
  cityQuery.value = query
  const normalizedQuery = query.trim().toLowerCase()
  const firstMatch = weatherList.value.find((city) =>
    `${city.name} ${city.region}`.toLowerCase().includes(normalizedQuery),
  )

  if (firstMatch) {
    weatherStore.selectCity(firstMatch)
  }
}

function clearSearch() {
  cityQuery.value = ''
}

function toggleFavoritesOnly() {
  showFavoritesOnly.value = !showFavoritesOnly.value
}

function dismissAlert() {
  alertDismissed.value = true
}

function isFavorite(cityId) {
  return weatherStore.isFavorite(cityId)
}

function toggleFavorite(city) {
  weatherStore.toggleFavorite(city)
}

async function requestLiveWeather(query, options = {}) {
  const { notify = true, successMessage, syncQuery = true } = options
  const result = await weatherStore.loadLiveWeather(query)

  if (result.ok) {
    if (syncQuery) {
      cityQuery.value = result.city.name
    }

    alertDismissed.value = false

    if (notify) {
      ElMessage.success(successMessage ?? `${result.city.name} 실시간 날씨를 불러왔습니다.`)
    }

    return
  }

  if (result.reason === 'stale-request') return
  if (!notify) return

  if (result.reason === 'missing-key') {
    ElMessage.warning(result.message)
    return
  }

  ElMessage.error(`${result.message} 기존 데이터를 유지합니다.`)
}

function submitCitySearch() {
  const query = cityQuery.value.trim() || selectedCity.value.apiQuery
  return requestLiveWeather(query)
}

function refreshWeather() {
  return requestLiveWeather(selectedCity.value.apiQuery ?? selectedCity.value.name, {
    successMessage: '최신 관측값으로 갱신했습니다.',
    syncQuery: false,
  })
}

onMounted(() => {
  document.addEventListener('keydown', handleModalKeydown)

  if (apiKeyConfigured.value) {
    void requestLiveWeather(selectedCity.value.apiQuery ?? selectedCity.value.name, {
      notify: false,
      syncQuery: false,
    })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleModalKeydown)
})
</script>

<template>
  <section class="weather-dashboard" aria-labelledby="weather-dashboard-title">
    <div class="weather-dashboard-head">
      <div>
        <p class="weather-dashboard-kicker">PERSONAL WEATHER DESK</p>
        <h2 id="weather-dashboard-title">Your weather, at a glance</h2>
        <p class="weather-dashboard-subtitle">Mock에서 실시간 API까지 이어진 SKALA-VUE 최종 날씨 대시보드입니다.</p>
      </div>
      <div class="weather-dashboard-head-actions">
        <span class="weather-source-chip" :class="{ live: selectedCity.dataSource === 'live' }">
          <i aria-hidden="true"></i>{{ sourceLabel }}
        </span>
        <UnitToggler />
      </div>
    </div>

    <div class="weather-dashboard-toolbar">
      <SearchBar
        :query="cityQuery"
        :loading="isRefreshing"
        @update-query="handleQueryUpdate"
        @clear-query="clearSearch"
        @submit-query="submitCitySearch"
      />
      <div class="weather-dashboard-toolbar-meta">
        <span
          ><i class="weather-live-dot" :class="{ live: selectedCity.dataSource === 'live' }" aria-hidden="true"></i>
          Updated {{ lastUpdated }}</span
        >
        <button
          type="button"
          class="weather-refresh-button"
          :class="{ refreshing: isRefreshing }"
          :disabled="isRefreshing"
          @click="refreshWeather"
        >
          <span aria-hidden="true">↻</span> {{ isRefreshing ? 'Loading' : 'Refresh' }}
        </button>
        <button
          type="button"
          class="weather-filter-toggle"
          :class="{ active: showFavoritesOnly }"
          :aria-pressed="showFavoritesOnly"
          @click="toggleFavoritesOnly"
        >
          <span aria-hidden="true">★</span> Favorites {{ favoriteCitiesCount }}
        </button>
      </div>
    </div>

    <div
      class="weather-api-status"
      :class="{ error: apiErrorMessage, live: selectedCity.dataSource === 'live' }"
      role="status"
    >
      <strong>{{ selectedCity.dataSource === 'live' ? 'LIVE DATA' : 'DEMO DATA' }}</strong>
      <span>{{ apiStatusMessage }}</span>
      <small>{{ searchActivityMessage }}</small>
    </div>

    <div class="weather-city-chips" aria-label="빠른 도시 선택">
      <button
        v-for="city in weatherList"
        :key="city.id"
        type="button"
        class="weather-city-chip"
        :class="{ active: city.id === selectedCity.id }"
        @click="selectCity(city)"
      >
        <span aria-hidden="true">{{ city.icon }}</span
        >{{ city.name }}
      </button>
    </div>

    <aside v-if="!alertDismissed" class="weather-alert-card" :class="`tone-${weatherAlert.tone}`">
      <span class="weather-alert-icon" aria-hidden="true">{{ weatherAlert.icon }}</span>
      <div class="weather-alert-copy">
        <strong>{{ weatherAlert.title }}</strong>
        <p>{{ weatherAlert.message }}</p>
      </div>
      <span class="weather-alert-action">{{ weatherAlert.action }}</span>
      <button type="button" class="weather-alert-dismiss" aria-label="알림 닫기" @click="dismissAlert">×</button>
    </aside>

    <div class="weather-dashboard-grid">
      <WeatherCard
        variant="current"
        :city="selectedCity"
        :favorite="isFavorite(selectedCity.id)"
        @toggle-favorite="toggleFavorite"
      />

      <BaseDashboardCard class="weather-locations-card" eyebrow="SAVED LOCATIONS" title="My places">
        <template #meta>{{ filteredWeather.length }}/{{ weatherList.length }}</template>

        <div v-if="filteredWeather.length" class="weather-location-list">
          <WeatherCard
            v-for="city in filteredWeather"
            :key="city.id"
            variant="location"
            :city="city"
            :selected="city.id === selectedCity.id"
            :favorite="isFavorite(city.id)"
            @select-card="selectCity"
            @click-detail="showDetail"
            @toggle-favorite="toggleFavorite"
          />
        </div>
        <p v-else class="weather-location-empty">No places match “{{ cityQuery }}”. Try another search.</p>

        <div class="weather-location-footer">
          <span class="weather-location-footer-dot"></span> Favorites are saved locally ·
          {{ favoriteCitiesCount }} saved
        </div>
      </BaseDashboardCard>
    </div>

    <div class="weather-stat-grid">
      <article v-for="metric in selectedMetrics" :key="metric.label" class="weather-stat-card">
        <span class="weather-stat-icon" :class="`tone-${metric.tone}`" aria-hidden="true">{{ metric.icon }}</span>
        <div>
          <span>{{ metric.label }}</span
          ><strong :title="metric.value">{{ metric.value }}</strong>
        </div>
      </article>
    </div>

    <div class="weather-bottom-grid">
      <BaseDashboardCard class="weather-planner-card" eyebrow="DAY PLANNER" title="Make the most of today">
        <template #meta><span aria-hidden="true">✦</span></template>
        <p>
          {{ selectedCity.name }} is looking {{ selectedCity.temp >= 25 ? 'warm and bright' : 'cool and comfortable' }}.
          {{ selectedCity.description }}
        </p>
        <div class="weather-planner-tags">
          <span>☕ Morning walk</span><span>◷ Best window {{ selectedCity.bestWindow }}</span
          ><span>Rain {{ selectedCity.precipitation }}</span
          ><span>UV {{ selectedCity.uvIndex }}</span>
        </div>
        <p class="weather-daylight">Sunrise {{ selectedCity.sunrise }} · Sunset {{ selectedCity.sunset }}</p>
      </BaseDashboardCard>

      <BaseDashboardCard class="weather-snapshot-card" eyebrow="TODAY’S SNAPSHOT" title="At a glance">
        <template #meta
          ><span class="weather-snapshot-score">{{ selectedCity.comfortScore }}<small>/10</small></span></template
        >
        <div class="weather-snapshot-bar">
          <span :style="{ width: `${Number(selectedCity.comfortScore) * 10}%` }"></span>
        </div>
        <div class="weather-snapshot-footer">
          <span>Comfort index</span><strong>{{ selectedCity.comfortLabel }}</strong>
        </div>
      </BaseDashboardCard>
    </div>

    <div v-if="detailCity" class="weather-modal-layer" role="presentation" @click.self="closeDetails">
      <section class="weather-detail-modal" role="dialog" aria-modal="true" aria-labelledby="weather-detail-title">
        <button
          ref="modalCloseButton"
          type="button"
          class="weather-modal-close"
          aria-label="상세 패널 닫기"
          @click="closeDetails"
        >
          ×
        </button>
        <span class="weather-modal-icon" aria-hidden="true">{{ detailCity.icon }}</span>
        <p class="weather-card-label">CITY DETAIL</p>
        <h3 id="weather-detail-title">{{ detailCity.name }} weather profile</h3>
        <p class="weather-modal-description">{{ detailCity.description }}</p>
        <div class="weather-modal-stats">
          <span
            ><small>Current</small
            ><strong>{{ displayTemperature(detailCity.temp) }}{{ configStore.unitSymbol }}</strong></span
          ><span
            ><small>High / low</small
            ><strong
              >{{ displayTemperature(detailCity.high) }}{{ configStore.unitSymbol }} /
              {{ displayTemperature(detailCity.low) }}{{ configStore.unitSymbol }}</strong
            ></span
          ><span
            ><small>Status</small><strong>{{ detailCity.status }}</strong></span
          ><span
            ><small>Air quality</small><strong>{{ detailCity.airQuality }}</strong></span
          ><span
            ><small>UV index</small><strong>{{ detailCity.uvIndex }}</strong></span
          ><span
            ><small>Sunrise / sunset</small><strong>{{ detailCity.sunrise }} / {{ detailCity.sunset }}</strong></span
          >
        </div>
        <button type="button" class="weather-modal-primary" @click="closeDetails">Done</button>
      </section>
    </div>
  </section>
</template>

<style scoped>
.weather-dashboard {
  --weather-ink: #202438;
  --weather-muted: #7a8297;
  --weather-line: #e8eaf2;
  --weather-accent: #6268ef;
  --weather-accent-dark: #4d53d4;
  position: relative;
  padding: 30px;
  overflow: hidden;
  border: 1px solid #e6e8f0;
  border-radius: 24px;
  color: var(--weather-ink);
  background: #f8f9fc;
  box-shadow: 0 20px 45px rgba(36, 42, 73, 0.08);
}

:global(.weather-page) > .weather-dashboard {
  width: 100%;
  min-height: 100%;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  box-shadow: none;
}

.weather-dashboard::before {
  position: absolute;
  top: -160px;
  right: -120px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: rgba(113, 118, 239, 0.09);
  content: '';
  pointer-events: none;
}

.weather-dashboard-head,
.weather-dashboard-toolbar,
.weather-city-chips,
.weather-api-status,
.weather-alert-card,
.weather-dashboard-grid,
.weather-stat-grid,
.weather-bottom-grid {
  position: relative;
  z-index: 1;
}

.weather-dashboard-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.weather-dashboard-kicker,
.weather-card-label {
  margin: 0 0 8px;
  color: #7b83a0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.weather-dashboard-head h2 {
  margin: 0;
  color: var(--weather-ink);
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.045em;
}

.weather-dashboard-subtitle {
  margin: 8px 0 0;
  color: var(--weather-muted);
  font-size: 13px;
}

.weather-dashboard-head-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
}

.weather-source-chip {
  min-height: 33px;
  padding: 7px 10px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #e5dfcd;
  border-radius: 9px;
  color: #7b6840;
  background: #fffaf0;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.weather-source-chip i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d5a849;
}

.weather-source-chip.live {
  border-color: #cfe8dc;
  color: #287550;
  background: #f1fbf6;
}

.weather-source-chip.live i {
  background: #42b883;
}

.weather-account-chip {
  padding: 7px 10px 7px 7px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid var(--weather-line);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 5px 14px rgba(46, 52, 86, 0.05);
}

.weather-account-avatar {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #7379ea;
  font-size: 12px;
  font-weight: 800;
}

.weather-account-chip > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.weather-account-chip strong {
  color: var(--weather-ink);
  font-size: 12px;
}

.weather-account-chip small {
  color: var(--weather-muted);
  font-size: 10px;
}

.weather-dashboard-toolbar {
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.weather-dashboard-toolbar-meta {
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--weather-muted);
  font-size: 11px;
}

.weather-api-status {
  margin-top: 14px;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  border: 1px solid #e4e6ef;
  border-radius: 11px;
  color: #71798f;
  background: #fff;
  font-size: 11px;
}

.weather-api-status strong {
  color: #8c7345;
  font-size: 9px;
  letter-spacing: 0.08em;
}

.weather-api-status small {
  color: #9aa0b1;
  font-size: 10px;
  white-space: nowrap;
}

.weather-api-status.live {
  border-color: #d5eadf;
  background: #f6fcf9;
}

.weather-api-status.live strong {
  color: #287550;
}

.weather-api-status.error {
  border-color: #f0d6d1;
  color: #9a4f43;
  background: #fff7f5;
}

.weather-live-dot {
  width: 7px;
  height: 7px;
  margin-right: 4px;
  display: inline-block;
  border-radius: 50%;
  background: #d5a849;
  box-shadow: 0 0 0 3px rgba(213, 168, 73, 0.15);
}

.weather-live-dot.live {
  background: #56bf8a;
  box-shadow: 0 0 0 3px rgba(86, 191, 138, 0.15);
}

.weather-refresh-button {
  min-height: 40px;
  padding: 6px 10px;
  border: 1px solid var(--weather-line);
  border-radius: 8px;
  color: #5d6681;
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.weather-refresh-button:hover {
  border-color: #b9bcf3;
  color: var(--weather-accent-dark);
  transform: translateY(-1px);
}

.weather-refresh-button span {
  margin-right: 4px;
  display: inline-block;
  font-size: 15px;
}

.weather-refresh-button.refreshing span {
  animation: weather-spin 500ms linear infinite;
}

.weather-filter-toggle {
  min-height: 40px;
  padding: 6px 10px;
  border: 1px solid var(--weather-line);
  border-radius: 8px;
  color: #5d6681;
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    background-color 160ms ease;
}

.weather-filter-toggle:hover,
.weather-filter-toggle.active {
  border-color: #b9bcf3;
  color: var(--weather-accent-dark);
  background: #eeefff;
}

@keyframes weather-spin {
  to {
    transform: rotate(360deg);
  }
}

.weather-city-chips {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.weather-city-chips::-webkit-scrollbar {
  display: none;
}

.weather-city-chip {
  min-height: 36px;
  padding: 5px 11px;
  flex: 0 0 auto;
  border: 1px solid var(--weather-line);
  border-radius: 999px;
  color: #737a90;
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition:
    color 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease;
}

.weather-city-chip span {
  margin-right: 5px;
}

.weather-city-chip:hover,
.weather-city-chip.active {
  border-color: #b9bcf3;
  color: #4f56d2;
  background: #eeefff;
}

.weather-alert-card {
  margin-top: 16px;
  padding: 13px 14px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 11px;
  border: 1px solid #dce8e2;
  border-radius: 12px;
  background: #f4fbf7;
}

.weather-alert-card.tone-rain {
  border-color: #dbe5f6;
  background: #f3f7ff;
}

.weather-alert-card.tone-heat {
  border-color: #f3e4c7;
  background: #fff9ed;
}

.weather-alert-card.tone-uv {
  border-color: #f0d9e8;
  background: #fff4fa;
}

.weather-alert-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.68);
  font-size: 20px;
}

.weather-alert-copy {
  min-width: 0;
}

.weather-alert-copy strong {
  color: #2d6350;
  font-size: 12px;
}

.weather-alert-card.tone-rain .weather-alert-copy strong {
  color: #3f65a0;
}
.weather-alert-card.tone-heat .weather-alert-copy strong {
  color: #9a6a2b;
}
.weather-alert-card.tone-uv .weather-alert-copy strong {
  color: #a45079;
}

.weather-alert-copy p {
  overflow: hidden;
  margin: 4px 0 0;
  color: #71818a;
  font-size: 11px;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.weather-alert-action {
  padding: 5px 8px;
  border-radius: 999px;
  color: #287550;
  background: rgba(66, 184, 131, 0.12);
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.weather-alert-dismiss {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 7px;
  color: #8b9b9a;
  background: transparent;
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
}

.weather-alert-dismiss:hover {
  color: #526a61;
  background: rgba(255, 255, 255, 0.75);
}

.weather-dashboard-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(300px, 0.88fr);
  gap: 16px;
}

.weather-stat-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.weather-stat-card {
  min-width: 0;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--weather-line);
  border-radius: 13px;
  background: #fff;
}

.weather-stat-icon {
  width: 31px;
  height: 31px;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  font-size: 16px;
  font-weight: 800;
}

.weather-stat-icon.tone-mint {
  color: #42a579;
  background: #e6f8ef;
}
.weather-stat-icon.tone-blue {
  color: #4e83d2;
  background: #eaf2ff;
}
.weather-stat-icon.tone-lavender {
  color: #7862cb;
  background: #f0ecff;
}
.weather-stat-icon.tone-sand {
  color: #bd8a48;
  background: #fff4df;
}
.weather-stat-icon.tone-sky {
  color: #3f8eb5;
  background: #e8f6fb;
}
.weather-stat-icon.tone-rose {
  color: #c25e85;
  background: #fff0f5;
}

.weather-stat-card > div {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.weather-stat-card > div span {
  color: #9aa0b1;
  font-size: 10px;
}

.weather-stat-card > div strong {
  overflow: hidden;
  color: var(--weather-ink);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.weather-bottom-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 16px;
}

.weather-planner-card,
.weather-snapshot-card {
  min-height: 166px;
}

.weather-planner-card > p {
  max-width: 56ch;
  margin: 18px 0 0;
  color: var(--weather-muted);
  font-size: 12px;
  line-height: 1.7;
}

.weather-planner-tags {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.weather-planner-tags span {
  padding: 6px 8px;
  border-radius: 7px;
  color: #66708a;
  background: #f4f5f9;
  font-size: 10px;
}

.weather-daylight {
  margin: 13px 0 0 !important;
  color: #a0a6b5 !important;
  font-size: 10px !important;
}

.weather-snapshot-score {
  color: #6268dc !important;
  font-size: 21px !important;
  font-weight: 800;
}

.weather-snapshot-score small {
  color: #a2a7b8;
  font-size: 11px;
  font-weight: 500;
}

.weather-snapshot-bar {
  height: 7px;
  margin-top: 28px;
  overflow: hidden;
  border-radius: 999px;
  background: #eef0f6;
}

.weather-snapshot-bar span {
  height: 100%;
  display: block;
  border-radius: inherit;
  background: linear-gradient(90deg, #7ccda5, #6268e5);
}

.weather-snapshot-footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #9aa0b1;
  font-size: 10px;
}

.weather-snapshot-footer strong {
  color: #596078;
  font-size: 11px;
}

.weather-modal-layer {
  position: fixed;
  inset: 0;
  z-index: 10;
  padding: 20px;
  display: grid;
  place-items: center;
  background: rgba(24, 28, 48, 0.48);
  backdrop-filter: blur(4px);
}

.weather-detail-modal {
  width: min(100%, 390px);
  position: relative;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 19px;
  background: #fff;
  box-shadow: 0 24px 80px rgba(16, 20, 44, 0.25);
}

.weather-modal-close {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 17px;
  right: 17px;
  border: 0;
  border-radius: 8px;
  color: #8b91a4;
  background: #f1f2f7;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.weather-modal-icon {
  display: block;
  font-size: 42px;
}

.weather-detail-modal h3 {
  margin: 0;
  color: var(--weather-ink);
  font-size: 23px;
  letter-spacing: -0.04em;
}

.weather-modal-description {
  margin: 10px 0 0;
  color: var(--weather-muted);
  font-size: 13px;
  line-height: 1.6;
}

.weather-modal-stats {
  margin-top: 21px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
}

.weather-modal-stats span {
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 8px;
  background: #f6f7fb;
}

.weather-modal-stats small {
  color: #969caf;
  font-size: 9px;
}

.weather-modal-stats strong {
  color: #4d5570;
  font-size: 12px;
}

.weather-modal-primary {
  width: 100%;
  min-height: 40px;
  margin-top: 22px;
  border: 0;
  border-radius: 9px;
  color: #fff;
  background: var(--weather-accent);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.weather-modal-primary:hover {
  background: var(--weather-accent-dark);
}

@media (max-width: 760px) {
  .weather-dashboard {
    padding: 20px;
  }

  .weather-dashboard-head,
  .weather-dashboard-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .weather-dashboard-head-actions {
    justify-content: flex-start;
  }

  .weather-api-status {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .weather-api-status small {
    grid-column: 1 / -1;
    white-space: normal;
  }

  .weather-account-chip {
    align-self: flex-start;
  }

  .weather-dashboard-grid,
  .weather-bottom-grid {
    grid-template-columns: 1fr;
  }

  .weather-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .weather-dashboard {
    padding: 15px;
  }

  .weather-dashboard-head h2 {
    font-size: 29px;
  }

  .weather-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .weather-alert-card {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .weather-alert-action {
    grid-column: 2;
    justify-self: start;
  }

  .weather-alert-copy p {
    white-space: normal;
  }

  .weather-modal-stats {
    grid-template-columns: 1fr;
  }
}
</style>
