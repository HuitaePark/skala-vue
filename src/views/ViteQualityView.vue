<script setup>
import { computed } from 'vue'
import BuildEnvironmentPractice from '@/components/practices/vite/BuildEnvironmentPractice.vue'

const props = defineProps({
  challenge: {
    type: String,
    default: 'all',
  },
})

const challengeMeta = {
  all: {
    eyebrow: 'PDF 250~274 · Vite Build & Deployment',
    title: 'Vite 품질·빌드·배포 전체 보기',
    description:
      'ESLint, Prettier, Vite 환경변수, build와 정적 배포 흐름을 한 번에 확인합니다. 아래 메뉴에서 PDF Code Challenge를 각각 열어 볼 수 있습니다.',
  },
  eslint: {
    eyebrow: 'PDF 270 · Code Challenge',
    title: 'Code Challenge · Vite ESLint',
    description:
      'ESLint의 strict equality 규칙과 Vue 템플릿 검사를 확인하고 제출 전 lint 명령으로 코드 품질을 점검합니다.',
  },
  prettier: {
    eyebrow: 'PDF 271 · Code Challenge',
    title: 'Code Challenge · Vite Prettier',
    description: 'Prettier가 Vue·JavaScript·CSS의 들여쓰기와 따옴표 스타일을 일관되게 맞추는 과정을 확인합니다.',
  },
  env: {
    eyebrow: 'PDF 272 · Code Challenge',
    title: 'Code Challenge · Vite 환경변수',
    description:
      'Vite mode와 VITE_ 접두사 환경변수를 실행 화면에서 확인하고, 로컬 API key를 안전하게 분리하는 흐름을 점검합니다.',
  },
  build: {
    eyebrow: 'PDF 273 · Code Challenge',
    title: 'Code Challenge · Vite Build',
    description: 'vite build가 소스 모듈을 dist 정적 자산으로 묶는 과정을 확인하고, 배포 전 검사 명령을 정리합니다.',
  },
}

const currentMeta = computed(() => challengeMeta[props.challenge] ?? challengeMeta.all)
const isOverview = computed(() => props.challenge === 'all')
const isEslint = computed(() => props.challenge === 'eslint')
const isPrettier = computed(() => props.challenge === 'prettier')
const isEnv = computed(() => props.challenge === 'env')
const isBuild = computed(() => props.challenge === 'build')
</script>

<template>
  <div class="page-shell vite-quality-page">
    <section class="page-intro">
      <p class="eyebrow">{{ currentMeta.eyebrow }}</p>
      <h1>{{ currentMeta.title }}</h1>
      <p>{{ currentMeta.description }}</p>
    </section>

    <nav class="challenge-tabs" aria-label="Vite Code Challenge 목록">
      <RouterLink class="challenge-tab" :class="{ 'is-active': props.challenge === 'eslint' }" to="/vite">
        <span>270</span>
        <strong>ESLint</strong>
      </RouterLink>
      <RouterLink class="challenge-tab" :class="{ 'is-active': props.challenge === 'prettier' }" to="/vite/prettier">
        <span>271</span>
        <strong>Prettier</strong>
      </RouterLink>
      <RouterLink class="challenge-tab" :class="{ 'is-active': props.challenge === 'env' }" to="/vite/env">
        <span>272</span>
        <strong>환경변수</strong>
      </RouterLink>
      <RouterLink class="challenge-tab" :class="{ 'is-active': props.challenge === 'build' }" to="/vite/build">
        <span>273</span>
        <strong>Build</strong>
      </RouterLink>
      <RouterLink class="challenge-tab" :class="{ 'is-active': isOverview }" to="/vite/overview">
        <span>ALL</span>
        <strong>전체 보기</strong>
      </RouterLink>
    </nav>

    <template v-if="isOverview || isEnv">
      <BuildEnvironmentPractice />
    </template>

    <section v-if="isOverview" class="practice-section quality-check-section">
      <p class="section-kicker">270~273쪽 · Code Challenge</p>
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

    <section v-if="isEslint" class="practice-section vite-demo-section">
      <p class="section-kicker">270쪽 · ESLint 규칙</p>
      <h2>잘못된 비교를 제출 전에 발견하기</h2>
      <p>
        ESLint는 <code>eqeqeq: always</code> 규칙으로 느슨한 비교를 막고, <code>eslint-plugin-vue</code>로 SFC 템플릿
        규칙도 함께 검사합니다.
      </p>
      <pre class="code-sample" v-pre><code>// eslint.config.js
rules: {
  eqeqeq: ['error', 'always'],
  'vue/multi-word-component-names': 'off'
}

