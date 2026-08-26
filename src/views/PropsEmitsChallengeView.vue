<script setup>
import PropsEmitsPractice from '@/components/practices/components/PropsEmitsPractice.vue'
</script>

<template>
  <div class="page-shell">
    <section class="page-intro">
      <p class="eyebrow">PDF 156~172 · Code Challenge</p>
      <h1>Code Challenge · Props &amp; Emits</h1>
      <p>
        defineProps()로 부모 데이터를 자식에게 전달하고, defineEmits()로 자식 이벤트를 부모에게
        보내는 Vue 컴포넌트 데이터 흐름을 직접 실행해 보세요.
      </p>
    </section>

    <PropsEmitsPractice />

    <RouterLink class="next-link secondary-link" to="/composition/lifecycle">Component Lifecycle로 이동 →</RouterLink>
  </div>
</template>
