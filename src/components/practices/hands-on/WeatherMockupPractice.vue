<script setup>
import { computed, ref } from 'vue'

const weatherList = ref([
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
])

const cityQuery = ref('')
const selectedCityId = ref('city_01')
const detailCityId = ref(null)
const favoriteCityIds = ref(['city_01', 'city_03'])
const lastUpdated = ref('2 min ago')
const isRefreshing = ref(false)

const filteredWeather = computed(() => {
  const query = cityQuery.value.trim().toLowerCase()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((city) => `${city.name} ${city.region}`.toLowerCase().includes(query))
})

const selectedCity = computed(() => weatherList.value.find((city) => city.id === selectedCityId.value) ?? weatherList.value[0])
const detailCity = computed(() => weatherList.value.find((city) => city.id === detailCityId.value))
const selectedMetrics = computed(() => [
  { label: 'Humidity', value: selectedCity.value.humidity, icon: '◌', tone: 'mint' },
  { label: 'Wind', value: selectedCity.value.wind, icon: '↗', tone: 'blue' },
  { label: 'Visibility', value: selectedCity.value.visibility, icon: '◉', tone: 'lavender' },
  { label: 'Pressure', value: selectedCity.value.pressure, icon: '⌁', tone: 'sand' },
  { label: 'Air quality', value: selectedCity.value.airQuality, icon: '≋', tone: 'sky' },
  { label: 'UV index', value: selectedCity.value.uvIndex, icon: '☼', tone: 'rose' },
])

function selectCity(city) {
  selectedCityId.value = city.id
}

function showDetail(city) {
  selectCity(city)
  detailCityId.value = city.id
}

function closeDetails() {
  detailCityId.value = null
}

function clearSearch() {
  cityQuery.value = ''
}

function handleSearchInput(event) {
  cityQuery.value = event.target.value
  const query = cityQuery.value.trim().toLowerCase()
  const firstMatch = weatherList.value.find((city) => `${city.name} ${city.region}`.toLowerCase().includes(query))

  if (firstMatch) {
    selectCity(firstMatch)
  }
}

function isFavorite(cityId) {
  return favoriteCityIds.value.includes(cityId)
}

function toggleFavorite(city) {
  favoriteCityIds.value = isFavorite(city.id)
    ? favoriteCityIds.value.filter((id) => id !== city.id)
    : [...favoriteCityIds.value, city.id]
}

function refreshWeather() {
  isRefreshing.value = true
  lastUpdated.value = 'just now'
  window.setTimeout(() => {
    isRefreshing.value = false
  }, 450)
}
</script>

