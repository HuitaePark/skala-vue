<script setup>
import { useConfigStore } from '@/stores/configStore.js'
import { toDisplayTemperature } from '@/utils/temperature.js'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: 'location',
  },
  selected: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite'])
const configStore = useConfigStore()

function displayTemperature(value) {
  return toDisplayTemperature(value, configStore.unit)
}

function selectCard() {
  emit('select-card', props.city)
}

function showDetail() {
  emit('click-detail', props.city)
}

function toggleFavorite(event) {
  event.stopPropagation()
  emit('toggle-favorite', props.city)
}
</script>

<template>
  <article v-if="props.variant === 'current'" class="weather-current-card">
    <div class="weather-current-topline">
      <div>
        <p class="weather-card-label">CURRENT CONDITIONS</p>
        <h3>{{ props.city.name }}</h3>
        <p class="weather-current-region">{{ props.city.region }} · {{ props.city.status }}</p>
      </div>
      <button
        type="button"
        class="weather-favorite-button"
        :class="{ active: props.favorite }"
        :aria-pressed="props.favorite"
        :aria-label="props.favorite ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'"
        @click="toggleFavorite"
      >
        {{ props.favorite ? '★' : '☆' }}
      </button>
    </div>

    <div class="weather-current-reading">
      <span class="weather-current-icon" aria-hidden="true">{{ props.city.icon }}</span>
      <div>
        <strong
          >{{ displayTemperature(props.city.temp) }}<sup>{{ configStore.unitSymbol }}</sup></strong
        >
        <span v-if="props.city.temp >= 25" class="weather-condition-pill warm">Warm &amp; bright</span>
        <span v-else class="weather-condition-pill cool">Cool &amp; calm</span>
      </div>
    </div>

    <p class="weather-current-description">{{ props.city.description }}</p>
    <div class="weather-high-low">
      <span
        >Feels like <strong>{{ displayTemperature(props.city.feelsLike) }}{{ configStore.unitSymbol }}</strong></span
      ><span
        >H <strong>{{ displayTemperature(props.city.high) }}{{ configStore.unitSymbol }}</strong></span
      ><span
        >L <strong>{{ displayTemperature(props.city.low) }}{{ configStore.unitSymbol }}</strong></span
      ><span
        >Rain <strong>{{ props.city.precipitation }}</strong></span
      >
    </div>

    <div class="weather-hourly-heading"><span>Next 6 hours</span><small>Local time</small></div>
    <div class="weather-hourly-list">
      <div v-for="hour in props.city.forecast" :key="`${props.city.id}-${hour.day}`" class="weather-hourly-item">
        <span>{{ hour.day }}</span>
        <span class="weather-hourly-icon" aria-hidden="true">{{ hour.icon }}</span>
        <strong>{{ displayTemperature(hour.temp) }}{{ configStore.unitSymbol }}</strong>
        <small>{{ hour.rain }}% rain</small>
      </div>
    </div>
  </article>

  <article
    v-else
    class="weather-location-row"
    :class="{ selected: props.selected }"
    tabindex="0"
    @click="selectCard"
    @keydown.enter="selectCard"
    @keydown.space.prevent="selectCard"
  >
    <span class="weather-location-icon" aria-hidden="true">{{ props.city.icon }}</span>
    <div class="weather-location-name">
      <strong>{{ props.city.name }}</strong
      ><span
        >{{ props.city.status }} · {{ displayTemperature(props.city.low) }}{{ configStore.unitSymbol }} /
        {{ displayTemperature(props.city.high) }}{{ configStore.unitSymbol }}</span
      >
    </div>
    <strong class="weather-location-temp">{{ displayTemperature(props.city.temp) }}{{ configStore.unitSymbol }}</strong>
    <button
      type="button"
      class="weather-location-favorite"
      :class="{ active: props.favorite }"
      :aria-label="props.favorite ? `${props.city.name} 즐겨찾기 해제` : `${props.city.name} 즐겨찾기 추가`"
      @click="toggleFavorite"
    >
      {{ props.favorite ? '★' : '☆' }}
    </button>
    <button type="button" class="weather-location-action" @click.stop="showDetail">View</button>
  </article>
</template>

