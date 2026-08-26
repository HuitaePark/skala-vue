<script setup>
import WeatherRouterShell from '@/components/WeatherRouterShell.vue'
</script>

<template>
  <WeatherRouterShell>
    <section class="weather-about-page">
      <p class="weather-router-kicker">Weather Router · About</p>
      <h1>서비스 소개</h1>
      <p class="weather-about-lead">SKALA-VUE의 Weather Router 핸즈온 화면입니다.</p>

      <article class="weather-about-card">
        <h2>라우팅으로 연결된 날씨 서비스</h2>
        <ul>
          <li>Vue 3 Composition API 기반의 Mock Weather Dashboard</li>
          <li>도시 상세보기 버튼의 Programmatic Navigation</li>
          <li><code>/weather/:cityId</code> 동적 경로와 Mock Data 매칭</li>
          <li>Lazy Loading과 Catch-all Route를 포함한 Vue Router 구성</li>
        </ul>
        <RouterLink class="weather-about-primary" to="/weather">대시보드로 돌아가기</RouterLink>
      </article>
    </section>
  </WeatherRouterShell>
</template>

<style scoped>
.weather-about-page {
  max-width: 760px;
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

.weather-about-page h1 {
  margin: 0;
  color: #263944;
  font-size: clamp(29px, 4vw, 40px);
  letter-spacing: -0.045em;
}

.weather-about-lead {
  margin: 8px 0 0;
  color: #71818a;
  font-size: 13px;
}

.weather-about-card {
  margin-top: 22px;
  padding: 25px;
  border: 1px solid #e2e8ed;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 15px 30px rgba(36, 55, 66, 0.07);
}

.weather-about-card h2 {
  margin: 0;
  color: #2c5162;
  font-size: 20px;
}

.weather-about-card ul {
  margin: 17px 0 22px;
  padding-left: 20px;
  color: #63747d;
  font-size: 13px;
  line-height: 1.9;
}

.weather-about-primary {
  min-height: 38px;
  padding: 8px 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
  background: #2f9368;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.weather-about-primary:hover {
  background: #24734f;
}
</style>
