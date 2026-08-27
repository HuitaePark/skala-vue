<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const openMenu = ref(null)

const navGroups = [
  {
    id: 'code-challenge',
    label: 'Code Challenge',
    description: 'Vue의 핵심 문법을 작은 실습으로 확인하고, 직접 동작을 바꿔보세요.',
    sections: [
      {
        title: '기초 문법',
        items: [
          { label: 'Vue 기초 문법', meta: '반응성 · 텍스트 보간', to: '/', routeNames: ['home'] },
          { label: 'Vue Directive', meta: 'v-if · v-for · v-bind', to: '/directives', routeNames: ['directives'] },
        ],
      },
      {
        title: '상호작용',
        items: [
          { label: 'Event Handling', meta: '이벤트 · 수식어', to: '/events', routeNames: ['events'] },
          { label: 'Form Handling', meta: 'v-model · 입력 상태', to: '/forms', routeNames: ['forms'] },
        ],
      },
      {
        title: 'Composition API',
        items: [
          { label: 'Reactive State', meta: 'ref · reactive · watch', to: '/composition', routeNames: ['composition'] },
          {
            label: 'Computed & Watchers',
            meta: 'computed · multi-source',
            to: '/composition/challenge',
            routeNames: ['composition-challenge'],
          },
          {
            label: 'Component Lifecycle',
            meta: 'mounted · updated · unmounted',
            to: '/composition/lifecycle',
            routeNames: ['composition-lifecycle'],
          },
        ],
      },
      {
        title: '컴포넌트와 도구',
        items: [
          {
            label: 'Props & Emits',
            meta: '부모 · 자식 데이터 흐름',
            to: '/components/props',
            routeNames: ['components-props'],
          },
          { label: 'Pinia Store', meta: '상태 · getter · action', to: '/pinia', routeNames: ['pinia-challenge'] },
          { label: 'Axios API', meta: 'REST 요청 · 예외 처리', to: '/axios', routeNames: ['axios-challenge'] },
          {
            label: 'Element Plus',
            meta: 'Form · Rate · Progress',
            to: '/ui-library',
            routeNames: ['ui-library-challenge'],
          },
          { label: 'Vite Quality', meta: 'lint · build · 배포', to: '/vite', routeNames: ['vite-quality'] },
        ],
      },
    ],
  },
  {
    id: 'hands-on',
    label: 'Hands-on',
    description: '배운 개념을 하나의 날씨 서비스로 연결하며 컴포넌트와 라우팅을 익혀보세요.',
    sections: [
      {
        title: 'Weather 프로젝트',
        items: [
          {
            label: 'Weather Components',
            meta: 'Props · Emits · Slot',
            to: '/components/weather',
            routeNames: ['components-weather'],
          },
          {
            label: 'Weather Dashboard',
            meta: '검색 · 즐겨찾기 · 예보',
            to: '/hands-on/weather',
            routeNames: ['hands-on-weather'],
          },
          {
            label: 'Weather Router',
            meta: '동적 경로 · 네비게이션',
            to: '/weather',
            routeNames: ['weather-home', 'weather-detail', 'weather-about'],
          },
        ],
      },
    ],
  },
]

function toggleMenu(id) {
  openMenu.value = openMenu.value === id ? null : id
}

function closeMenu() {
  openMenu.value = null
}

function isGroupActive(group) {
  return group.sections.some((section) => section.items.some((item) => item.routeNames.includes(route.name)))
}

function handleDocumentPointerDown(event) {
  if (!(event.target instanceof Element) || !event.target.closest('.nav-group')) {
    closeMenu()
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    :class="[
      'app-shell',
      {
        'app-shell--weather': route.name === 'hands-on-weather',
        'app-shell--weather-router': ['weather-home', 'weather-detail', 'weather-about'].includes(route.name),
      },
    ]"
  >
    <header class="site-header">
      <RouterLink class="brand" to="/">
        <span class="brand-mark" aria-hidden="true">V</span>
        <span>
          <strong>SKALA-VUE</strong>
          <small>Vue Syntax practice</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="학습 메뉴">
        <div v-for="group in navGroups" :key="group.id" class="nav-group">
          <button
            :id="`nav-trigger-${group.id}`"
            class="nav-menu-trigger"
            :class="{ active: isGroupActive(group) }"
            type="button"
            :aria-expanded="openMenu === group.id"
            :aria-controls="`nav-panel-${group.id}`"
            aria-haspopup="true"
            @click="toggleMenu(group.id)"
          >
            <span class="nav-trigger-dot" aria-hidden="true"></span>
            <span>{{ group.label }}</span>
            <svg class="nav-chevron" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="m4 6 4 4 4-4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.7"
              />
            </svg>
          </button>

          <Transition name="nav-menu">
            <div
              v-if="openMenu === group.id"
              :id="`nav-panel-${group.id}`"
              class="nav-menu-panel"
              :class="`nav-menu-panel--${group.id}`"
              role="region"
              :aria-labelledby="`nav-trigger-${group.id}`"
            >
              <div class="nav-menu-panel-intro">
                <div>
                  <h2>{{ group.label }}</h2>
                </div>
                <p>{{ group.description }}</p>
              </div>

              <div class="nav-menu-columns">
                <section v-for="section in group.sections" :key="section.title" class="nav-menu-section">
                  <h3>{{ section.title }}</h3>
                  <div class="nav-menu-list">
                    <RouterLink
                      v-for="item in section.items"
                      :key="item.to"
                      class="nav-menu-item"
                      :to="item.to"
                      @click="closeMenu"
                    >
                      <span class="nav-menu-item-indicator" aria-hidden="true"></span>
                      <span class="nav-menu-item-copy">
                        <strong>{{ item.label }}</strong>
                        <small>{{ item.meta }}</small>
                      </span>
                      <svg class="nav-menu-item-arrow" viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M3 8h9m-4-4 4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                        />
                      </svg>
                    </RouterLink>
                  </div>
                </section>
              </div>
            </div>
          </Transition>
        </div>

        <span class="nav-divider" aria-hidden="true"></span>
        <RouterLink class="nav-utility-link" to="/curriculum">전체 커리큘럼</RouterLink>
      </nav>
    </header>

    <main
      :class="[
        'app-main',
        {
          'app-main--weather': route.name === 'hands-on-weather',
          'app-main--weather-router': ['weather-home', 'weather-detail', 'weather-about'].includes(route.name),
        },
      ]"
    >
      <RouterView />
    </main>

    <footer class="site-footer">
      <span>Code Challenge · Vue Syntax</span>
      <span>Vue 3 Composition API</span>
    </footer>
  </div>
</template>
