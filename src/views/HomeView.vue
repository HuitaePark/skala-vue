<script setup>
const learningTracks = [
  {
    index: '01',
    tone: 'code',
    label: 'CODE CHALLENGE',
    title: '작은 예제로 원리를 확인해요.',
    description: '문법을 읽는 데서 멈추지 않고, 버튼과 입력값을 바꾸며 Vue의 반응성을 몸으로 익힙니다.',
    topics: ['기초 문법 · Directive', 'Event · Form Handling', 'Composition · Components'],
    cta: '첫 챌린지 시작',
    to: '/basic',
  },
  {
    index: '02',
    tone: 'hands',
    label: 'HANDS-ON',
    title: '배운 개념을 서비스로 연결해요.',
    description: '컴포넌트, 라우터, Pinia, Axios를 하나의 Weather 서비스에 차례로 쌓아 올립니다.',
    topics: ['Weather Components', 'Dynamic Router · Pinia', 'OpenWeather · Deploy'],
    cta: '최종 Weather 열기',
    to: '/hands-on/weather',
  },
]

const learningJourney = [
  { index: '01', label: 'START', title: 'Vue 기초 문법', detail: '반응성 · 텍스트 보간', to: '/basic' },
  { index: '02', label: 'TRY', title: 'Directive & Event', detail: '화면과 사용자 동작', to: '/directives' },
  {
    index: '03',
    label: 'CONNECT',
    title: 'Composition API',
    detail: 'computed · watch · lifecycle',
    to: '/composition/challenge',
  },
  { index: '04', label: 'SHIP', title: 'Weather Final', detail: 'Router · Pinia · Axios', to: '/hands-on/weather' },
]
</script>

<template>
  <div class="home-page">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero-copy">
        <h1 id="home-title">Vue를 읽고,<br /><span>직접 움직여보세요.</span></h1>
        <p class="home-hero-description">
          SKALA-VUE는 강의 PDF 1~274페이지를 따라가며, 핵심 문법을 실행 가능한 코드와 하나의 Weather 서비스로 연결하는
          학습 공간입니다.
        </p>
        <div class="home-hero-actions">
          <RouterLink class="home-primary-action" to="/basic">
            학습 시작하기
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
              />
            </svg>
          </RouterLink>
          <RouterLink class="home-secondary-action" to="/curriculum">전체 학습 경로 보기</RouterLink>
        </div>
        <div class="home-hero-meta">
          <span><i aria-hidden="true"></i> 1 — 274 pages mapped</span>
          <span>Vue 3 · Composition API</span>
        </div>
      </div>

      <aside class="home-console" aria-label="SKALA-VUE 학습 진행 보드">
        <div class="home-console-header">
          <span>SKALA / LEARNING DESK</span>
          <strong><i aria-hidden="true"></i> READY</strong>
        </div>
        <div class="home-console-title">
          <h2>Pick a path.<br />Build the next one.</h2>
        </div>
        <div class="home-console-flow">
          <div class="home-console-flow-row">
            <span class="home-console-flow-index">01</span>
            <span>
              <strong>Learn the syntax</strong>
              <small>반응성 · Directive · Event</small>
            </span>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <div class="home-console-flow-row">
            <span class="home-console-flow-index">02</span>
            <span>
              <strong>Connect the pieces</strong>
              <small>computed · watch · Components</small>
            </span>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <div class="home-console-flow-row is-final">
            <span class="home-console-flow-index">03</span>
            <span>
              <strong>Ship a real screen</strong>
              <small>Weather · API · Deploy</small>
            </span>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
          </div>
        </div>
        <div class="home-console-footer">
          <span>Current route</span>
          <code>/hands-on/weather</code>
        </div>
      </aside>
    </section>

    <section class="home-tracks" aria-labelledby="home-tracks-title">
      <div class="home-section-heading">
        <div>
          <h2 id="home-tracks-title">두 가지 방식으로 배우고,<br />하나의 결과로 연결합니다.</h2>
        </div>
        <p>빠르게 확인하고, 깊게 조립하세요. 어느 쪽에서 시작해도 다음 학습으로 이어집니다.</p>
      </div>

      <div class="home-track-grid">
        <article
          v-for="track in learningTracks"
          :key="track.index"
          class="home-track-panel"
          :class="`home-track-panel--${track.tone}`"
        >
          <div class="home-track-panel-topline">
            <span>{{ track.index }}</span>
            <strong>{{ track.label }}</strong>
          </div>
          <h3>{{ track.title }}</h3>
          <p>{{ track.description }}</p>
          <ul>
            <li v-for="topic in track.topics" :key="topic">
              <i aria-hidden="true"></i>
              <span>{{ topic }}</span>
            </li>
          </ul>
          <RouterLink class="home-track-link" :to="track.to">
            {{ track.cta }}
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
              />
            </svg>
          </RouterLink>
        </article>
      </div>
    </section>

    <section class="home-journey" aria-labelledby="home-journey-title">
      <div class="home-section-heading home-section-heading--journey">
        <div>
          <h2 id="home-journey-title">오늘의 다음 한 걸음</h2>
        </div>
        <RouterLink to="/curriculum">전체 커리큘럼 →</RouterLink>
      </div>

      <ol class="home-journey-list">
        <li v-for="step in learningJourney" :key="step.index">
          <span class="home-journey-index">{{ step.index }}</span>
          <div>
            <span class="home-journey-label">{{ step.label }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.detail }}</p>
          </div>
          <RouterLink :to="step.to" :aria-label="`${step.title} 열기`">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M3 9h11m-4-4 4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
              />
            </svg>
          </RouterLink>
        </li>
      </ol>
    </section>

    <section class="home-final-cta" aria-labelledby="home-final-title">
      <div>
        <h2 id="home-final-title">마지막에는 실제 화면이 남습니다.</h2>
        <p>배운 내용을 한 화면에서 확인하고 싶다면, Weather Hands-on 최종 대시보드로 바로 이동하세요.</p>
      </div>
      <RouterLink to="/hands-on/weather">
        Weather 최종 대시보드
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M3 9h11m-4-4 4 4-4 4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
          />
        </svg>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-width: 0;
  padding-bottom: 24px;
  color: var(--ink);
}

