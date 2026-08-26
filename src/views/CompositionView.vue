<script setup>
import CompositionApiPractice from '@/components/practices/composition/CompositionApiPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 117~144 · Composition API</p>
      <h1>Composition API</h1>
      <p>
        ref와 reactive로 반응형 상태를 만들고 computed, watch, watchEffect로 파생 값과 변경
        흐름을 추적하는 Vue 3 Composition API 예제를 한 화면에서 실행해 보세요.
      </p>
    </section>

    <CompositionApiPractice />

    <RouterLink class="next-link secondary-link" to="/composition/challenge">Code Challenge Composition API로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/composition/lifecycle">Component Lifecycle로 이동 →</RouterLink>
    <RouterLink class="next-link" to="/hands-on/weather">Weather Mockup으로 이동 →</RouterLink>
  </div>
</template>
