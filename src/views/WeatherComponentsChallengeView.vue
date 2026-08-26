<script setup>
import WeatherParent from '@/components/practices/hands-on/WeatherParent.vue'

const componentMap = [
  {
    file: 'WeatherParent.vue',
    role: '상태와 화면 흐름의 중심',
    detail: 'weatherList, 검색 결과, 선택 도시, 즐겨찾기와 상세보기 상태를 유지합니다.',
    api: 'ref() · computed() · 부모 이벤트 핸들러',
  },
  {
    file: 'BaseDashboardCard.vue',
    role: '공통 카드 레이아웃',
    detail: '패널 제목과 메타 영역을 공통화하고 default/meta slot으로 화면을 주입받습니다.',
    api: 'Props · default slot · named slot',
  },
  {
    file: 'SearchBar.vue',
    role: '도시 검색 입력',
    detail: '부모의 query를 Props로 표시하고 입력이 바뀌면 update-query 이벤트를 발생시킵니다.',
    api: 'defineProps() · defineEmits()',
  },
  {
    file: 'WeatherCard.vue',
    role: '날씨 카드와 도시 목록',
    detail: '도시 객체를 Props로 받아 선택과 상세보기, 즐겨찾기 이벤트를 부모에 전달합니다.',
    api: 'city Props · select-card · click-detail',
  },
]
</script>

<template>
  <div class="page-shell weather-component-challenge-page">
    <section class="page-intro">
      <p class="eyebrow">PDF 178 · Hands on · Code Challenge</p>
      <h1>Weather Component</h1>
      <p>
        기존 Weather Dashboard의 기능은 유지하면서 부모·공통 카드·검색·날씨 카드를 4개의 Vue
        Component로 분리했습니다. 각 컴포넌트의 Props, Emits, Slot 연결을 확인해 보세요.
      </p>
    </section>

    <section class="practice-section weather-component-overview">
      <div class="weather-challenge-heading">
        <div>
          <p class="section-kicker">과제 요구사항</p>
          <h2>기능 변경 없이 4개 Component로 분리</h2>
        </div>
        <span class="weather-component-count">4 files</span>
      </div>

      <div class="weather-component-map">
        <article v-for="component in componentMap" :key="component.file" class="weather-component-map-card">
          <span class="weather-component-file">{{ component.file }}</span>
          <h3>{{ component.role }}</h3>
          <p>{{ component.detail }}</p>
          <code>{{ component.api }}</code>
        </article>
      </div>
    </section>

    <section class="practice-section weather-component-flow">
      <p class="section-kicker">Component Communication</p>
      <h2>Props · Emits · Slot 흐름</h2>
      <div class="weather-flow-grid">
        <div class="weather-flow-step">
          <span>01</span>
          <strong>WeatherParent → SearchBar</strong>
          <code>:query="cityQuery"</code>
        </div>
        <div class="weather-flow-arrow" aria-hidden="true">→</div>
        <div class="weather-flow-step">
          <span>02</span>
          <strong>SearchBar → WeatherParent</strong>
          <code>@update-query="handleQueryUpdate"</code>
        </div>
        <div class="weather-flow-arrow" aria-hidden="true">→</div>
        <div class="weather-flow-step">
          <span>03</span>
          <strong>WeatherCard → WeatherParent</strong>
          <code>@select-card · @click-detail</code>
        </div>
      </div>
      <pre class="code-sample" v-pre><code>&lt;BaseDashboardCard&gt;
  &lt;SearchBar :query="cityQuery" @update-query="handleQueryUpdate" /&gt;
  &lt;WeatherCard :city="city" @select-card="selectCity" /&gt;
&lt;/BaseDashboardCard&gt;</code></pre>
    </section>

    <section class="weather-component-demo" aria-labelledby="weather-component-demo-title">
      <div class="weather-component-demo-heading">
        <div>
          <p class="section-kicker">Live Component Preview</p>
          <h2 id="weather-component-demo-title">분리된 컴포넌트 실행 화면</h2>
        </div>
        <span>기존 기능 그대로</span>
      </div>
      <WeatherParent />
    </section>

    <RouterLink class="next-link secondary-link" to="/hands-on/weather">서비스형 Weather Dashboard로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/components/props">Props &amp; Emits로 이동 →</RouterLink>
  </div>
</template>

<style scoped>
.weather-component-challenge-page {
  width: min(1120px, 100%);
}

.weather-component-overview,
.weather-component-flow {
  border-color: #d6e3ea;
}

.weather-challenge-heading,
.weather-component-demo-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.weather-challenge-heading h2,
.weather-component-demo-heading h2 {
  margin-bottom: 0;
}

.weather-component-count {
  min-height: 29px;
  padding: 6px 10px;
  border-radius: 999px;
  color: #287550;
  background: #e4f6ed;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.weather-component-map {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 11px;
}

.weather-component-map-card {
  min-width: 0;
  min-height: 190px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dce7eb;
  border-radius: 10px;
  background: #fbfdfd;
}

.weather-component-file {
  width: fit-content;
  padding: 4px 7px;
  border-radius: 5px;
  color: #287550;
  background: #eaf8f1;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  font-weight: 800;
}

.weather-component-map-card h3 {
  margin: 17px 0 7px;
  color: #2c5162;
  font-size: 16px;
}

.weather-component-map-card p {
  margin: 0;
  color: #63747d;
  font-size: 13px;
  line-height: 1.6;
}

.weather-component-map-card code {
  margin-top: auto;
  padding: 8px;
  color: #526b76;
  background: #f0f5f6;
  font-size: 10px;
  line-height: 1.5;
}

.weather-flow-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 9px;
}

.weather-flow-step {
  min-width: 0;
  padding: 14px;
  display: grid;
  gap: 7px;
  border: 1px solid #dce7eb;
  border-radius: 9px;
  background: #fff;
}

.weather-flow-step > span {
  color: #42a579;
  font-size: 11px;
  font-weight: 800;
}

.weather-flow-step strong {
  color: #2c5162;
  font-size: 13px;
}

.weather-flow-step code {
  overflow-x: auto;
  color: #287550;
  background: #edf8f2;
  font-size: 10px;
  white-space: nowrap;
}

.weather-flow-arrow {
  color: #8cb9a4;
  font-size: 22px;
  font-weight: 800;
}

.weather-component-demo {
  margin-top: 20px;
}

.weather-component-demo-heading {
  margin-bottom: 14px;
}

.weather-component-demo-heading h2 {
  color: #2c5162;
  font-size: 23px;
}

.weather-component-demo-heading > span {
  padding-top: 8px;
  color: #63747d;
  font-size: 12px;
  font-weight: 700;
}

.weather-component-demo :deep(.weather-dashboard) {
  border-radius: 17px;
}

@media (max-width: 820px) {
  .weather-component-map {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .weather-flow-grid {
    grid-template-columns: 1fr;
  }

  .weather-flow-arrow {
    transform: rotate(90deg);
    justify-self: center;
  }
}

@media (max-width: 520px) {
  .weather-component-map {
    grid-template-columns: 1fr;
  }

  .weather-challenge-heading,
  .weather-component-demo-heading {
    flex-direction: column;
  }
}
</style>
