<script setup>
import FormBindingPractice from '@/components/practices/forms/FormBindingPractice.vue'
import VModelModifiersPractice from '@/components/practices/forms/VModelModifiersPractice.vue'
import VueStylePractice from '@/components/practices/forms/VueStylePractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 106~115 · Vue Form Handling</p>
      <h1>Vue Form Handling &amp; Style</h1>
      <p>
        v-model 양방향 바인딩부터 HTML form 요소별 매핑, v-model 수식어와 SFC 스타일 범위까지 강의 코드 예제를 직접
        실행해 보세요.
      </p>
    </section>

    <div class="practice-stack">
      <FormBindingPractice />
      <VModelModifiersPractice />
      <VueStylePractice />
    </div>

    <RouterLink class="next-link" to="/hands-on/weather">Hands-on Weather Mockup으로 이동 →</RouterLink>
  </div>
</template>
