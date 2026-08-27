import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import BasicPracticeView from '@/views/BasicPracticeView.vue'
import CompositionChallengeView from '@/views/CompositionChallengeView.vue'
import CompositionView from '@/views/CompositionView.vue'
import CurriculumView from '@/views/CurriculumView.vue'
import DirectiveView from '@/views/DirectiveView.vue'
import EventView from '@/views/EventView.vue'
import FormView from '@/views/FormView.vue'
import HandsOnView from '@/views/HandsOnView.vue'
import HomeView from '@/views/HomeView.vue'
import LifecycleChallengeView from '@/views/LifecycleChallengeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PiniaChallengeView from '@/views/PiniaChallengeView.vue'
import PropsEmitsChallengeView from '@/views/PropsEmitsChallengeView.vue'
import ViteQualityView from '@/views/ViteQualityView.vue'
import WeatherComponentsChallengeView from '@/views/WeatherComponentsChallengeView.vue'

const routes = [
  {
    path: '/curriculum',
    name: 'curriculum',
    component: CurriculumView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/basic',
    name: 'basic',
    component: BasicPracticeView,
  },
  {
    path: '/composition',
    name: 'composition',
    component: CompositionView,
  },
  {
    path: '/composition/challenge',
    name: 'composition-challenge',
    component: CompositionChallengeView,
  },
  {
    path: '/composition/lifecycle',
    name: 'composition-lifecycle',
    component: LifecycleChallengeView,
  },
  {
    path: '/components/props',
    name: 'components-props',
    component: PropsEmitsChallengeView,
  },
  {
    path: '/components/weather',
    name: 'components-weather',
    component: WeatherComponentsChallengeView,
  },
  {
    path: '/pinia',
    name: 'pinia-challenge',
    component: PiniaChallengeView,
  },
  {
    path: '/axios',
    name: 'axios-challenge',
    component: () => import('@/views/AxiosChallengeView.vue'),
  },
  {
    path: '/ui-library',
    name: 'ui-library-challenge',
    component: () => import('@/views/UiLibraryChallengeView.vue'),
  },
  {
    path: '/vite',
    name: 'vite-quality',
    component: ViteQualityView,
  },
  {
    path: '/directives',
    name: 'directives',
    component: DirectiveView,
  },
  {
    path: '/events',
    name: 'events',
    component: EventView,
  },
  {
    path: '/forms',
    name: 'forms',
    component: FormView,
  },
  {
    path: '/weather',
    name: 'weather-home',
    component: () => import('@/views/WeatherHomeView.vue'),
  },
  {
    path: '/weather/about',
    name: 'weather-about',
    component: () => import('@/views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import('@/views/WeatherDetailView.vue'),
  },
  {
    path: '/hands-on/weather',
    name: 'hands-on-weather',
    component: HandsOnView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
