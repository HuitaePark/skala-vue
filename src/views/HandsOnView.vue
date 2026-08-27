<script setup>
import { useRouter } from 'vue-router'
import WeatherDashboard from '@/components/practices/hands-on/WeatherParent.vue'

const router = useRouter()

function openDetail(city) {
  router.push({
    name: 'weather-detail',
    params: { cityId: city.id },
    query: { q: city.apiQuery ?? city.name },
  })
}
</script>

<template>
  <div class="weather-final-page">
    <div class="weather-page">
      <WeatherDashboard detail-mode="route" @click-detail="openDetail" />
    </div>
  </div>
</template>

<style scoped>
.weather-final-page {
  width: 100%;
  min-width: 0;
  background: #eef0f7;
}
</style>
