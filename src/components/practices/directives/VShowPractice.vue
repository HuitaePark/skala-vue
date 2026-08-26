<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
</script>

<template>
  <div class="practice-section">
    <p class="section-kicker">PDF page 85</p>
    <h2>v-show 디렉티브 학습</h2>
    <button type="button" @click="isVisible = !isVisible">화면 토글하기</button>
    <br />
    <div v-show="isVisible" class="show-box">
      <p>v-show 상자</p>
      <p>조건이 false가 되면 CSS display: none이 붙습니다.</p>
    </div>
  </div>
</template>