.home-hero {
  min-height: 465px;
  padding: 10px 0 55px;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  align-items: center;
  gap: clamp(45px, 8vw, 96px);
}

.home-hero-copy {
  min-width: 0;
}

.home-hero h1 {
  margin: 0;
  color: #1f3430;
  font-size: clamp(44px, 6vw, 73px);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.99;
}

.home-hero h1 span {
  color: var(--vue-dark);
}

.home-hero-description {
  max-width: 54ch;
  margin: 28px 0 0;
  color: #63747d;
  font-size: 15px;
  line-height: 1.75;
}

.home-hero-actions {
  margin-top: 28px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}

.home-primary-action,
.home-secondary-action,
.home-track-link,
.home-section-heading--journey > a,
.home-final-cta > a {
  min-height: 44px;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease;
}

.home-primary-action {
  color: #fff;
  background: var(--vue-dark);
  box-shadow: 0 8px 18px rgba(47, 147, 104, 0.2);
}

.home-primary-action:hover,
.home-final-cta > a:hover {
  background: #24734f;
  transform: translateY(-2px);
}

.home-primary-action svg,
.home-track-link svg,
.home-section-heading--journey > a svg,
.home-final-cta > a svg {
  width: 16px;
  height: 16px;
}

.home-secondary-action {
  color: #42615a;
  border: 1px solid #d5e2dc;
  background: #fff;
}

.home-secondary-action:hover {
  border-color: #a6ccb9;
  background: #f2fbf6;
  transform: translateY(-2px);
}

.home-hero-meta {
  margin-top: 23px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  color: #89999d;
  font-size: 10px;
  font-weight: 700;
}

.home-hero-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.home-hero-meta i,
.home-console-header i {
  width: 7px;
  height: 7px;
  display: inline-block;
  border-radius: 50%;
  background: var(--vue);
  box-shadow: 0 0 0 4px rgba(66, 184, 131, 0.13);
}

.home-console {
  min-width: 0;
  padding: 24px;
  overflow: hidden;
  border: 1px solid #28433c;
  border-radius: 16px;
  color: #e9f7f0;
  background: #172a26;
  box-shadow: 0 24px 45px rgba(24, 48, 42, 0.18);
}

.home-console-header,
.home-console-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  color: #88aa9d;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.home-console-header strong {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #9fe2bf;
  font-size: 9px;
}

.home-console-header i {
  width: 6px;
  height: 6px;
  box-shadow: none;
}

.home-console-title {
  margin-top: 62px;
}

.home-console-title h2 {
  margin: 0;
  color: #f1fcf7;
  font-size: clamp(27px, 3.2vw, 39px);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.04;
}

