<script setup>
import CompositionApiPractice from '@/components/practices/composition/CompositionApiPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 127~144 · Code Challenge</p>
      <h1>Code Challenge Composition API</h1>
      <p>
        Computed &amp; Watchers 예제만 따로 모았습니다. computed, watch, Multi-Source Watch,
        Deep Watch, reactive 반응형 데이터, watchEffect를 각각 실행해 보세요.
      </p>
    </section>

    <CompositionApiPractice :challenge-only="true" />

    <RouterLink class="next-link secondary-link" to="/hands-on/weather">Weather Mockup으로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/composition/lifecycle">Component Lifecycle로 이동 →</RouterLink>
  </div>
</template>
