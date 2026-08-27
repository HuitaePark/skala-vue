<script setup>
import { useRouter } from 'vue-router'
import WeatherDashboard from '@/components/practices/hands-on/WeatherParent.vue'

const router = useRouter()

const weatherJourney = [
  { pages: '116', title: 'Mockup', detail: 'v-for · v-if · 이벤트' },
  { pages: '145', title: 'Composition', detail: 'computed · watch' },
  { pages: '178', title: 'Components', detail: 'Props · Emits · Slot' },
  { pages: '196', title: 'Router', detail: '동적 상세 경로' },
  { pages: '212', title: 'Pinia', detail: '전역 온도 단위' },
  { pages: '230', title: 'Axios', detail: '실시간 날씨 API' },
  { pages: '249', title: 'UI Library', detail: '상태 알림 · 피드백' },
  { pages: '274', title: 'Deploy', detail: '환경변수 · Build' },
]

function openDetail(city) {
  router.push({
    name: 'weather-detail',
    params: { cityId: city.id },
    query: { q: city.apiQuery ?? city.name },
  })
}
</script>

<template>
  <div class="weather-final-page">
    <section class="weather-journey" aria-labelledby="weather-journey-title">
      <div class="weather-journey-intro">
        <div>
          <h1 id="weather-journey-title">Weather Hands-on, 최종 통합</h1>
          <p>PDF의 첫 Mockup부터 API·배포까지, 단계마다 더한 기능이 아래 하나의 서비스로 완성됐습니다.</p>
        </div>
        <span>8 stages · Final build</span>
      </div>

      <ol class="weather-journey-list" aria-label="Weather Hands-on 발전 단계">
        <li v-for="stage in weatherJourney" :key="stage.pages">
          <span>{{ stage.pages }}p</span>
          <strong>{{ stage.title }}</strong>
          <small>{{ stage.detail }}</small>
        </li>
      </ol>
    </section>

    <div class="weather-page">
      <WeatherDashboard detail-mode="route" @click-detail="openDetail" />
    </div>
  </div>
</template>

<style scoped>
.weather-final-page {
  width: 100%;
  min-width: 0;
  background: #eef0f7;
}

.weather-journey {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 30px 0 26px;
}

.weather-journey-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.weather-journey-intro h1 {
  margin: 0;
  color: #242941;
  font-size: clamp(25px, 4vw, 38px);
  letter-spacing: -0.04em;
}

.weather-journey-intro p {
  max-width: 68ch;
  margin: 9px 0 0;
  color: #6e768d;
  font-size: 13px;
  line-height: 1.65;
}

.weather-journey-intro > span {
  padding: 7px 10px;
  border: 1px solid #d5d9e7;
  border-radius: 9px;
  color: #596078;
  background: #fff;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.weather-journey-list {
  margin: 24px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0;
  list-style: none;
}

.weather-journey-list li {
  min-width: 0;
  position: relative;
  padding: 17px 12px 0 0;
  display: grid;
  gap: 3px;
  border-top: 1px solid #cfd4e3;
}

.weather-journey-list li::before {
  width: 9px;
  height: 9px;
  position: absolute;
  top: -5px;
  left: 0;
  border: 2px solid #eef0f7;
  border-radius: 50%;
  background: #6970e8;
  content: '';
}

.weather-journey-list li:last-child::before {
  background: #42b883;
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.13);
}

.weather-journey-list li > span {
  color: #858ca1;
  font-size: 9px;
  font-weight: 800;
}

.weather-journey-list strong {
  overflow: hidden;
  color: #343a54;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.weather-journey-list small {
  overflow: hidden;
  color: #8a91a5;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 820px) {
  .weather-journey-list {
    grid-template-columns: repeat(8, 142px);
    overflow-x: auto;
    padding: 4px 3px 8px;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
  }

  .weather-journey-list::-webkit-scrollbar {
    display: none;
  }

  .weather-journey-list li {
    scroll-snap-align: start;
  }
}

@media (max-width: 560px) {
  .weather-journey {
    width: min(100% - 28px, 1180px);
    padding-top: 22px;
  }

  .weather-journey-intro {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
