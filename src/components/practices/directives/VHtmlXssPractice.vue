<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value
}
</script>

<template>
  <div class="practice-section security-practice">
    <p class="section-kicker">PDF page 75</p>
    <h2>v-html XSS 학습</h2>
    <p class="warning-copy">
      학습용으로만 확인하세요. 외부 사용자 입력을 검증 없이 <code>v-html</code>에 넣으면
      스크립트가 실행될 수 있습니다.
    </p>
    <label class="sr-only" for="xss-input">HTML 입력</label>
    <input id="xss-input" v-model="inputValue" placeholder="내용을 입력하세요" />
    <button type="button" @click="showMessage">확인</button>
    <div class="html-result" v-html="message"></div>
    <p class="hint-copy">
      테스트 문자열 예시: <code>&lt;img src="x" onerror="alert('XSS')" /&gt;</code>
    </p>
  </div>
</template>