.home-console-flow {
  margin-top: 40px;
  border-top: 1px solid #315047;
}

.home-console-flow-row {
  min-width: 0;
  padding: 15px 0;
  display: grid;
  grid-template-columns: 33px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #315047;
}

.home-console-flow-row > span:nth-child(2) {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.home-console-flow-index {
  color: #73c496;
  font-size: 11px;
  font-weight: 800;
}

.home-console-flow-row strong {
  overflow: hidden;
  color: #eefaf5;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.home-console-flow-row small {
  overflow: hidden;
  color: #83a79b;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.home-console-flow-row svg {
  width: 16px;
  height: 16px;
  color: #64897b;
}

.home-console-flow-row.is-final .home-console-flow-index,
.home-console-flow-row.is-final svg {
  color: #b9f2d1;
}

.home-console-footer {
  margin-top: 20px;
  color: #78968b;
  letter-spacing: 0;
}

.home-console-footer code {
  padding: 0;
  color: #b9e9ce;
  background: transparent;
  font-size: 10px;
}

.home-tracks,
.home-journey {
  padding-top: 60px;
}

.home-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.home-section-heading h2 {
  margin: 0;
  color: #253d37;
  font-size: clamp(25px, 4vw, 39px);
  letter-spacing: -0.055em;
  line-height: 1.12;
}

.home-section-heading > p {
  max-width: 33ch;
  margin: 0 0 3px;
  color: #71818a;
  font-size: 13px;
  line-height: 1.6;
}

.home-track-grid {
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.home-track-panel {
  min-width: 0;
  min-height: 360px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-radius: 16px;
}

.home-track-panel--code {
  border-color: #2b4840;
  color: #ecfaf3;
  background: #1c332e;
}

.home-track-panel--hands {
  border-color: #cfe8db;
  color: #233b34;
  background: #eaf8f1;
}

.home-track-panel-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.home-track-panel--code .home-track-panel-topline {
  color: #86c8a6;
}

.home-track-panel--hands .home-track-panel-topline {
  color: #3a8c68;
}

.home-track-panel h3 {
  max-width: 15ch;
  margin: 52px 0 0;
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.055em;
  line-height: 1.12;
}

.home-track-panel > p {
  max-width: 45ch;
  margin: 13px 0 0;
  font-size: 13px;
  line-height: 1.7;
}

.home-track-panel--code > p {
  color: #a4c5b6;
}

.home-track-panel--hands > p {
  color: #5c786c;
}

.home-track-panel ul {
  margin: 24px 0 0;
  padding: 0;
  display: grid;
  gap: 9px;
  list-style: none;
}

.home-track-panel li {
  min-width: 0;
  padding-top: 9px;
  display: flex;
  align-items: center;
  gap: 9px;
  border-top: 1px solid;
  font-size: 11px;
  font-weight: 700;
}

.home-track-panel--code li {
  border-color: #315349;
  color: #c4e0d2;
}

.home-track-panel--hands li {
  border-color: #cfe5d9;
  color: #3c6455;
}

.home-track-panel li i {
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
}

.home-track-link {
  align-self: flex-start;
  margin-top: auto;
  padding-inline: 0;
  border-radius: 0;
}

.home-track-panel--code .home-track-link {
  color: #b9f2d1;
}

.home-track-panel--hands .home-track-link {
  color: #287550;
}

.home-track-link:hover {
  transform: translateX(3px);
}

.home-section-heading--journey {
  align-items: center;
}

.home-section-heading--journey > a {
  min-height: 36px;
  padding: 8px 0;
  color: #3c7860;
}

.home-section-heading--journey > a:hover {
  color: #246447;
  transform: translateX(3px);
}

.home-journey-list {
  margin: 26px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid #d7e3de;
  border-bottom: 1px solid #d7e3de;
  list-style: none;
}

.home-journey-list li {
  min-width: 0;
  min-height: 178px;
  padding: 20px 18px 18px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d7e3de;
}

.home-journey-list li:not(:first-child) {
  padding-left: 18px;
}

.home-journey-list li:last-child {
  border-right: 0;
}

.home-journey-index {
  color: #3d9b6b;
  font-size: 11px;
  font-weight: 800;
}

.home-journey-label {
  margin-top: 23px;
  display: block;
  color: #83948d;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.home-journey-list h3 {
  margin: 7px 0 0;
  color: #2d453e;
  font-size: 14px;
  letter-spacing: -0.03em;
}

.home-journey-list p {
  margin: 5px 0 0;
  color: #7b8b86;
  font-size: 10px;
  line-height: 1.45;
}

.home-journey-list li > a {
  height: 44px;
  width: 44px;
  margin-top: auto;
  display: grid;
  place-items: center;
  border: 1px solid #cfe0d8;
  border-radius: 50%;
  color: #3c8c67;
  background: #f8fcfa;
  transition:
    color 160ms ease,
    background-color 160ms ease,
    transform 160ms ease;
}

.home-journey-list li > a:hover {
  color: #fff;
  background: #3d9b6b;
  transform: translateX(3px);
}

.home-journey-list li > a svg {
  width: 15px;
  height: 15px;
}

.home-final-cta {
  margin-top: 60px;
  padding: 28px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-radius: 15px;
  color: #eaf9f1;
  background: #213c34;
}

.home-final-cta h2 {
  margin: 0;
  color: #f2fcf7;
  font-size: clamp(22px, 3vw, 30px);
  letter-spacing: -0.045em;
}

.home-final-cta p {
  max-width: 55ch;
  margin: 8px 0 0;
  color: #a6c8ba;
  font-size: 12px;
  line-height: 1.6;
}

.home-final-cta > a {
  flex: 0 0 auto;
  color: #235640;
  background: #b9f2d1;
}

@media (max-width: 900px) {
  .home-hero {
    grid-template-columns: minmax(0, 1fr) minmax(310px, 0.84fr);
    gap: 34px;
  }

  .home-console {
    padding: 20px;
  }

  .home-console-title {
    margin-top: 45px;
  }

  .home-track-panel h3 {
    margin-top: 38px;
  }
}

@media (max-width: 760px) {
  .home-hero {
    padding-top: 8px;
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .home-hero h1 {
    font-size: clamp(43px, 12vw, 64px);
  }

  .home-console {
    max-width: 600px;
  }

  .home-section-heading,
  .home-final-cta {
    align-items: flex-start;
    flex-direction: column;
  }

  .home-section-heading > p {
    margin-top: 3px;
  }

  .home-track-grid {
    grid-template-columns: 1fr;
  }

  .home-track-panel {
    min-height: 330px;
  }

  .home-journey-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-journey-list li:nth-child(2) {
    border-right: 0;
  }

  .home-journey-list li:nth-child(3),
  .home-journey-list li:nth-child(4) {
    border-top: 1px solid #d7e3de;
  }

  .home-journey-list li:nth-child(3) {
    padding-left: 0;
  }

  .home-journey-list li:nth-child(4) {
    padding-left: 18px;
  }
}

@media (max-width: 480px) {
  .home-hero {
    min-height: 0;
    padding-bottom: 40px;
  }

  .home-hero-description {
    margin-top: 21px;
    font-size: 13px;
  }

  .home-hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .home-primary-action,
  .home-secondary-action {
    width: 100%;
  }

  .home-hero-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .home-console {
    padding: 18px;
    border-radius: 13px;
  }

  .home-console-title {
    margin-top: 40px;
  }

  .home-console-title h2 {
    font-size: 31px;
  }

  .home-console-flow {
    margin-top: 32px;
  }

  .home-tracks,
  .home-journey {
    padding-top: 44px;
  }

  .home-section-heading h2 {
    font-size: 29px;
  }

  .home-track-panel {
    min-height: 320px;
    padding: 20px;
  }

  .home-track-panel h3 {
    margin-top: 31px;
    font-size: 28px;
  }

  .home-journey-list {
    grid-template-columns: 1fr;
  }

  .home-journey-list li,
  .home-journey-list li:not(:first-child),
  .home-journey-list li:nth-child(3),
  .home-journey-list li:nth-child(4) {
    min-height: 145px;
    padding: 17px 0;
    border-right: 0;
    border-top: 1px solid #d7e3de;
  }

  .home-journey-list li:first-child {
    border-top: 0;
  }

  .home-journey-label {
    margin-top: 15px;
  }

  .home-final-cta {
    margin-top: 44px;
    padding: 22px 20px;
  }

  .home-final-cta > a {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-primary-action,
  .home-secondary-action,
  .home-track-link,
  .home-section-heading--journey > a,
  .home-final-cta > a,
  .home-journey-list li > a {
    transition: none;
  }
}
</style>
