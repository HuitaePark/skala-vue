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
    description:
      'Vue의 역사, MVVM, Virtual DOM, 양방향 바인딩, 컴포넌트, SPA와 Router·Pinia·Axios·Vite의 역할을 정리합니다.',
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
    to: '/basic',
  },
  {
    pages: '66~71쪽',
    title: 'Composition API와 보간법',
    description:
      'Options API와 Composition API를 비교하고 ref 반응성, JavaScript 텍스트 보간, SampleOne·SampleTwo를 실행합니다.',
    tag: '완료',
    to: '/basic',
  },
  {
    pages: '72~92쪽',
    title: 'Code Challenge · Vue Directive',
    description:
      'v-html, v-text, v-bind, v-if, v-show, v-for, v-pre, v-cloak, v-once, v-memo 예제를 한 화면에서 비교합니다.',
    tag: '완료',
    to: '/directives',
  },
  {
    pages: '93~105쪽',
    title: 'Code Challenge · Vue Event Handling',
    description:
      'v-on 축약형, inline/method handler, Event Object와 $event, prevent·stop·once·self와 키·마우스 수식어를 실습합니다.',
    tag: '완료',
    to: '/events',
  },
  {
    pages: '106~115쪽',
    title: 'Code Challenge · Vue Form Handling',
    description:
      'v-model 양방향 바인딩, textarea·checkbox·radio·select 매핑, .lazy·.number·.trim 수식어와 Scoped/External Style을 실습합니다.',
    tag: '완료',
    to: '/forms',
  },
  {
    pages: '116쪽',
    title: 'Hands-on · Weather Dashboard',
    description:
      '검색·즐겨찾기·시간대별 예보·도시 상세 패널을 갖춘 서비스형 날씨 Dashboard로 v-for, v-if, :value, @input 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/hands-on/weather',
  },
  {
    pages: '117~126쪽',
    title: 'Composition API · Reactive State',
    description:
      'createApp 개념, ref·reactive 반응성 상태와 배열·객체 변경 예제를 실행하고 Reactive State Code Challenge까지 확인합니다.',
    tag: '완료',
    to: '/composition',
  },
  {
    pages: '127~143쪽',
    title: 'Computed & Watchers',
    description:
      'computed 캐싱, 단일·다중 source watch, deep·reactive·array watch와 watchEffect의 자동 의존성 추적을 실습합니다.',
    tag: '완료',
    to: '/composition',
  },
  {
    pages: '144쪽',
    title: 'Code Challenge · Computed & Watchers',
    description:
      'computed, watch, Multi-Source Watch, Deep Watch, Array Watch, watchEffect 예제를 한 화면에서 점검합니다.',
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
    description:
      '부모에서 자식으로 데이터를 전달하는 Props, 배열·객체 선언, required·default·type 검증과 readonly 규칙을 확인합니다.',
    tag: '완료',
    to: '/components/props',
  },
  {
    pages: '165~168쪽',
    title: 'Emits · defineEmits()',
    description:
      '자식 컴포넌트가 사용자 이벤트와 Payload를 부모에게 전달하는 defineEmits()와 Props & Emits 통합 흐름을 실습합니다.',
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
    pages: '173~177쪽',
    title: 'Code Challenge · Component Slot',
    description:
      'Default Slot, Named Slot, Scoped Slot과 fallback·slot props 전달을 각각 실행하며 부모 콘텐츠 주입 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/components/slot',
  },
  {
    pages: '178쪽',
    title: 'Hands on · Weather Component',
    description:
      '기능 변경 없이 WeatherParent, BaseDashboardCard, SearchBar, WeatherCard 네 컴포넌트로 날씨 화면을 분리하고 Props·Emits·Slot 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/components/weather',
  },
  {
    pages: '196~197쪽',
    title: 'Hands on · Weather Router',
    description:
      'WeatherHomeView, WeatherDetailView, WeatherAboutView를 Lazy Loading과 동적 경로로 연결하고 Catch-all Route와 Programmatic Navigation을 확인합니다.',
    tag: '실습 화면',
    to: '/weather',
  },
  {
    pages: '198~211쪽',
    title: 'Pinia Store와 상태 관리',
    description:
      'defineStore, state, getters, actions와 storeToRefs를 익히고 인증 store·라우터 가드로 확장하는 흐름을 정리합니다.',
    tag: '완료',
    to: '/pinia',
  },
  {
    pages: '212쪽',
    title: 'Hands on · Weather Store',
    description: 'configStore의 온도 단위 state·getter·action을 Weather Router 메인과 상세 화면에 연결합니다.',
    tag: '실습 화면',
    to: '/pinia',
  },
  {
    pages: '214~229쪽',
    title: 'Axios와 REST API',
    description:
      'HTTP method, JSON 응답, Axios client와 예외 처리를 이해하고 OpenWeatherMap·JSONPlaceholder 요청을 실행합니다.',
    tag: '완료',
    to: '/axios',
  },
  {
    pages: '230쪽',
    title: 'Hands on · Weather Axios',
    description: 'OpenWeatherMap 현재 날씨·예보 API와 외부 JSON API를 화면 모델로 변환해 날씨 기능을 확장합니다.',
    tag: '실습 화면',
    to: '/axios',
  },
  {
    pages: '232~245쪽',
    title: 'UI Libraries · Element Plus 개념',
    description:
      '외부 UI 라이브러리의 Form, Input, Rate, Message Box, Progress 컴포넌트 역할과 Vue 반응성 연결 방식을 정리합니다.',
    tag: '개념',
  },
  {
    pages: '246쪽',
    title: 'Code Challenge · UI Library Form',
    description: 'Element Plus Form·Input·Switch로 이메일 형식과 약관 동의를 확인하는 회원가입 화면을 실행합니다.',
    tag: '실습 화면',
    to: '/ui-library',
  },
  {
    pages: '247쪽',
    title: 'Code Challenge · UI Library 상품',
    description: 'Input Number·Rate를 사용해 상품 수량과 평점을 주문 요약에 실시간으로 반영합니다.',
    tag: '실습 화면',
    to: '/ui-library/product',
  },
  {
    pages: '248쪽',
    title: 'Code Challenge · UI Library 피드백',
    description: 'Message Box 삭제 확인과 Progress 데이터 동기화 상태를 직접 조작합니다.',
    tag: '실습 화면',
    to: '/ui-library/progress',
  },
  {
    pages: '249쪽',
    title: 'Hands on · Weather UI Library',
    description: 'Element Plus 카드 안에 지금까지 만든 Weather 컴포넌트를 조합해 서비스 화면으로 확장합니다.',
    tag: '실습 화면',
    to: '/ui-library/overview',
  },
  {
    pages: '250~269쪽',
    title: 'Vite Build & Deployment 개념',
    description: 'ESLint·Prettier 품질 도구, Vite mode별 환경변수, bundle과 dist 정적 배포 흐름을 정리합니다.',
    tag: '개념',
  },
  {
    pages: '270쪽',
    title: 'Code Challenge · Vite ESLint',
    description: 'strict equality와 Vue 규칙을 lint 명령으로 검사해 제출 전 오류를 발견합니다.',
    tag: '실습 화면',
    to: '/vite',
  },
  {
    pages: '271쪽',
    title: 'Code Challenge · Vite Prettier',
    description: 'Vue·JavaScript·CSS 포맷을 일관되게 맞추고 format:check 결과를 확인합니다.',
    tag: '실습 화면',
    to: '/vite/prettier',
  },
  {
    pages: '272쪽',
    title: 'Code Challenge · Vite 환경변수',
    description: 'Vite mode와 VITE_ 접두사 환경변수, 로컬 API key 분리 흐름을 확인합니다.',
    tag: '실습 화면',
    to: '/vite/env',
  },
  {
    pages: '273쪽',
    title: 'Code Challenge · Vite Build',
    description: 'vite build 결과인 dist 정적 자산과 해시 파일을 확인하고 배포 명령을 정리합니다.',
    tag: '실습 화면',
    to: '/vite/build',
  },
  {
    pages: '274쪽',
    title: 'Hands on · Weather Deployment',
    description: '검사·빌드가 끝난 Weather SPA를 정적 호스팅에 올리는 배포 순서를 확인합니다.',
    tag: '실습 화면',
    to: '/vite/overview',
  },
]

