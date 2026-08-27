<script setup>
import { computed, ref } from 'vue'
import {
  fetchJsonPlaceholderPosts,
  fetchOpenWeatherByCity,
  fetchOpenWeatherForecast,
  hasOpenWeatherApiKey,
  toForecastSummary,
  toWeatherSummary,
} from '@/services/weatherApi.js'
import weatherRouteData from '@/data/weatherRouteData.js'

const cityName = ref('Seoul')
const weather = ref(null)
const forecast = ref([])
const posts = ref([])
const weatherLoading = ref(false)
const postsLoading = ref(false)
const weatherError = ref('')
const postsError = ref('')
const sourceLabel = ref('Mock fallback')

const apiKeyConfigured = computed(() => hasOpenWeatherApiKey())
const selectedMockWeather = computed(() => {
  const query = cityName.value.trim().toLowerCase()
  return (
    weatherRouteData.find((item) => item.name.toLowerCase().includes(query) || query.includes('seoul')) ??
    weatherRouteData[0]
  )
})

function useMockWeather() {
  const mock = selectedMockWeather.value
  weather.value = {
    name: mock.name,
    country: 'KR',
    temperature: mock.temp,
    feelsLike: mock.feelsLike,
    high: mock.high,
    low: mock.low,
    humidity: Number.parseInt(mock.humidity, 10),
    wind: mock.wind,
    description: mock.status,
    icon: '',
  }
  forecast.value = mock.forecast.slice(0, 5).map((item) => ({
    time: item.time ?? item.day,
    temperature: item.temp,
    description: item.status ?? 'Mock forecast',
  }))
  sourceLabel.value = 'Mock fallback (API key 없음)'
}

async function loadWeather() {
  weatherError.value = ''
  weatherLoading.value = true

  if (!apiKeyConfigured.value) {
    useMockWeather()
    weatherLoading.value = false
    return
  }

  try {
    const [currentData, forecastData] = await Promise.all([
      fetchOpenWeatherByCity(cityName.value),
      fetchOpenWeatherForecast(cityName.value),
    ])
    weather.value = toWeatherSummary(currentData)
    forecast.value = toForecastSummary(forecastData)
    sourceLabel.value = 'OpenWeatherMap live API'
  } catch (error) {
    weatherError.value = error instanceof Error ? error.message : '날씨 API 요청에 실패했습니다.'
    useMockWeather()
  } finally {
    weatherLoading.value = false
  }
}

async function loadPosts() {
  postsError.value = ''
  postsLoading.value = true

  try {
    posts.value = await fetchJsonPlaceholderPosts(5)
  } catch (error) {
    postsError.value = error instanceof Error ? error.message : 'JSONPlaceholder 요청에 실패했습니다.'
  } finally {
    postsLoading.value = false
  }
}
</script>

<template>
  <div class="axios-practice-stack">
    <section class="practice-section axios-weather-section">
      <div class="axios-section-heading">
        <div>
          <p class="section-kicker">Axios Weather Example</p>
          <h2>OpenWeatherMap 현재 날씨·5일 예보</h2>
        </div>
        <span class="axios-source-badge" :class="{ live: sourceLabel.includes('live') }">{{ sourceLabel }}</span>
      </div>

      <div class="axios-control-row">
        <label class="axios-city-field">
          <span>도시 검색</span>
          <input v-model.trim="cityName" type="search" placeholder="Seoul" @keyup.enter="loadWeather" />
        </label>
        <button type="button" :disabled="weatherLoading" @click="loadWeather">
          {{ weatherLoading ? '불러오는 중…' : 'Axios로 날씨 조회' }}
        </button>
      </div>

      <p v-if="!apiKeyConfigured" class="axios-helper">
        <code>VITE_OPENWEATHER_API_KEY</code>가 없어서 화면은 로컬 Mock으로 동작합니다. 키를 <code>.env.local</code>에
        넣으면 같은 버튼으로 실시간 OpenWeatherMap 데이터를 조회합니다.
      </p>
      <p v-if="weatherError" class="axios-error">{{ weatherError }} · 안전하게 Mock 데이터로 전환했습니다.</p>

      <div v-if="weather" class="axios-weather-result">
        <article class="axios-current-weather">
          <div>
            <span class="axios-result-label">CURRENT</span>
            <h3>
              {{ weather.name }} <small>{{ weather.country }}</small>
            </h3>
            <p>{{ weather.description }}</p>
          </div>
          <img v-if="weather.icon" :src="weather.icon" :alt="weather.description" />
          <strong>{{ weather.temperature }}°C</strong>
          <dl>
            <div>
              <dt>체감</dt>
              <dd>{{ weather.feelsLike }}°C</dd>
            </div>
            <div>
              <dt>최고 / 최저</dt>
              <dd>{{ weather.high }}° / {{ weather.low }}°</dd>
            </div>
            <div>
              <dt>습도</dt>
              <dd>{{ weather.humidity }}%</dd>
            </div>
            <div>
              <dt>풍속</dt>
              <dd>{{ weather.wind }} m/s</dd>
            </div>
          </dl>
        </article>
        <div class="axios-forecast-list">
          <div v-for="item in forecast" :key="`${item.time}-${item.temperature}`" class="axios-forecast-item">
            <span>{{ item.time }}</span
            ><strong>{{ item.temperature }}°</strong><small>{{ item.description }}</small>
          </div>
        </div>
      </div>
    </section>

    <section class="practice-section axios-json-section">
      <div class="axios-section-heading">
        <div>
          <p class="section-kicker">Axios JSON Example</p>
          <h2>JSONPlaceholder GET 요청</h2>
        </div>
        <button type="button" :disabled="postsLoading" @click="loadPosts">
          {{ postsLoading ? '요청 중…' : '게시글 5개 요청' }}
        </button>
      </div>
      <p class="axios-helper">외부 API를 같은 Axios client 패턴으로 호출하는 확장 예제입니다.</p>
      <p v-if="postsError" class="axios-error">{{ postsError }}</p>
      <ol v-if="posts.length" class="axios-post-list">
        <li v-for="post in posts" :key="post.id">
          <strong>{{ post.title }}</strong
          ><span>{{ post.body }}</span>
        </li>
      </ol>
      <p v-else class="axios-empty">버튼을 누르면 JSONPlaceholder 응답이 여기에 표시됩니다.</p>
    </section>
  </div>
