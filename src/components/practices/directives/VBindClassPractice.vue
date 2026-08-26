<script setup>
import { ref } from 'vue'

const isWarning = ref(false)
const themeClass = ref('bg-dark')
</script>

<template>
  <div class="practice-section">
    <p class="section-kicker">PDF page 79</p>
    <h2>v-bind 디렉티브 고급 (클래스 바인딩)</h2>
    <h3>클래스 바인딩 (객체 형식)</h3>
    <p :class="{ 'text-danger': isWarning }">현재 경고 상태: {{ isWarning }}</p>
    <button type="button" @click="isWarning = !isWarning">경고 상태 토글</button>
    <br />
    <h3>클래스 바인딩 (배열 형식)</h3>
    <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">
      다중 클래스가 조립된 박스 구역입니다.
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  color: #dc2626;
  font-weight: bold;
}

.bg-dark {
  padding: 15px;
  color: white;
  background-color: #333;
}

.border-red {
  border: 3px solid #dc2626;
}

.border-gray {
  border: 3px solid #ccc;
}
</style>
