<script setup>
import SlotPractice from '@/components/practices/components/SlotPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 173~177 · Code Challenge</p>
      <h1>Code Challenge · Component Slot</h1>
      <p>
        Default Slot, Named Slot, Scoped Slot을 각각 독립적인 예제로 실행합니다. 자식이 레이아웃을 소유하고 부모가
        콘텐츠를 주입하는 흐름과 slot props 전달을 확인해 보세요.
      </p>
    </section>

    <SlotPractice />

    <RouterLink class="next-link secondary-link" to="/components/props">Props &amp; Emits로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/components/weather"
      >Weather Component Hands-on으로 이동 →</RouterLink
    >
  </div>
</template>
