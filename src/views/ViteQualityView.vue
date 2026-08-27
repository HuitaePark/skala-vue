<script setup>
import BuildEnvironmentPractice from '@/components/practices/vite/BuildEnvironmentPractice.vue'
</script>

<template>
  <div class="page-shell vite-quality-page">
    <section class="page-intro">
      <p class="eyebrow">PDF 250~274 · Vite Build &amp; Deployment</p>
      <h1>검사하고 빌드해서 배포하기</h1>
      <p>
        ESLint strict equality 규칙, Prettier 포맷, Vite mode별 환경변수와 정적 build 결과를 한 화면에 정리했습니다. API
        key는 저장소에 넣지 않고 <code>.env.local</code>에서만 읽도록 구성했습니다.
      </p>
    </section>

    <BuildEnvironmentPractice />

    <section class="practice-section quality-check-section">
      <p class="section-kicker">Code Challenge · ESLint &amp; Prettier</p>
      <h2>제출 전 품질 체크</h2>
      <div class="quality-check-grid">
        <article>
          <span class="quality-number">01</span>
          <strong>ESLint</strong>
          <p>
            <code>npm run lint</code>로 strict equality와 Vue 규칙을 검사합니다. console.log는 학습 예제를 위해
            허용했습니다.
          </p>
        </article>
        <article>
          <span class="quality-number">02</span>
          <strong>Prettier</strong>
          <p><code>npm run format</code>으로 Vue·JavaScript·CSS를 일관된 스타일로 포맷합니다.</p>
        </article>
        <article>
          <span class="quality-number">03</span>
          <strong>Vite Build</strong>
          <p><code>npm run build</code> 실행 결과인 <code>dist/</code>를 정적 서버에 올립니다.</p>
        </article>
      </div>
    </section>

    <section class="practice-section deployment-section">
      <p class="section-kicker">Hands-on · Weather Deployment</p>
      <h2>배포 순서</h2>
      <ol class="deployment-list">
        <li><code>cp .env.example .env.local</code> 후 개인 OpenWeatherMap 키를 로컬 환경변수에 입력합니다.</li>
        <li>
          <code>npm run lint &amp;&amp; npm run format:check &amp;&amp; npm run build</code>로 제출 전 검사를
          실행합니다.
        </li>
        <li>생성된 <code>dist/</code> 폴더를 Nginx, S3, Netlify 등 정적 호스팅 서버에 업로드합니다.</li>
        <li>배포 URL에서 Weather Router·Axios·UI Library 화면과 새로 고침 라우팅을 확인합니다.</li>
      </ol>
    </section>

    <RouterLink class="next-link secondary-link" to="/ui-library">UI Library 실습으로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/weather">Weather Router 배포 대상 확인 →</RouterLink>
  </div>
</template>

<style scoped>
.vite-quality-page {
  width: min(980px, 100%);
}
.quality-check-section,
.deployment-section {
  margin-top: 20px;
}
.quality-check-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.quality-check-grid article {
  min-height: 160px;
  padding: 15px;
  border: 1px solid #dce7eb;
  border-radius: 9px;
  background: #fbfdfd;
}
.quality-number {
  display: inline-grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border-radius: 7px;
  color: #287550;
  background: #eaf8f1;
  font-size: 10px;
  font-weight: 800;
}
.quality-check-grid strong {
  display: block;
  margin-top: 13px;
  color: #2c5162;
  font-size: 15px;
}
.quality-check-grid p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.65;
}
.deployment-list {
  margin: 0;
  padding-left: 21px;
  display: grid;
  gap: 11px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.65;
}
.deployment-list li::marker {
  color: #42a579;
  font-weight: 800;
}
@media (max-width: 700px) {
  .quality-check-grid {
    grid-template-columns: 1fr;
  }
}
</style>
