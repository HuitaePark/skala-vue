import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Weather display preferences shared by the dashboard and detail route.
 * Keeping this state in Pinia lets sibling views react to the same unit toggle.
 */
export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const unitSymbol = computed(() => (unit.value === 'fahrenheit' ? '°F' : '°C'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  return { unit, unitSymbol, toggleUnit }
})