const linkLabels = {
  '/basic': 'Vue 기초 실습 열기',
  '/composition': 'Composition API 실습 열기',
  '/composition/challenge': 'Code Challenge 실습 열기',
  '/composition/lifecycle': 'Lifecycle 실습 열기',
  '/components/props': 'Props & Emits 실습 열기',
  '/components/slot': 'Slot 실습 열기',
  '/components/weather': 'Weather Component 실습 열기',
  '/weather': 'Weather Router 열기',
  '/hands-on/weather': 'Weather Dashboard 열기',
  '/directives': 'Directive 실습 열기',
  '/events': 'Event 실습 열기',
  '/forms': 'Form 실습 열기',
  '/pinia': 'Pinia Store 실습 열기',
  '/axios': 'Axios API 실습 열기',
  '/ui-library': 'UI Library Form 실습 열기',
  '/ui-library/product': 'UI Library 상품 실습 열기',
  '/ui-library/progress': 'UI Library 피드백 실습 열기',
  '/ui-library/overview': 'UI Library 전체 실습 열기',
  '/vite': 'Vite ESLint 실습 열기',
  '/vite/prettier': 'Vite Prettier 실습 열기',
  '/vite/env': 'Vite 환경변수 실습 열기',
  '/vite/build': 'Vite Build 실습 열기',
  '/vite/overview': 'Vite 전체 실습 열기',
}

function linkLabel(section) {
  return linkLabels[section.to] ?? '실습 열기'
}
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 1~274 · SKALA-VUE Roadmap</p>
      <h1>강의 PDF 전체 범위</h1>
      <p>
        1~274페이지를 학습 흐름대로 나눈 커리큘럼입니다. 이론·환경 설명은 범위를 카드로 정리하고, 실제 소스코드가 있는
        구간은 실행 가능한 실습 화면으로 연결했습니다.
      </p>
    </section>

    <section class="practice-section curriculum-section">
      <div class="curriculum-head">
        <div>
          <p class="section-kicker">전체 학습 경로</p>
          <h2>Vue Syntax 학습 경로</h2>
        </div>
        <span class="page-badge">1 — 274</span>
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
            {{ linkLabel(section) }}
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
