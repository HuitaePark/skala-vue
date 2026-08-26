<script setup>
import { ref } from 'vue'

const textColor = ref('purple')
const boxWidth = ref(150)
const baseBoxStyle = ref({
  height: '100px',
  backgroundColor: '#42b883',
  transition: 'all 0.3s ease',
})
</script>

<template>
  <div class="practice-section">
    <p class="section-kicker">PDF page 81</p>
    <h2>v-bind 디렉티브 고급 (스타일 바인딩)</h2>
    <h3>1) 인라인 스타일 변수 조작 (객체 형식)</h3>
    <p :style="{ color: textColor, fontWeight: 'bold' }">이 글자의 색상은 실시간으로 바뀝니다.</p>
    <button type="button" @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">
      글자 색상 토글
    </button>
    <br />
    <h3>2) 다중 스타일 객체 조립 (배열 형식)</h3>
    <label for="box-width">박스 가로 크기(px): </label>
    <input id="box-width" v-model.number="boxWidth" type="number" step="50" />
    <br />
    <div class="style-box" :style="[baseBoxStyle, { width: boxWidth + 'px' }]">
      <p>가로 크기: {{ boxWidth }}px 박스</p>
    </div>
  </div>
</template>
