<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import WeatherRouterShell from '@/components/WeatherRouterShell.vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'
import { toDisplayTemperature } from '@/utils/temperature.js'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const { apiKeyConfigured, errorMessage, isLoading } = storeToRefs(weatherStore)
const city = computed(() => weatherStore.cityById(String(route.params.cityId)))

function displayTemperature(value) {
  return toDisplayTemperature(value, configStore.unit)
}

async function synchronizeCity(cityId, routeQuery) {
  const normalizedCityId = String(cityId)
  const existingCity = weatherStore.cityById(normalizedCityId)

  if (existingCity) {
    weatherStore.selectCity(existingCity)
  }

  if (!apiKeyConfigured.value) return

  const queryFromRoute = typeof routeQuery === 'string' ? routeQuery.trim() : ''
  const apiQuery = queryFromRoute || existingCity?.apiQuery || ''

  if (!apiQuery) return

  // 상세 라우트에 다시 들어올 때도 기존 live 값을 그대로 쓰지 않고 최신 관측값을 확인합니다.
  const result = await weatherStore.loadLiveWeather(apiQuery)

  if (result.ok && result.city.id !== normalizedCityId) {
    await router.replace({
      name: 'weather-detail',
      params: { cityId: result.city.id },
      query: { q: result.city.apiQuery },
    })
  }
}

watch(
  [() => route.params.cityId, () => route.query.q],
  ([cityId, routeQuery]) => {
    void synchronizeCity(cityId, routeQuery)
  },
  { immediate: true },
)
</script>

<template>
  <WeatherRouterShell>
    <section class="weather-detail-page">
      <div class="weather-detail-page-heading">
        <div>
          <p class="weather-router-kicker">Dynamic Route · /weather/:cityId</p>
          <h1>지역별 상세 기상 관측 정보</h1>
        </div>
        <RouterLink class="weather-detail-back" to="/hands-on/weather">← 최종 대시보드</RouterLink>
      </div>

      <p v-if="isLoading" class="weather-detail-sync-status" role="status">실시간 관측값을 확인하는 중입니다.</p>
      <p v-else-if="errorMessage && city?.dataSource !== 'live'" class="weather-detail-sync-status error" role="status">
        {{ errorMessage }} Mock 데이터를 계속 표시합니다.
      </p>

      <article v-if="city" class="weather-detail-card">
        <div class="weather-detail-card-topline">
          <div>
            <img v-if="city.iconUrl" class="weather-detail-icon-image" :src="city.iconUrl" :alt="city.status" />
            <span v-else class="weather-detail-icon" aria-hidden="true">{{ city.icon }}</span>
            <p class="weather-detail-label">{{ city.region }}</p>
            <h2>
              {{ city.name }} <small>{{ city.status }}</small>
            </h2>
            <p class="weather-detail-description">{{ city.description }}</p>
          </div>
          <div class="weather-detail-temperature">
            <strong>{{ displayTemperature(city.temp) }}{{ configStore.unitSymbol }}</strong
            ><span>체감 {{ displayTemperature(city.feelsLike) }}{{ configStore.unitSymbol }}</span>
          </div>
        </div>

        <div class="weather-detail-stat-grid">
          <span
            ><small>최고 / 최저</small
            ><strong
              >{{ displayTemperature(city.high) }}{{ configStore.unitSymbol }} / {{ displayTemperature(city.low)
              }}{{ configStore.unitSymbol }}</strong
            ></span
          >
          <span
            ><small>습도</small><strong>{{ city.humidity }}</strong></span
          >
          <span
            ><small>풍속</small><strong>{{ city.wind }}</strong></span
          >
          <span
            ><small>가시거리</small><strong>{{ city.visibility }}</strong></span
          >
          <span
            ><small>기압</small><strong>{{ city.pressure }}</strong></span
          >
          <span
            ><small>대기질</small><strong>{{ city.airQuality }}</strong></span
          >
          <span
            ><small>자외선</small><strong>{{ city.uvIndex }}</strong></span
          >
          <span
            ><small>일출 / 일몰</small><strong>{{ city.sunrise }} / {{ city.sunset }}</strong></span
          >
        </div>

        <div class="weather-detail-forecast">
          <div class="weather-detail-section-heading">
            <h3>시간대별 예보</h3>
            <span>{{ city.dataSource === 'live' ? 'OpenWeather Live' : 'Mock Data' }}</span>
          </div>
          <div class="weather-detail-forecast-list">
            <div v-for="item in city.forecast" :key="`${city.id}-${item.day}`" class="weather-detail-forecast-item">
              <span>{{ item.day }}</span>
              <img v-if="item.iconUrl" :src="item.iconUrl" :alt="item.status" />
              <strong v-else aria-hidden="true">{{ item.icon }}</strong>
              <b>{{ displayTemperature(item.temp) }}{{ configStore.unitSymbol }}</b>
              <small>강수확률 {{ item.rain }}%</small>
            </div>
          </div>
        </div>
      </article>

      <article v-else-if="!isLoading" class="weather-detail-not-found">
        <span aria-hidden="true">🔎</span>
        <h2>도시 정보를 찾을 수 없습니다.</h2>
        <p>
          <code>{{ route.params.cityId }}</code
          >에 해당하는 저장된 도시 정보가 없습니다.
        </p>
        <RouterLink class="weather-detail-primary" to="/hands-on/weather">날씨 메인으로 이동</RouterLink>
      </article>
    </section>
  </WeatherRouterShell>
