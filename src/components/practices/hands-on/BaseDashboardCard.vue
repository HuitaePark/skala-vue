<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <article class="weather-base-card">
    <div v-if="eyebrow || title || $slots.meta" class="weather-panel-heading">
      <div>
        <p v-if="eyebrow" class="weather-card-label">{{ eyebrow }}</p>
        <h3 v-if="title">{{ title }}</h3>
      </div>
      <span v-if="$slots.meta"><slot name="meta" /></span>
    </div>
    <slot />
  </article>
</template>

<style scoped>
.weather-base-card {
  min-width: 0;
  padding: 21px;
  border: 1px solid var(--weather-line, #e8eaf2);
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(46, 52, 86, 0.04);
}

.weather-panel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.weather-card-label {
  margin: 0 0 8px;
  color: #7b83a0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.weather-panel-heading h3 {
  margin: 0;
  color: var(--weather-ink, #202438);
  font-size: 18px;
  letter-spacing: -0.03em;
}

.weather-panel-heading > span {
  color: #9aa0b1;
  font-size: 11px;
}

</style>
