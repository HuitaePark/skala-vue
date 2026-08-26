<script setup>
import { ref } from 'vue'

const message = ref('안녕하세요!')
const cloakMessage = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')
const count = ref(1)
const name = ref('홍길동')
const age = ref(20)
</script>

<template>
  <div class="practice-section advanced-practice">
    <p class="section-kicker">PDF pages 89~92</p>
    <h2>v-pre / v-cloak / v-once / v-memo</h2>

    <div class="advanced-block">
      <h3>v-pre 디렉티브 학습</h3>
      <p>일반 출력: {{ message }}</p>
      <p v-pre>v-pre 출력: {{ message }}</p>
    </div>

    <div v-cloak class="advanced-block">
      <h3>v-cloak 디렉티브 학습</h3>
      <p>{{ cloakMessage }}</p>
    </div>

    <div class="advanced-block">
      <h3>v-once 디렉티브 학습</h3>
      <p>일반 변수 (실시간): {{ count }}</p>
      <p v-once>v-once 변수 (최초 고정): {{ count }}</p>
      <button type="button" @click="count++">숫자 증가 버튼</button>
    </div>

    <div class="advanced-block">
      <h3>v-memo 디렉티브 학습</h3>
      <div v-memo="[name]" class="memo-box">
        <p>📦 v-memo 적용 영역 (기준: name)</p>
        <p>이름: {{ name }}</p>
        <p>나이: {{ age }} (name이 바뀌어야 얘도 갱신됨)</p>
      </div>
      <button type="button" @click="name = '이순신'">1. 이름 변경 (이순신)</button>
      <button type="button" @click="age++">2. 나이 한 살 추가 (age++)</button>
    </div>
  </div>
</template>
