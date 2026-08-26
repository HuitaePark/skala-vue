<script setup>
const props = defineProps({
  query: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search a city or region',
  },
})

const emit = defineEmits(['update-query', 'clear-query'])

function updateQuery(event) {
  emit('update-query', event.target.value)
}

function clearQuery() {
  emit('clear-query')
}
</script>

<template>
  <label class="weather-dashboard-search" for="weather-city-search">
    <span aria-hidden="true">⌕</span>
    <span class="sr-only">도시 검색</span>
    <input
      id="weather-city-search"
      type="text"
      :value="props.query"
      :placeholder="props.placeholder"
      @input="updateQuery"
    />
    <button v-if="props.query" type="button" aria-label="검색어 지우기" @click="clearQuery">×</button>
  </label>
</template>

<style scoped>
.weather-dashboard-search {
  width: min(100%, 410px);
  min-height: 42px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid var(--weather-line, #e8eaf2);
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 5px 14px rgba(46, 52, 86, 0.04);
}

.weather-dashboard-search > span:first-child {
  color: #8b91a7;
  font-size: 24px;
  line-height: 1;
}

.weather-dashboard-search input {
  width: 100%;
  min-height: 38px;
  padding: 5px 0;
  border: 0;
  outline: 0;
  color: var(--weather-ink, #202438);
  background: transparent;
  font-size: 13px;
}

.weather-dashboard-search input::placeholder {
  color: #a1a7b7;
}

.weather-dashboard-search button {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  color: #747b91;
  background: #f0f1f6;
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
}
</style>
