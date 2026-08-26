<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div :class="['app-shell', { 'app-shell--weather': route.name === 'hands-on-weather' }]">
    <header class="site-header">
      <RouterLink class="brand" to="/">
        <span class="brand-mark" aria-hidden="true">V</span>
        <span>
          <strong>SKALA-VUE</strong>
          <small>Vue Syntax practice</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="주요 메뉴">
        <RouterLink to="/curriculum">전체 범위</RouterLink>
        <RouterLink to="/">기초 문법</RouterLink>
        <RouterLink to="/composition">Composition API</RouterLink>
        <RouterLink to="/composition/challenge">Code Challenge</RouterLink>
        <RouterLink to="/composition/lifecycle">Lifecycle</RouterLink>
        <RouterLink to="/events">Event Handling</RouterLink>
        <RouterLink to="/forms">Form &amp; Style</RouterLink>
        <RouterLink to="/hands-on/weather">Weather</RouterLink>
        <RouterLink to="/directives">Vue Directive</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main :class="['app-main', { 'app-main--weather': route.name === 'hands-on-weather' }]">
      <RouterView />
    </main>

    <footer class="site-footer">
      <span>Code Challenge · Vue Syntax</span>
      <span>Vue 3 Composition API</span>
    </footer>
  </div>
</template>
