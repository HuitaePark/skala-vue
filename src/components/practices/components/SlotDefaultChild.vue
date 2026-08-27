<script setup>
defineProps({
  fallbackText: {
    type: String,
    default: '부모가 슬롯을 전달하지 않아 기본 콘텐츠를 보여줍니다.',
  },
})
</script>

<template>
  <article class="slot-child-card">
    <span class="slot-child-label">CHILD COMPONENT</span>
    <div class="slot-child-content">
      <slot>
        <span class="slot-fallback">{{ fallbackText }}</span>
      </slot>
    </div>
  </article>
</template>
