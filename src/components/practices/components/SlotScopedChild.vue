<script setup>
defineProps({
  message: {
    type: String,
    default: '자식이 준비한 슬롯 데이터',
  },
  count: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <article class="slot-child-card slot-scoped-child">
    <span class="slot-child-label">CHILD COMPONENT</span>
    <slot :message="message" :count="count" :next-count="count + 1">
      <div class="slot-scoped-fallback">
        <strong>{{ message }}</strong>
        <span>현재 횟수 {{ count }}</span>
      </div>
    </slot>
  </article>
</template>
