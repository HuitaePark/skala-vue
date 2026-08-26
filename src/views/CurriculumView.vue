<script setup>
const sections = [
  {
    pages: '1~6쪽',
    title: '과정 소개와 과제 기준',
    description: 'SKALA Frontend-framework: Vue.js 과정의 학습 목표, 소스 저장소, 제출 방법과 평가 기준을 확인합니다.',
    tag: 'Orientation',
  },
  {
    pages: '26~37쪽',
    title: 'Vue.js 개념',
    description: 'Vue의 역사, MVVM, Virtual DOM, 양방향 바인딩, 컴포넌트, SPA와 Router·Pinia·Axios·Vite의 역할을 정리합니다.',
    tag: 'Concepts',
  },
  {
    pages: '38~47쪽',
    title: '개발환경 구성',
    description: 'WSL/Ubuntu, Node.js, VS Code, Vue Devtools, Postman을 준비하는 강의 구간입니다.',
    tag: 'Environment',
  },
  {
    pages: '48~65쪽',
    title: 'Vue 프로젝트 스캐폴딩',
    description: 'Vite로 프로젝트를 만들고 SFC, 디렉터리 구조, main.js, App.vue, Router와 Pinia를 연결합니다.',
    tag: '완료',
    to: '/',
  },
  {
    pages: '66~71쪽',
    title: 'Composition API와 보간법',
    description: 'Options API와 Composition API를 비교하고 ref 반응성, JavaScript 텍스트 보간, SampleOne·SampleTwo를 실행합니다.',
    tag: '완료',
    to: '/',
  },
  {
    pages: '72~92쪽',
    title: 'Code Challenge · Vue Directive',
    description: 'v-html, v-text, v-bind, v-if, v-show, v-for, v-pre, v-cloak, v-once, v-memo 예제를 한 화면에서 비교합니다.',
    tag: '완료',
    to: '/directives',
  },
  {
    pages: '93~105쪽',
    title: 'Code Challenge · Vue Event Handling',
    description: 'v-on 축약형, inline/method handler, Event Object와 $event, prevent·stop·once·self와 키·마우스 수식어를 실습합니다.',
    tag: '완료',
    to: '/events',
  },
  {
    pages: '106~115쪽',
    title: 'Code Challenge · Vue Form Handling',
    description: 'v-model 양방향 바인딩, textarea·checkbox·radio·select 매핑, .lazy·.number·.trim 수식어와 Scoped/External Style을 실습합니다.',
    tag: '완료',
    to: '/forms',
  },
  {
    pages: '116쪽',
    title: 'Hands-on · Weather Dashboard',
    description: '검색·즐겨찾기·시간대별 예보·도시 상세 패널을 갖춘 서비스형 날씨 Dashboard로 v-for, v-if, :value, @input 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/hands-on/weather',
  },
  {
    pages: '117~126쪽',
    title: 'Composition API · Reactive State',
    description: 'createApp 개념, ref·reactive 반응성 상태와 배열·객체 변경 예제를 실행하고 Reactive State Code Challenge까지 확인합니다.',
    tag: '완료',
    to: '/composition',
  },
  {
    pages: '127~143쪽',
    title: 'Computed & Watchers',
    description: 'computed 캐싱, 단일·다중 source watch, deep·reactive·array watch와 watchEffect의 자동 의존성 추적을 실습합니다.',
    tag: '완료',
    to: '/composition',
  },
  {
    pages: '144쪽',
    title: 'Code Challenge · Computed & Watchers',
    description: 'computed, watch, Multi-Source Watch, Deep Watch, Array Watch, watchEffect 예제를 한 화면에서 점검합니다.',
    tag: '실습 화면',
    to: '/composition/challenge',
  },
  {
    pages: '146~150쪽',
    title: 'Vue Component Overview',
    description: '컴포넌트의 역할과 계층 구조, Parent-Child·Sibling 관계, Local/Global Registration 개념을 정리합니다.',
    tag: '개념',
  },
  {
    pages: '151~154쪽',
    title: 'Component Lifecycle',
    description: '생성·부착·갱신·소멸 단계와 setup, onMounted, onUpdated, onUnmounted 등 Lifecycle Hook을 확인합니다.',
    tag: '완료',
    to: '/composition/lifecycle',
  },
  {
    pages: '155쪽',
    title: 'Code Challenge · Component Lifecycle',
    description: 'Lifecycle Hook 예제에서 타이머 시작, DOM 업데이트 로그, 언마운트 시 리소스 정리까지 직접 실행합니다.',
    tag: '실습 화면',
    to: '/composition/lifecycle',
  },
  {
    pages: '156~164쪽',
    title: 'Props · defineProps()',
    description: '부모에서 자식으로 데이터를 전달하는 Props, 배열·객체 선언, required·default·type 검증과 readonly 규칙을 확인합니다.',
    tag: '완료',
    to: '/components/props',
  },
  {
    pages: '165~168쪽',
    title: 'Emits · defineEmits()',
    description: '자식 컴포넌트가 사용자 이벤트와 Payload를 부모에게 전달하는 defineEmits()와 Props & Emits 통합 흐름을 실습합니다.',
    tag: '완료',
    to: '/components/props',
  },
  {
    pages: '169~171쪽',
    title: 'Provide & Inject',
    description: 'Props Drilling을 줄이고 컴포넌트 트리 어디서든 공통 값을 주입하는 provide·inject 개념을 정리합니다.',
    tag: '개념',
  },
  {
    pages: '172쪽',
    title: 'Code Challenge · Props & Emits',
    description: '부모 Props 전달, 자식 Emits 발생, Payload 처리와 이벤트 Timeline까지 한 화면에서 점검합니다.',
    tag: '실습 화면',
    to: '/components/props',
  },
  {
    pages: '178쪽',
    title: 'Hands on · Weather Component',
    description: '기능 변경 없이 WeatherParent, BaseDashboardCard, SearchBar, WeatherCard 네 컴포넌트로 날씨 화면을 분리하고 Props·Emits·Slot 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/components/weather',
  },
  {
    pages: '196~197쪽',
    title: 'Hands on · Weather Router',
    description: 'WeatherHomeView, WeatherDetailView, WeatherAboutView를 Lazy Loading과 동적 경로로 연결하고 Catch-all Route와 Programmatic Navigation을 확인합니다.',
    tag: '실습 화면',
    to: '/weather',
  },
]
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 1~197 · SKALA-VUE Roadmap</p>
      <h1>강의 PDF 전체 범위</h1>
      <p>
        1~197페이지를 학습 흐름대로 나눈 커리큘럼입니다. 이론·환경 설명은 범위를 카드로
        정리하고, 실제 소스코드가 있는 구간은 실행 가능한 실습 화면으로 연결했습니다.
      </p>
    </section>

    <section class="practice-section curriculum-section">
      <div class="curriculum-head">
        <div>
          <p class="section-kicker">전체 학습 경로</p>
          <h2>Vue Syntax 학습 경로</h2>
        </div>
        <span class="page-badge">1 — 197</span>
      </div>

      <div class="curriculum-list">
        <article v-for="section in sections" :key="section.pages" class="curriculum-card">
          <div class="curriculum-card-topline">
            <span class="page-badge light">{{ section.pages }}</span>
            <span class="curriculum-tag" :class="{ complete: section.tag === '완료' }">{{ section.tag }}</span>
          </div>
          <h3>{{ section.title }}</h3>
          <p>{{ section.description }}</p>
          <RouterLink v-if="section.to" class="card-link" :to="section.to">
            {{ section.to === '/composition/challenge' ? 'Code Challenge 실습 열기' : section.to === '/composition/lifecycle' ? 'Lifecycle 실습 열기' : section.to === '/components/props' ? 'Props & Emits 실습 열기' : section.to === '/components/weather' ? 'Weather Component 실습 열기' : section.to === '/weather' ? 'Weather Router 열기' : section.to === '/composition' ? 'Composition API 실습 열기' : section.to === '/directives' ? 'Directive 실습 열기' : section.to === '/events' ? 'Event 실습 열기' : section.to === '/forms' ? 'Form 실습 열기' : section.to === '/hands-on/weather' ? 'Weather Dashboard 열기' : 'Vue 기초 실습 열기' }}
            <span aria-hidden="true">→</span>
          </RouterLink>
        </article>
      </div>
    </section>

    <section class="practice-section curriculum-note">
      <p class="section-kicker">실행 안내</p>
      <h2>프로젝트 실행</h2>
      <p>터미널에서 <code>npm install</code> 후 <code>npm run dev</code>를 실행하고, 안내된 로컬 주소로 접속하세요.</p>
      <div class="command-line"><code>npm run dev</code><span>→ http://localhost:5173</span></div>
    </section>
  </div>
</template>
