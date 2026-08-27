<script setup>
import AxiosPractice from '@/components/practices/axios/AxiosPractice.vue'
</script>

<template>
  <div class="page-shell axios-page">
    <section class="page-intro">
      <p class="eyebrow">PDF 214~230 · Axios Code Challenge</p>
      <h1>Axios로 연결하는 외부 데이터</h1>
      <p>
        Axios 설치·client 설정·GET 요청·JSON 응답 변환 흐름을 날씨 서비스에 적용했습니다. OpenWeatherMap 키가 있으면
        실시간 데이터를, 키가 없으면 동일한 화면에서 안전한 Mock fallback을 확인합니다.
      </p>
    </section>

    <section class="practice-section axios-checklist">
      <p class="section-kicker">과제 범위</p>
      <h2>Code Challenge · Weather Axios</h2>
      <div class="axios-check-grid">
        <article>
          <strong>01 · Axios 설치</strong>
          <p><code>axios.create()</code>로 API별 기본 URL과 timeout을 캡슐화했습니다.</p>
        </article>
        <article>
          <strong>02 · Weather API</strong>
          <p>현재 날씨와 5일 예보 endpoint를 병렬 요청하고 필요한 값만 화면 모델로 변환합니다.</p>
        </article>
        <article>
          <strong>03 · JSON API</strong>
          <p>JSONPlaceholder를 호출해 외부 API 확장 패턴을 함께 확인합니다.</p>
        </article>
      </div>
    </section>

    <AxiosPractice />

    <RouterLink class="next-link secondary-link" to="/ui-library">UI Library Weather로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/pinia">Pinia Store로 이동 →</RouterLink>
  </div>
</template>

<style scoped>
.axios-page {
  width: min(980px, 100%);
}
.axios-checklist {
  margin-bottom: 20px;
}
.axios-check-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.axios-check-grid article {
  padding: 14px;
  border: 1px solid #dce7eb;
  border-radius: 9px;
  background: #fbfdfd;
}
.axios-check-grid strong {
  color: #2c5162;
  font-size: 13px;
}
.axios-check-grid p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
@media (max-width: 720px) {
  .axios-check-grid {
    grid-template-columns: 1fr;
  }
}
</style>
