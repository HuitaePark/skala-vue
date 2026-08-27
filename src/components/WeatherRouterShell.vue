<script setup>
import UnitToggler from '@/components/practices/pinia/UnitToggler.vue'
</script>

<template>
  <div class="weather-router-page">
    <header class="weather-router-header">
      <RouterLink class="weather-router-brand" to="/weather">
        <span class="weather-router-brand-icon" aria-hidden="true">🌤️</span>
        <span>
          <strong>Weather Desk</strong>
          <small>Vue Router hands-on</small>
        </span>
      </RouterLink>

      <div class="weather-router-actions">
        <UnitToggler />
        <nav class="weather-router-nav" aria-label="날씨 메뉴">
          <RouterLink to="/weather">날씨 대시보드</RouterLink>
          <RouterLink to="/weather/about">서비스 소개</RouterLink>
        </nav>
      </div>
    </header>

    <main class="weather-router-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.weather-router-page {
  width: min(1120px, calc(100% - 40px));
  min-height: 100%;
  margin: 0 auto;
  padding: 28px 0 48px;
}

.weather-router-header {
  min-height: 58px;
  padding-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid #e2e7ec;
}

.weather-router-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #263944;
  text-decoration: none;
}

.weather-router-brand-icon {
  width: 33px;
  height: 33px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #eaf6ff;
  font-size: 19px;
}

.weather-router-brand > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.weather-router-brand strong {
  font-size: 15px;
  letter-spacing: -0.02em;
}

.weather-router-brand small {
  color: #7a8992;
  font-size: 10px;
}

.weather-router-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.weather-router-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.weather-router-nav a {
  padding: 8px 10px;
  border-radius: 8px;
  color: #71818a;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.weather-router-nav a:hover,
.weather-router-nav a.router-link-exact-active {
  color: #287550;
  background: #eaf8f1;
}

.weather-router-content {
  padding-top: 24px;
}

@media (max-width: 560px) {
  .weather-router-page {
    width: min(100% - 28px, 1120px);
    padding-top: 18px;
  }

  .weather-router-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-router-nav {
    width: 100%;
  }

  .weather-router-actions {
    width: 100%;
    align-items: stretch;
    flex-direction: column;
  }

  .weather-router-actions :deep(.unit-toggler) {
    align-self: flex-start;
  }

  .weather-router-nav a {
    flex: 1;
    text-align: center;
  }
}
</style>
