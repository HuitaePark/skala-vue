<script setup>
import EventHandlerPractice from '@/components/practices/events/EventHandlerPractice.vue'
import EventModifierPractice from '@/components/practices/events/EventModifierPractice.vue'
import EventObjectPractice from '@/components/practices/events/EventObjectPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 93~105 · Vue Event Handling</p>
      <h1>Vue Event Handling</h1>
      <p>
        이벤트 리스너 연결부터 메서드 핸들러, Event Object, 이벤트 수식어까지 강의 소스코드를
        실행 가능한 예제로 구성했습니다. 버튼·입력·키보드·마우스 동작을 직접 확인해 보세요.
      </p>
    </section>

    <div class="practice-stack">
      <EventHandlerPractice />
      <EventObjectPractice />
      <EventModifierPractice />
    </div>

    <RouterLink class="next-link" to="/forms">Vue Form Handling으로 이동 →</RouterLink>
  </div>
</template>
