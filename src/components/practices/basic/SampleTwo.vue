<script setup>
const welcomeMessage = 'Welcome to Skala-Vue'
</script>

<template>
  <div class="practice-section">
    <p class="section-kicker">SampleTwo.vue · Text Interpolation Example</p>
    <h2>{{ welcomeMessage }}</h2>
    <p>{{ welcomeMessage.toUpperCase() }}</p>
    <p>{{ 'Random number: ' + Math.ceil(Math.random() * 100) }}</p>
  </div>
</template>
