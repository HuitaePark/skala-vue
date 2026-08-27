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
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update-query', 'clear-query', 'submit-query'])

function updateQuery(event) {
  emit('update-query', event.target.value)
}

function clearQuery() {
  emit('clear-query')
}

function submitQuery() {
  emit('submit-query', props.query)
}
</script>

<template>
  <form class="weather-dashboard-search" role="search" @submit.prevent="submitQuery">
    <svg class="weather-search-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.7" />
      <path d="m13 13 4 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
    </svg>
    <label class="sr-only" for="weather-city-search">도시 검색</label>
    <input
      id="weather-city-search"
      type="text"
      :value="props.query"
      :placeholder="props.placeholder"
      @input="updateQuery"
    />
    <button
      v-if="props.query"
      type="button"
      class="weather-search-clear"
      aria-label="검색어 지우기"
      @click="clearQuery"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="m4 4 8 8m0-8-8 8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6" />
      </svg>
    </button>
    <button type="submit" class="weather-search-submit" :disabled="props.loading">
      {{ props.loading ? '조회 중' : '실시간 조회' }}
    </button>
  </form>
</template>

<style scoped>
.weather-dashboard-search {
  width: min(100%, 500px);
  min-height: 46px;
  padding: 4px 5px 4px 12px;
  display: grid;
  align-items: center;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  gap: 9px;
  border: 1px solid var(--weather-line, #e8eaf2);
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 5px 14px rgba(46, 52, 86, 0.04);
}

.weather-search-icon {
  flex: 0 0 auto;
  width: 19px;
  height: 19px;
  color: #8b91a7;
}

.weather-dashboard-search input {
  width: 100%;
  min-width: 0;
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

.weather-search-clear {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 8px;
  color: #747b91;
  background: #f0f1f6;
  cursor: pointer;
}

.weather-search-clear svg {
  width: 15px;
  height: 15px;
  display: block;
  margin: auto;
}

.weather-search-submit {
  width: auto;
  min-width: 88px;
  min-height: 36px;
  height: auto;
  padding: 7px 11px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: var(--weather-accent, #6268ef);
  font-size: 10px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
}

.weather-search-submit:hover:not(:disabled) {
  background: var(--weather-accent-dark, #4d53d4);
}

@media (max-width: 480px) {
  .weather-dashboard-search {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .weather-search-submit {
    width: 100%;
    min-height: 42px;
    grid-column: 1 / -1;
  }
}
</style>
