<script setup>
import { useCounterStore } from '@/stores/counter.js'
import SampleOne from '@/components/practices/basic/SampleOne.vue'
import SampleTwo from '@/components/practices/basic/SampleTwo.vue'

const counterStore = useCounterStore()
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">Dev Setup · Composition API</p>
      <h1>반응성 데이터와 텍스트 보간법</h1>
      <p>
        PDF 66~71페이지의 SampleOne.vue와 SampleTwo.vue 소스를 기준으로 작성한 기초 문법
        실습입니다. 각 버튼을 눌러 일반 변수와 <code>ref()</code>의 차이를 확인해 보세요.
      </p>
    </section>

    <div class="practice-stack">
      <SampleOne />
      <SampleTwo />

      <section class="practice-section pinia-practice">
        <p class="section-kicker">Pinia 연결 확인</p>
        <h2>Counter Store 활용 실습</h2>
        <p>원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong></p>
        <p>2배 연산 데이터(getters): <strong>{{ counterStore.doubleCount }}</strong></p>
        <button type="button" @click="counterStore.increment">숫자 1 증가 (actions)</button>
      </section>
    </div>

    <RouterLink class="next-link secondary-link" to="/composition">Composition API 상세 실습으로 이동 →</RouterLink>
    <RouterLink class="next-link" to="/directives">Vue Directive 실습으로 이동 →</RouterLink>
  </div>
</template>
