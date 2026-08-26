<script setup>
const id = 'user-profile-card'
const src = 'https://vuejs.org/images/logo.png'
</script>

<template>
  <div class="practice-section">
    <p class="section-kicker">PDF page 83</p>
    <h2>v-bind 디렉티브 고급 (단축 문법)</h2>
    <p><code>v-bind:src="src"</code> → <code>:src="src"</code> → <code>:src</code></p>
    <div class="shorthand-box" :id>
      <img :src alt="Vue 로고" class="vue-logo small" />
      <span>same-name shorthand로 id와 src를 연결했습니다.</span>
    </div>
  </div>
</template>