</template>

<style scoped>
.axios-practice-stack {
  display: grid;
  gap: 20px;
}
.axios-section-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}
.axios-section-heading h2 {
  margin-bottom: 0;
}
.axios-source-badge {
  padding: 6px 9px;
  border-radius: 999px;
  color: #9c6a32;
  background: #fff4dd;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}
.axios-source-badge.live {
  color: #287550;
  background: #eaf8f1;
}
.axios-control-row {
  margin-top: 21px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}
.axios-city-field {
  flex: 1;
  display: grid;
  gap: 6px;
}
.axios-city-field span {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
}
.axios-city-field input {
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid #d8e3e5;
  border-radius: 8px;
  color: var(--ink);
  background: #fff;
}
.axios-control-row button,
.axios-section-heading button {
  min-height: 42px;
  padding: 9px 13px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #2f9368;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}
.axios-section-heading button {
  min-height: 35px;
}
.axios-control-row button:hover,
.axios-section-heading button:hover {
  background: #24734f;
}
.axios-helper {
  margin: 13px 0 0;
  color: #71818a;
  font-size: 12px;
  line-height: 1.6;
}
.axios-error {
  margin: 12px 0 0;
  padding: 10px 12px;
  border-radius: 8px;
  color: #9a4f43;
  background: #fff0ed;
  font-size: 12px;
}
.axios-weather-result {
  margin-top: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 12px;
}
.axios-current-weather {
  padding: 17px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(140deg, #4f58d6, #7869e5);
}
.axios-result-label {
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.axios-current-weather h3 {
  margin: 7px 0 0;
  font-size: 23px;
}
.axios-current-weather h3 small {
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 11px;
}
.axios-current-weather p {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}
.axios-current-weather > strong {
  display: block;
  margin-top: 13px;
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -0.06em;
}
.axios-current-weather img {
  width: 56px;
  height: 56px;
  float: right;
  margin-top: -35px;
}
.axios-current-weather dl {
  margin: 16px 0 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
}
.axios-current-weather dl div {
  padding: 8px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.12);
}
.axios-current-weather dt {
  color: rgba(255, 255, 255, 0.58);
  font-size: 9px;
}
.axios-current-weather dd {
  margin: 3px 0 0;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}
.axios-forecast-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  align-content: start;
}
.axios-forecast-item {
  min-height: 75px;
  padding: 11px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5px;
  border: 1px solid #dde8ea;
  border-radius: 8px;
  background: #fbfdfd;
}
.axios-forecast-item span,
.axios-forecast-item small {
  color: #82919a;
  font-size: 10px;
}
.axios-forecast-item strong {
  color: #2c5162;
  font-size: 17px;
}
.axios-forecast-item small {
  grid-column: 1 / -1;
}
.axios-post-list {
  margin: 18px 0 0;
  padding-left: 21px;
  display: grid;
  gap: 8px;
}
.axios-post-list li {
  padding: 10px 12px;
  border-radius: 8px;
  background: #f5f8f8;
}
.axios-post-list strong,
.axios-post-list span {
  display: block;
}
.axios-post-list strong {
  color: #2c5162;
  font-size: 12px;
}
.axios-post-list span {
  margin-top: 4px;
  color: #71818a;
  font-size: 11px;
  line-height: 1.5;
}
.axios-empty {
  margin: 18px 0 0;
  padding: 18px;
  border-radius: 8px;
  color: #82919a;
  background: #f5f8f8;
  font-size: 12px;
  text-align: center;
}
@media (max-width: 720px) {
  .axios-weather-result {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .axios-control-row,
  .axios-section-heading {
    align-items: stretch;
    flex-direction: column;
  }
  .axios-control-row button {
    width: 100%;
  }
  .axios-section-heading button {
    align-self: flex-start;
  }
}
</style>