<style scoped>
.weather-current-card {
  min-width: 0;
  padding: 24px;
  overflow: hidden;
  position: relative;
  border-radius: 17px;
  color: #fff;
  background: linear-gradient(140deg, #555fe2 0%, #7869e5 100%);
  box-shadow: 0 12px 24px rgba(87, 91, 211, 0.24);
}

.weather-current-card::after {
  position: absolute;
  right: -42px;
  bottom: -78px;
  width: 220px;
  height: 220px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 50%;
  box-shadow:
    0 0 0 20px rgba(255, 255, 255, 0.04),
    0 0 0 42px rgba(255, 255, 255, 0.03);
  content: '';
  pointer-events: none;
}

.weather-current-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.weather-current-card .weather-card-label {
  color: rgba(255, 255, 255, 0.65);
}

.weather-current-card h3 {
  margin: 0;
  color: #fff;
  font-size: 26px;
  letter-spacing: -0.04em;
}

.weather-current-region {
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
}

.weather-favorite-button {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.1);
  font-size: 19px;
  line-height: 1;
  cursor: pointer;
}

.weather-favorite-button.active {
  color: #ffe8a8;
  background: rgba(255, 232, 168, 0.16);
}

.weather-current-reading {
  margin-top: 26px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.weather-current-icon {
  font-size: 51px;
  line-height: 1;
  filter: drop-shadow(0 7px 9px rgba(24, 28, 90, 0.2));
}

.weather-current-reading strong {
  display: block;
  color: #fff;
  font-size: 62px;
  font-weight: 500;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.weather-current-reading sup {
  margin-left: 3px;
  font-size: 25px;
  font-weight: 500;
  vertical-align: top;
}

.weather-condition-pill {
  margin-top: 9px;
  padding: 5px 9px;
  display: inline-flex;
  border-radius: 999px;
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  font-size: 11px;
  font-weight: 800;
}

.weather-condition-pill.warm {
  color: #fff1bf;
}
.weather-condition-pill.cool {
  color: #d9e9ff;
}

.weather-current-description {
  max-width: 42ch;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 13px;
  line-height: 1.6;
}

.weather-high-low {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 11px;
}

.weather-high-low strong {
  color: rgba(255, 255, 255, 0.92);
}

.weather-hourly-heading {
  margin-top: 27px;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  font-weight: 800;
}

.weather-hourly-heading small {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
}

.weather-hourly-list {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 7px;
}

.weather-hourly-item {
  min-width: 0;
  padding: 9px 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  border-radius: 9px;
  color: rgba(255, 255, 255, 0.57);
  background: rgba(255, 255, 255, 0.07);
  font-size: 10px;
}

.weather-hourly-item:first-child {
  color: #fff;
  background: rgba(255, 255, 255, 0.17);
}

.weather-hourly-icon {
  font-size: 17px;
}
.weather-hourly-item strong {
  color: #fff;
  font-size: 12px;
}
.weather-hourly-item small {
  color: rgba(255, 255, 255, 0.52);
  font-size: 8px;
  white-space: nowrap;
}

.weather-location-list {
  margin-top: 17px;
  display: grid;
  gap: 7px;
}

.weather-location-row {
  min-width: 0;
  padding: 10px 9px;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto 21px 35px;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 11px;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.weather-location-row:hover,
.weather-location-row:focus-visible,
.weather-location-row.selected {
  border-color: #e0e2fb;
  background: #f6f6ff;
}

.weather-location-icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #f4f5fb;
  font-size: 17px;
}

.weather-location-name {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.weather-location-name strong {
  color: var(--weather-ink, #202438);
  font-size: 12px;
}
.weather-location-name span {
  overflow: hidden;
  color: #9aa0b1;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.weather-location-temp {
  color: #4b526a;
  font-size: 15px;
  font-weight: 700;
}

.weather-location-favorite {
  padding: 0;
  border: 0;
  color: #b8bdcd;
  background: transparent;
  font-size: 15px;
  cursor: pointer;
}

.weather-location-favorite.active {
  color: #e8b94b;
}

.weather-location-action {
  min-height: 24px;
  padding: 3px 6px;
  border: 0;
  border-radius: 6px;
  color: #6268d9;
  background: #eeefff;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 480px) {
  .weather-current-card {
    padding: 17px;
  }
  .weather-current-reading strong {
    font-size: 53px;
  }
  .weather-current-icon {
    font-size: 42px;
  }
  .weather-hourly-list {
    gap: 3px;
  }
  .weather-hourly-item {
    padding-inline: 2px;
  }
  .weather-location-row {
    grid-template-columns: 30px minmax(0, 1fr) auto 20px;
  }
  .weather-location-action {
    grid-column: 2 / -1;
    justify-self: start;
  }
}
</style>
