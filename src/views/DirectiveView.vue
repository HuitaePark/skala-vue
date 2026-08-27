<script setup>
import VAdvancedPractice from '@/components/practices/directives/VAdvancedPractice.vue'
import VBindBasicPractice from '@/components/practices/directives/VBindBasicPractice.vue'
import VBindClassPractice from '@/components/practices/directives/VBindClassPractice.vue'
import VBindShorthandPractice from '@/components/practices/directives/VBindShorthandPractice.vue'
import VBindStylePractice from '@/components/practices/directives/VBindStylePractice.vue'
import VForPractice from '@/components/practices/directives/VForPractice.vue'
import VHtmlPractice from '@/components/practices/directives/VHtmlPractice.vue'
import VHtmlXssPractice from '@/components/practices/directives/VHtmlXssPractice.vue'
import VIfPractice from '@/components/practices/directives/VIfPractice.vue'
import VShowPractice from '@/components/practices/directives/VShowPractice.vue'
import VTextPractice from '@/components/practices/directives/VTextPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">Code Challenge · Vue Directive</p>
      <h1>Vue Directive</h1>
      <p>
        PDF 73~92페이지의 소스코드를 실습 컴포넌트로 분리했습니다. 각 영역을 독립적으로 확인하며 directive의 동작 차이를
        비교해 보세요.
      </p>
    </section>

    <div class="practice-stack">
      <VHtmlPractice />
      <VHtmlXssPractice />
      <VTextPractice />
      <VBindBasicPractice />
      <VBindClassPractice />
      <VBindStylePractice />
      <VBindShorthandPractice />
      <VIfPractice />
      <VShowPractice />
      <VForPractice />
      <VAdvancedPractice />
    </div>

    <RouterLink class="next-link secondary-link" to="/events">Vue Event Handling으로 이동 →</RouterLink>
  </div>
</template>
