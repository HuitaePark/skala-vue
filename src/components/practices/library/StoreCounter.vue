<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter.js'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <div class="store-counter">
    <div class="store-counter-value">
      <span>state · count</span><strong>{{ count }}</strong>
    </div>
    <div class="store-counter-value">
      <span>getter · doubleCount</span><strong>{{ doubleCount }}</strong>
    </div>
    <button type="button" @click="increment">increment action 실행</button>
  </div>
</template>

<style scoped>
.store-counter {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.store-counter-value {
  padding: 15px;
  border-radius: 10px;
  background: #f2faf6;
}
.store-counter-value span {
  display: block;
  color: #6e818a;
  font-size: 11px;
}
.store-counter-value strong {
  display: block;
  margin-top: 5px;
  color: #287550;
  font-size: 28px;
}
.store-counter button {
  grid-column: 1 / -1;
  width: fit-content;
}
@media (max-width: 460px) {
  .store-counter {
    grid-template-columns: 1fr;
  }
  .store-counter button {
    grid-column: auto;
  }
}
</style>
