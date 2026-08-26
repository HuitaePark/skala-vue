<script setup>
import LifecyclePractice from '@/components/practices/composition/LifecyclePractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 152~155 · Code Challenge</p>
      <h1>Code Challenge · Component Lifecycle</h1>
      <p>
        컴포넌트 생성·마운트·업데이트·언마운트 흐름을 실제 Hook 로그로 확인합니다.
        타이머가 시작되고 정리되는 과정을 직접 조작해 보세요.
      </p>
    </section>

    <LifecyclePractice />

    <RouterLink class="next-link secondary-link" to="/composition/challenge">Computed &amp; Watchers로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/components/props">Props &amp; Emits로 이동 →</RouterLink>
  </div>
</template>
