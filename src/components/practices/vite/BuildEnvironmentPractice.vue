<script setup>
import { computed } from 'vue'

const mode = import.meta.env.MODE
const apiUrl = import.meta.env.VITE_API_URL || '미설정 (기본 개발 환경)'
const openWeatherConfigured = computed(() => Boolean(import.meta.env.VITE_OPENWEATHER_API_KEY))
const buildLabel = computed(() => (mode === 'production' ? 'Production build' : `${mode} build`))
</script>

<template>
  <section class="practice-section build-environment-section">
    <div class="build-section-heading">
      <div>
        <p class="section-kicker">Vite · env · build</p>
        <h2>현재 실행 환경 확인</h2>
      </div>
      <span class="build-mode-badge">{{ buildLabel }}</span>
    </div>

    <div class="build-value-grid">
      <article>
        <span>import.meta.env.MODE</span><strong>{{ mode }}</strong>
      </article>
      <article>
        <span>VITE_API_URL</span><strong>{{ apiUrl }}</strong>
      </article>
      <article>
        <span>OpenWeather key</span><strong>{{ openWeatherConfigured ? '설정됨' : '미설정 · Mock 사용' }}</strong>
      </article>
    </div>

    <pre class="code-sample" v-pre><code>// ESLint: strict equality + console 허용
const isAdult = userAge === 20
console.log(import.meta.env.VITE_API_URL)

// Vite mode별 실행
npm run build:staging
npm run build:production</code></pre>
  </section>
</template>

<style scoped>
.build-section-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}
.build-section-heading h2 {
  margin-bottom: 0;
}
.build-mode-badge {
  padding: 6px 9px;
  border-radius: 999px;
  color: #287550;
  background: #eaf8f1;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}
.build-value-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.build-value-grid article {
  min-width: 0;
  padding: 14px;
  border-radius: 9px;
  background: #f5f8f8;
}
.build-value-grid span {
  display: block;
  color: #82919a;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 10px;
}
.build-value-grid strong {
  display: block;
  overflow: hidden;
  margin-top: 7px;
  color: #2c5162;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.build-environment-section .code-sample {
  margin-top: 18px;
}
@media (max-width: 700px) {
  .build-value-grid {
    grid-template-columns: 1fr;
  }
  .build-section-heading {
    flex-direction: column;
  }
}
</style>
