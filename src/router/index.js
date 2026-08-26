import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
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
import PropsEmitsChallengeView from '@/views/PropsEmitsChallengeView.vue'
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
