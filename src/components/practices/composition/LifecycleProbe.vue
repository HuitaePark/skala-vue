<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, onBeforeUpdate, onUnmounted, onUpdated, ref } from 'vue'

defineProps({
  signal: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['lifecycle', 'timer-tick'])

const timerTick = ref(0)
let timerId = null

function report(hook, detail) {
  emit('lifecycle', {
    id: `${hook}-${Date.now()}-${Math.random()}`,
    hook,
    detail,
    time: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  })
}

onBeforeMount(() => {
  report('onBeforeMount()', 'DOM에 연결되기 전 컴포넌트를 준비합니다.')
})

onMounted(() => {
  report('onMounted()', 'DOM 연결 완료 · 3초 타이머를 시작했습니다.')
  timerId = window.setInterval(() => {
    timerTick.value += 1
    emit('timer-tick', timerTick.value)
  }, 3000)
})

onBeforeUpdate(() => {
  report('onBeforeUpdate()', '반응형 값 변경으로 DOM 갱신을 준비합니다.')
})

onUpdated(() => {
  report('onUpdated()', 'DOM 갱신이 완료되었습니다.')
})

onBeforeUnmount(() => {
  report('onBeforeUnmount()', '컴포넌트 제거 직전 타이머를 정리합니다.')
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
})

onUnmounted(() => {
  report('onUnmounted()', '컴포넌트가 제거되었고 리소스 정리가 끝났습니다.')
})
</script>

<template>
  <div class="lifecycle-probe">
    <div class="lifecycle-probe-status">
      <span class="lifecycle-probe-dot" aria-hidden="true"></span>
      <span>LifecycleProbe mounted</span>
    </div>
    <p class="lifecycle-probe-title">컴포넌트가 화면에 살아 있습니다.</p>
    <div class="lifecycle-probe-values">
      <span
        ><small>부모 update signal</small><strong>{{ signal }}</strong></span
      >
      <span
        ><small>3초 timer tick</small><strong>{{ timerTick }}</strong></span
      >
    </div>
    <p class="lifecycle-probe-note">부모 값을 변경하면 업데이트 훅이, 숨기면 언마운트 훅이 실행됩니다.</p>
  </div>
</template>