<template>
  <section class="weather-dashboard" aria-labelledby="weather-dashboard-title">
    <div class="weather-dashboard-head">
      <div>
        <p class="weather-dashboard-kicker">PERSONAL WEATHER DESK</p>
        <h2 id="weather-dashboard-title">Your weather, at a glance</h2>
        <p class="weather-dashboard-subtitle">Tuesday, August 25 · Plan the rest of your day with confidence.</p>
      </div>
      <div class="weather-account-chip">
        <span class="weather-account-avatar" aria-hidden="true">H</span>
        <span><strong>Huitae Park</strong><small>Personal workspace</small></span>
      </div>
    </div>

    <div class="weather-dashboard-toolbar">
      <label class="weather-dashboard-search" for="weather-city-search">
        <span aria-hidden="true">⌕</span>
        <span class="sr-only">도시 검색</span>
        <input
          id="weather-city-search"
          type="text"
          :value="cityQuery"
          placeholder="Search a city or region"
          @input="handleSearchInput"
        />
        <button v-if="cityQuery" type="button" aria-label="검색어 지우기" @click="clearSearch">×</button>
      </label>
      <div class="weather-dashboard-toolbar-meta">
        <span><i class="weather-live-dot" aria-hidden="true"></i> Updated {{ lastUpdated }}</span>
        <button type="button" class="weather-refresh-button" :class="{ refreshing: isRefreshing }" @click="refreshWeather">
          <span aria-hidden="true">↻</span> Refresh
        </button>
      </div>
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
        <span aria-hidden="true">{{ city.icon }}</span>{{ city.name }}
      </button>
    </div>

    <div class="weather-dashboard-grid">
      <article class="weather-current-card">
        <div class="weather-current-topline">
          <div>
            <p class="weather-card-label">CURRENT CONDITIONS</p>
            <h3>{{ selectedCity.name }}</h3>
            <p class="weather-current-region">{{ selectedCity.region }} · {{ selectedCity.status }}</p>
          </div>
          <button
            type="button"
            class="weather-favorite-button"
            :class="{ active: isFavorite(selectedCity.id) }"
            :aria-pressed="isFavorite(selectedCity.id)"
            :aria-label="isFavorite(selectedCity.id) ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'"
            @click="toggleFavorite(selectedCity)"
          >
            {{ isFavorite(selectedCity.id) ? '★' : '☆' }}
          </button>
        </div>

        <div class="weather-current-reading">
          <span class="weather-current-icon" aria-hidden="true">{{ selectedCity.icon }}</span>
          <div>
            <strong>{{ selectedCity.temp }}<sup>°</sup></strong>
            <span v-if="selectedCity.temp >= 25" class="weather-condition-pill warm">Warm &amp; bright</span>
            <span v-else class="weather-condition-pill cool">Cool &amp; calm</span>
          </div>
        </div>

        <p class="weather-current-description">{{ selectedCity.description }}</p>
        <div class="weather-high-low"><span>Feels like <strong>{{ selectedCity.feelsLike }}°</strong></span><span>H <strong>{{ selectedCity.high }}°</strong></span><span>L <strong>{{ selectedCity.low }}°</strong></span><span>Rain <strong>{{ selectedCity.precipitation }}</strong></span></div>

        <div class="weather-hourly-heading"><span>Next 6 hours</span><small>Local time</small></div>
        <div class="weather-hourly-list">
          <div v-for="hour in selectedCity.forecast" :key="`${selectedCity.id}-${hour.day}`" class="weather-hourly-item">
            <span>{{ hour.day }}</span>
            <span class="weather-hourly-icon" aria-hidden="true">{{ hour.icon }}</span>
            <strong>{{ hour.temp }}°</strong>
            <small>{{ hour.rain }}% rain</small>
          </div>
        </div>
      </article>

      <aside class="weather-locations-card">
        <div class="weather-panel-heading">
          <div><p class="weather-card-label">SAVED LOCATIONS</p><h3>My places</h3></div>
          <span>{{ filteredWeather.length }}/{{ weatherList.length }}</span>
        </div>

        <div v-if="filteredWeather.length" class="weather-location-list">
          <article
            v-for="city in filteredWeather"
            :key="city.id"
            class="weather-location-row"
            :class="{ selected: city.id === selectedCity.id }"
            tabindex="0"
            @click="selectCity(city)"
            @keydown.enter="selectCity(city)"
            @keydown.space.prevent="selectCity(city)"
          >
            <span class="weather-location-icon" aria-hidden="true">{{ city.icon }}</span>
            <div class="weather-location-name"><strong>{{ city.name }}</strong><span>{{ city.status }} · {{ city.low }}° / {{ city.high }}°</span></div>
            <strong class="weather-location-temp">{{ city.temp }}°</strong>
            <button
              type="button"
              class="weather-location-favorite"
              :class="{ active: isFavorite(city.id) }"
              :aria-label="isFavorite(city.id) ? `${city.name} 즐겨찾기 해제` : `${city.name} 즐겨찾기 추가`"
              @click.stop="toggleFavorite(city)"
            >{{ isFavorite(city.id) ? '★' : '☆' }}</button>
            <button type="button" class="weather-location-action" @click.stop="showDetail(city)">View</button>
          </article>
        </div>
        <p v-else class="weather-location-empty">No places match “{{ cityQuery }}”. Try another search.</p>

        <div class="weather-location-footer"><span class="weather-location-footer-dot"></span> Local mock data · No API key required</div>
      </aside>
    </div>

    <div class="weather-stat-grid">
      <article v-for="metric in selectedMetrics" :key="metric.label" class="weather-stat-card">
        <span class="weather-stat-icon" :class="`tone-${metric.tone}`" aria-hidden="true">{{ metric.icon }}</span>
        <div><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong></div>
      </article>
    </div>

    <div class="weather-bottom-grid">
      <section class="weather-planner-card">
        <div class="weather-panel-heading"><div><p class="weather-card-label">DAY PLANNER</p><h3>Make the most of today</h3></div><span aria-hidden="true">✦</span></div>
        <p>{{ selectedCity.name }} is looking {{ selectedCity.temp >= 25 ? 'warm and bright' : 'cool and comfortable' }}. {{ selectedCity.description }}</p>
        <div class="weather-planner-tags"><span>☕ Morning walk</span><span>◷ Best window {{ selectedCity.bestWindow }}</span><span>Rain {{ selectedCity.precipitation }}</span><span>UV {{ selectedCity.uvIndex }}</span></div>
        <p class="weather-daylight">Sunrise {{ selectedCity.sunrise }} · Sunset {{ selectedCity.sunset }}</p>
      </section>
      <section class="weather-snapshot-card">
        <div class="weather-panel-heading"><div><p class="weather-card-label">TODAY’S SNAPSHOT</p><h3>At a glance</h3></div><span class="weather-snapshot-score">{{ selectedCity.comfortScore }}<small>/10</small></span></div>
        <div class="weather-snapshot-bar"><span :style="{ width: `${Number(selectedCity.comfortScore) * 10}%` }"></span></div>
        <div class="weather-snapshot-footer"><span>Comfort index</span><strong>{{ selectedCity.comfortLabel }}</strong></div>
      </section>
    </div>

    <div v-if="detailCity" class="weather-modal-layer" role="presentation" @click.self="closeDetails">
      <section class="weather-detail-modal" role="dialog" aria-modal="true" aria-labelledby="weather-detail-title">
        <button type="button" class="weather-modal-close" aria-label="상세 패널 닫기" @click="closeDetails">×</button>
        <span class="weather-modal-icon" aria-hidden="true">{{ detailCity.icon }}</span>
        <p class="weather-card-label">CITY DETAIL</p>
        <h3 id="weather-detail-title">{{ detailCity.name }} weather profile</h3>
        <p class="weather-modal-description">{{ detailCity.description }}</p>
        <div class="weather-modal-stats"><span><small>Current</small><strong>{{ detailCity.temp }}°</strong></span><span><small>High / low</small><strong>{{ detailCity.high }}° / {{ detailCity.low }}°</strong></span><span><small>Status</small><strong>{{ detailCity.status }}</strong></span><span><small>Air quality</small><strong>{{ detailCity.airQuality }}</strong></span><span><small>UV index</small><strong>{{ detailCity.uvIndex }}</strong></span><span><small>Sunrise / sunset</small><strong>{{ detailCity.sunrise }} / {{ detailCity.sunset }}</strong></span></div>
        <button type="button" class="weather-modal-primary" @click="closeDetails">Done</button>
      </section>
    </div>
  </section>
</template>
