<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import WeatherRouterShell from '@/components/WeatherRouterShell.vue'
import weatherRouteData from '@/data/weatherRouteData.js'

const route = useRoute()
const city = ref(null)

function loadCity(cityId) {
  city.value = weatherRouteData.find((item) => item.id === cityId) ?? null
}

onMounted(() => {
  loadCity(route.params.cityId)
})

watch(() => route.params.cityId, loadCity)
</script>

<template>
  <WeatherRouterShell>
    <section class="weather-detail-page">
      <div class="weather-detail-page-heading">
        <div>
          <p class="weather-router-kicker">Dynamic Route · /weather/:cityId</p>
          <h1>지역별 상세 기상 관측 정보</h1>
        </div>
        <RouterLink class="weather-detail-back" to="/weather">← 메인 대시보드</RouterLink>
      </div>

      <article v-if="city" class="weather-detail-card">
        <div class="weather-detail-card-topline">
          <div>
            <span class="weather-detail-icon" aria-hidden="true">{{ city.icon }}</span>
            <p class="weather-detail-label">{{ city.region }}</p>
            <h2>{{ city.name }} <small>{{ city.status }}</small></h2>
            <p class="weather-detail-description">{{ city.description }}</p>
          </div>
          <div class="weather-detail-temperature"><strong>{{ city.temp }}°</strong><span>체감 {{ city.feelsLike }}°</span></div>
        </div>

        <div class="weather-detail-stat-grid">
          <span><small>최고 / 최저</small><strong>{{ city.high }}° / {{ city.low }}°</strong></span>
          <span><small>습도</small><strong>{{ city.humidity }}</strong></span>
          <span><small>풍속</small><strong>{{ city.wind }}</strong></span>
          <span><small>가시거리</small><strong>{{ city.visibility }}</strong></span>
          <span><small>기압</small><strong>{{ city.pressure }}</strong></span>
          <span><small>대기질</small><strong>{{ city.airQuality }}</strong></span>
          <span><small>자외선</small><strong>{{ city.uvIndex }}</strong></span>
          <span><small>일출 / 일몰</small><strong>{{ city.sunrise }} / {{ city.sunset }}</strong></span>
        </div>

        <div class="weather-detail-forecast">
          <div class="weather-detail-section-heading"><h3>시간대별 예보</h3><span>Mock Data</span></div>
          <div class="weather-detail-forecast-list">
            <div v-for="item in city.forecast" :key="`${city.id}-${item.time}`" class="weather-detail-forecast-item">
              <span>{{ item.time }}</span>
              <strong aria-hidden="true">{{ item.icon }}</strong>
              <b>{{ item.temp }}°</b>
              <small>강수확률 {{ item.rain }}</small>
            </div>
          </div>
        </div>
      </article>

      <article v-else class="weather-detail-not-found">
        <span aria-hidden="true">🔎</span>
        <h2>도시 정보를 찾을 수 없습니다.</h2>
        <p><code>{{ route.params.cityId }}</code>에 해당하는 Mock Data가 없습니다.</p>
        <RouterLink class="weather-detail-primary" to="/weather">날씨 메인으로 이동</RouterLink>
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