npm run lint</code></pre>
      <div class="vite-command-card">
        <strong>제출 체크</strong><span>오류가 0개인지 확인한 뒤 다음 과제로 이동합니다.</span>
      </div>
    </section>

    <section v-if="isPrettier" class="practice-section vite-demo-section">
      <p class="section-kicker">271쪽 · Prettier 포맷</p>
      <h2>팀 전체의 코드 모양 맞추기</h2>
      <p>저장 시 자동 포맷하거나 명령으로 전체 소스를 정리해 리뷰에 집중할 수 있습니다.</p>
      <div class="prettier-compare">
        <article>
          <span>BEFORE</span>
          <pre class="code-sample" v-pre><code>const region = "Suwon"
const weather={temp:23,condition:"맑음"}</code></pre>
        </article>
        <article>
          <span>AFTER</span>
          <pre class="code-sample" v-pre><code>const region = 'Suwon'
const weather = { temp: 23, condition: '맑음' }</code></pre>
        </article>
      </div>
      <div class="vite-command-card">
        <strong>npm run format</strong><span>포맷을 적용하고 npm run format:check로 결과를 확인합니다.</span>
      </div>
    </section>

    <section v-if="isEnv" class="practice-section vite-demo-section">
      <p class="section-kicker">272쪽 · Vite mode</p>
      <h2>환경별 값을 mode로 주입하기</h2>
      <p>
        <code>.env.local</code>은 로컬 API key를, <code>.env.staging</code>과 <code>.env.production</code>은 배포 환경
        값을 담당합니다. 브라우저에서 읽을 값은 <code>VITE_</code> 접두사가 필요합니다.
      </p>
      <pre class="code-sample" v-pre><code># .env.local (Git에 커밋하지 않음)
VITE_OPENWEATHER_API_KEY=발급받은_키

# mode별 실행
npm run build:staging
npm run build:production</code></pre>
    </section>

    <section v-if="isBuild" class="practice-section vite-demo-section">
      <p class="section-kicker">273쪽 · Vite Build</p>
      <h2>소스를 정적 배포 자산으로 묶기</h2>
      <p>
        Build가 끝나면 브라우저가 바로 제공할 수 있는 HTML, JavaScript, CSS와 해시 파일이 <code>dist/</code>에
        생성됩니다. 생성된 폴더는 Nginx, S3, Netlify, GitHub Pages 등에 업로드할 수 있습니다.
      </p>
      <pre class="code-sample" v-pre><code>npm run lint
npm run format:check
npm run build

# 결과
dist/
  index.html
  assets/</code></pre>
      <div class="vite-build-grid">
        <article><strong>압축</strong><span>모듈을 최적화하고 필요한 코드만 묶습니다.</span></article>
        <article><strong>해시</strong><span>파일명에 버전을 넣어 브라우저 캐시를 안전하게 갱신합니다.</span></article>
        <article><strong>정적 호스팅</strong><span>dist 폴더를 웹 서버의 공개 디렉터리에 배포합니다.</span></article>
      </div>
    </section>

    <section v-if="isOverview" class="practice-section deployment-section">
      <p class="section-kicker">274쪽 · Hands-on Weather Deployment</p>
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

    <RouterLink v-if="isOverview" class="next-link secondary-link" to="/ui-library"
      >UI Library 실습으로 이동 →</RouterLink
    >
    <RouterLink v-else class="next-link secondary-link" to="/vite/overview">Vite 전체 보기 →</RouterLink>
  </div>
</template>

<style scoped>
.vite-quality-page {
  width: min(980px, 100%);
}
.challenge-tabs {
  margin: -8px 0 22px;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
  border: 1px solid #dce7eb;
  border-radius: 11px;
  background: #f8fbfc;
}
.challenge-tab {
  min-width: 0;
  padding: 10px 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #63747d;
  text-decoration: none;
}
.challenge-tab:hover,
.challenge-tab.is-active {
  border-color: #cce7da;
  color: #287550;
  background: #eaf8f1;
}
.challenge-tab span {
  color: #42a579;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.challenge-tab strong {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.quality-check-section,
.deployment-section,
.vite-demo-section {
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
.vite-command-card {
  padding: 14px 16px;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid #d8e3e7;
  border-radius: 8px;
  background: #f8fbfc;
  color: var(--muted);
  font-size: 12px;
}
.vite-command-card strong {
  color: #2c5162;
}
.prettier-compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.prettier-compare > article > span {
  color: #82919a;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
}
.prettier-compare .code-sample {
  margin-top: 8px;
}
.vite-build-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.vite-build-grid article {
  padding: 14px;
  border-radius: 9px;
  background: #f5f8f8;
}
.vite-build-grid strong,
.vite-build-grid span {
  display: block;
}
.vite-build-grid strong {
  color: #2c5162;
  font-size: 13px;
}
.vite-build-grid span {
  margin-top: 7px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.55;
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
  .challenge-tabs,
  .quality-check-grid,
  .prettier-compare,
  .vite-build-grid {
    grid-template-columns: 1fr;
  }
}
</style>
