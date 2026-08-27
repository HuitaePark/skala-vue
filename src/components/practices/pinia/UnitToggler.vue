<script setup>
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler" aria-label="온도 단위 설정">
    <span class="unit-toggler-label">단위</span>
    <strong>{{ configStore.unitSymbol }}</strong>
    <button type="button" class="unit-toggler-button" @click="configStore.toggleUnit">
      {{ configStore.unit === 'celsius' ? '°F로 보기' : '°C로 보기' }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  min-height: 33px;
  padding: 4px 5px 4px 9px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #dfe8e8;
  border-radius: 9px;
  color: #61717a;
  background: #fff;
  font-size: 10px;
  white-space: nowrap;
}

.unit-toggler-label {
  color: #9aa7ad;
  font-weight: 700;
}

.unit-toggler strong {
  color: #287550;
  font-size: 11px;
}

.unit-toggler-button {
  min-height: 25px;
  padding: 4px 8px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: #2f9368;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.unit-toggler-button:hover {
  background: #24734f;
}
</style>