</template>

<style scoped>
.weather-detail-page {
  max-width: 920px;
  margin: 0 auto;
}

.weather-router-kicker {
  margin: 0 0 7px;
  color: #2f9368;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.weather-detail-page-heading {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.weather-detail-page-heading h1 {
  margin: 0;
  color: #263944;
  font-size: clamp(24px, 4vw, 35px);
  letter-spacing: -0.045em;
}

.weather-detail-sync-status {
  margin: 0 0 12px;
  padding: 9px 11px;
  border: 1px solid #d5eadf;
  border-radius: 9px;
  color: #287550;
  background: #f2fbf6;
  font-size: 11px;
}

.weather-detail-sync-status.error {
  border-color: #f0d6d1;
  color: #9a4f43;
  background: #fff7f5;
}

.weather-detail-back,
.weather-detail-primary {
  min-height: 34px;
  padding: 7px 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #287550;
  background: #eaf8f1;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

.weather-detail-card,
.weather-detail-not-found {
  padding: 25px;
  border: 1px solid #e2e8ed;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 15px 30px rgba(36, 55, 66, 0.07);
}

.weather-detail-card-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
}

.weather-detail-icon {
  display: block;
  font-size: 40px;
}

.weather-detail-icon-image {
  width: 68px;
  height: 68px;
  display: block;
  object-fit: contain;
}

.weather-detail-label {
  margin: 14px 0 5px;
  color: #71818a;
  font-size: 11px;
}

.weather-detail-card h2 {
  margin: 0;
  color: #263944;
  font-size: 28px;
  letter-spacing: -0.04em;
}

.weather-detail-card h2 small {
  margin-left: 6px;
  padding: 5px 7px;
  border-radius: 999px;
  color: #287550;
  background: #eaf8f1;
  font-size: 11px;
  font-weight: 800;
  vertical-align: middle;
}

.weather-detail-description {
  max-width: 56ch;
  margin: 9px 0 0;
  color: #63747d;
  font-size: 13px;
  line-height: 1.65;
}

.weather-detail-temperature {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 5px;
}

.weather-detail-temperature strong {
  color: #4f56d2;
  font-size: 58px;
  font-weight: 500;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.weather-detail-temperature span {
  color: #8b96a0;
  font-size: 11px;
}

.weather-detail-stat-grid {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.weather-detail-stat-grid span {
  min-width: 0;
  padding: 11px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 9px;
  background: #f6f8fa;
}

.weather-detail-stat-grid small {
  color: #82919a;
  font-size: 10px;
}

.weather-detail-stat-grid strong {
  overflow: hidden;
  color: #344e5c;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.weather-detail-forecast {
  margin-top: 23px;
  padding-top: 19px;
  border-top: 1px solid #e8edf0;
}

.weather-detail-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.weather-detail-section-heading h3 {
  margin: 0;
  color: #2c5162;
  font-size: 16px;
}

.weather-detail-section-heading span {
  color: #94a1a9;
  font-size: 10px;
}

.weather-detail-forecast-list {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.weather-detail-forecast-item {
  padding: 12px 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 6px;
  border: 1px solid #e2e9ed;
  border-radius: 9px;
  background: #fbfdfd;
}

.weather-detail-forecast-item > span,
.weather-detail-forecast-item small {
  color: #82919a;
  font-size: 10px;
}

.weather-detail-forecast-item strong {
  grid-row: span 2;
  font-size: 23px;
}

.weather-detail-forecast-item img {
  width: 38px;
  height: 38px;
  grid-row: span 2;
  object-fit: contain;
}

.weather-detail-forecast-item b {
  color: #344e5c;
  font-size: 14px;
}

.weather-detail-not-found {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.weather-detail-not-found > span {
  font-size: 42px;
}

.weather-detail-not-found h2 {
  margin: 0;
  color: #344e5c;
  font-size: 22px;
}

.weather-detail-not-found p {
  margin: 0;
  color: #82919a;
  font-size: 12px;
}

.weather-detail-primary {
  margin-top: 8px;
  color: #fff;
  background: #2f9368;
}

@media (max-width: 640px) {
  .weather-detail-page-heading,
  .weather-detail-card-topline {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-detail-temperature {
    align-items: flex-start;
    flex-direction: row;
  }

  .weather-detail-stat-grid,
  .weather-detail-forecast-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .weather-detail-card,
  .weather-detail-not-found {
    padding: 18px;
  }

  .weather-detail-stat-grid,
  .weather-detail-forecast-list {
    grid-template-columns: 1fr;
  }
}
</style>
