<script setup>
import { useRouter } from 'vue-router'
import WeatherRouterShell from '@/components/WeatherRouterShell.vue'
import WeatherParent from '@/components/practices/hands-on/WeatherParent.vue'

const router = useRouter()

function openDetail(city) {
  router.push({ name: 'weather-detail', params: { cityId: city.id } })
}
</script>

<template>
  <WeatherRouterShell>
    <section class="weather-router-intro">
      <div>
        <p class="weather-router-kicker">Hands on · Weather Router</p>
        <h1>날씨 대시보드</h1>
        <p>도시를 검색하고 상세보기 버튼을 눌러 동적 라우트로 이동해 보세요.</p>
      </div>
      <span class="weather-router-route-badge">/weather</span>
    </section>

    <WeatherParent detail-mode="route" @click-detail="openDetail" />
  </WeatherRouterShell>
</template>

<style scoped>
.weather-router-intro {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.weather-router-kicker {
  margin: 0 0 7px;
  color: #2f9368;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.weather-router-intro h1 {
  margin: 0;
  color: #263944;
  font-size: clamp(28px, 4vw, 38px);
  letter-spacing: -0.045em;
}

.weather-router-intro p:last-child {
  margin: 7px 0 0;
  color: #71818a;
  font-size: 13px;
}

.weather-router-route-badge {
  padding: 6px 9px;
  border-radius: 7px;
  color: #287550;
  background: #eaf8f1;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

@media (max-width: 560px) {
  .weather-router-intro {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
