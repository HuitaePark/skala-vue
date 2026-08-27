<script setup>
import { computed, ref } from 'vue'
import LifecycleProbe from './LifecycleProbe.vue'

const lifecycleStages = [
  {
    phase: 'Creation',
    title: '생성',
    description: 'setup()에서 반응형 상태와 함수를 준비합니다.',
    hooks: 'setup()',
  },
  {
    phase: 'Mounting',
    title: '부착',
    description: '컴포넌트가 실제 DOM에 연결되는 과정입니다.',
    hooks: 'onBeforeMount → onMounted',
  },
  {
    phase: 'Updating',
    title: '갱신',
    description: '반응형 데이터가 바뀌어 DOM이 다시 그려지는 과정입니다.',
    hooks: 'onBeforeUpdate → onUpdated',
  },
  {
    phase: 'Unmounting',
    title: '소멸',
    description: '화면에서 제거되기 전 타이머와 리스너를 정리합니다.',
    hooks: 'onBeforeUnmount → onUnmounted',
  },
]

const lifecycleHooks = [
  { phase: '생성 전', hook: 'setup()', description: '반응형 상태와 컴포넌트 로직을 초기화합니다.' },
  { phase: '마운트 전', hook: 'onBeforeMount()', description: 'DOM에 연결되기 직전에 실행합니다.' },
  { phase: '마운트 완료', hook: 'onMounted()', description: 'DOM 접근, API 요청, 타이머 시작에 사용합니다.' },
  {
    phase: '업데이트 전',
    hook: 'onBeforeUpdate()',
    description: '반응형 데이터 변경으로 DOM이 갱신되기 전 실행합니다.',
  },
  { phase: '업데이트 후', hook: 'onUpdated()', description: 'DOM 업데이트가 완료된 뒤 실행합니다.' },
  { phase: '언마운트 전', hook: 'onBeforeUnmount()', description: '컴포넌트 제거 직전에 정리 작업을 준비합니다.' },
  { phase: '언마운트 완료', hook: 'onUnmounted()', description: '타이머·이벤트 리스너 정리 완료를 확인합니다.' },
]

const showProbe = ref(true)
const updateSignal = ref(0)
const timerTickCount = ref(0)
const lifecycleLogs = ref([])
const lastHook = ref('onMounted() 로그를 기다리는 중입니다.')

const lifecycleState = computed(() => (showProbe.value ? 'mounted' : 'unmounted'))
const lifecycleStateLabel = computed(() =>
  showProbe.value ? 'Mounted · 화면에 표시 중' : 'Unmounted · 화면에서 제거됨',
)

function recordLifecycle(entry) {
  lastHook.value = `${entry.hook} · ${entry.detail}`
  lifecycleLogs.value = [entry, ...lifecycleLogs.value].slice(0, 12)
}

function increaseUpdateSignal() {
  updateSignal.value += 1
}

function toggleProbe() {
  showProbe.value = !showProbe.value
}

function remountProbe() {
  showProbe.value = false
  window.setTimeout(() => {
    showProbe.value = true
  }, 0)
}

function clearLifecycleLogs() {
  lifecycleLogs.value = []
  lastHook.value = '로그를 초기화했습니다. 다음 훅 실행을 기다리는 중입니다.'
}
</script>

<template>
  <div class="lifecycle-practice-stack">
    <section class="practice-section lifecycle-overview">
      <p class="section-kicker">152~153쪽 · Component Lifecycle</p>
      <h2>컴포넌트 생명주기 단계와 Hook</h2>
      <p>
        Vue 컴포넌트는 생성·부착·갱신·소멸 단계를 거칩니다. 각 단계의 Hook을 이용하면 DOM이 준비되는 시점, 반응형 값이
        갱신되는 시점, 타이머를 정리해야 하는 시점을 제어할 수 있습니다.
      </p>

      <div class="lifecycle-stage-grid">
        <article v-for="stage in lifecycleStages" :key="stage.phase" class="lifecycle-stage-card">
          <span class="lifecycle-stage-phase">{{ stage.phase }}</span>
          <h3>{{ stage.title }}</h3>
          <p>{{ stage.description }}</p>
          <code>{{ stage.hooks }}</code>
        </article>
      </div>

      <div class="lifecycle-hook-table" role="region" aria-label="Lifecycle Hook 목록">
        <div class="lifecycle-hook-row lifecycle-hook-head"><span>단계</span><span>Hook</span><span>설명</span></div>
        <div v-for="item in lifecycleHooks" :key="item.hook" class="lifecycle-hook-row">
          <span>{{ item.phase }}</span>
          <code>{{ item.hook }}</code>
          <span>{{ item.description }}</span>
        </div>
      </div>
    </section>

    <section class="practice-section lifecycle-challenge-practice">
      <p class="section-kicker">154~155쪽 · Code Challenge</p>
      <h2>Component Lifecycle Hook 실습</h2>
      <p>
        아래 자식 컴포넌트는 마운트될 때 3초 타이머를 시작하고, 부모 값이 바뀌면 업데이트 Hook을 기록합니다. 컴포넌트를
        숨기면 <code>onBeforeUnmount()</code>에서 타이머를 정리합니다.
      </p>

      <pre class="code-sample" v-pre><code>onMounted(() =&gt; {
  timerId = setInterval(() =&gt; count.value++, 3000)
})

onUpdated(() =&gt; {
  console.log('DOM 업데이트 완료')
})

onUnmounted(() =&gt; {
  clearInterval(timerId)
})</code></pre>

      <div class="lifecycle-demo-grid">
        <article class="lifecycle-live-card">
          <div class="lifecycle-card-heading">
            <div>
              <span class="lifecycle-card-label">LIVE COMPONENT</span>
              <h3>LifecycleProbe</h3>
            </div>
            <span class="lifecycle-state" :class="`is-${lifecycleState}`">{{ lifecycleStateLabel }}</span>
          </div>

          <div class="lifecycle-probe-frame">
            <LifecycleProbe
              v-if="showProbe"
              :signal="updateSignal"
              @lifecycle="recordLifecycle"
              @timer-tick="timerTickCount = $event"
            />
            <div v-else class="lifecycle-empty-state">
              <strong>컴포넌트가 언마운트되었습니다.</strong>
              <span>다시 표시하면 onBeforeMount → onMounted 순서가 시작됩니다.</span>
            </div>
          </div>

          <div class="lifecycle-control-row">
            <button type="button" @click="increaseUpdateSignal">부모 값 변경 (update)</button>
            <button type="button" @click="toggleProbe">{{ showProbe ? '컴포넌트 숨기기' : '컴포넌트 보이기' }}</button>
            <button type="button" @click="remountProbe">언마운트 후 다시 마운트</button>
          </div>

          <div class="lifecycle-live-stats">
            <span
              ><small>부모 update signal</small><strong>{{ updateSignal }}</strong></span
            >
            <span
              ><small>timer tick</small><strong>{{ timerTickCount }}</strong></span
            >
          </div>
        </article>

        <aside class="lifecycle-log-card">
          <div class="lifecycle-card-heading">
            <div>
              <span class="lifecycle-card-label">HOOK TIMELINE</span>
              <h3>실행 로그</h3>
            </div>
            <button type="button" class="lifecycle-clear-button" @click="clearLifecycleLogs">초기화</button>
          </div>
          <p class="lifecycle-last-hook" aria-live="polite">{{ lastHook }}</p>
          <ol v-if="lifecycleLogs.length" class="lifecycle-log-list">
            <li v-for="entry in lifecycleLogs" :key="entry.id">
              <span class="lifecycle-log-hook">{{ entry.hook }}</span>
              <span class="lifecycle-log-detail">{{ entry.detail }}</span>
              <time>{{ entry.time }}</time>
            </li>
          </ol>
          <p v-else class="lifecycle-log-empty">컴포넌트 Hook 로그가 여기에 표시됩니다.</p>
        </aside>
      </div>
    </section>

    <section class="practice-section composition-challenge lifecycle-check-section">
      <p class="section-kicker">Code Challenge 완료 기준</p>
      <h2>Lifecycle Hook 체크리스트</h2>
      <div class="challenge-checklist">
        <span>✓ onBeforeMount() / onMounted()</span>
        <span>✓ onBeforeUpdate() / onUpdated()</span>
        <span>✓ onBeforeUnmount() / onUnmounted()</span>
        <span>✓ setInterval 타이머 시작</span>
        <span>✓ 컴포넌트 제거 시 타이머 정리</span>
        <span>✓ Hook 실행 순서 로그 확인</span>
      </div>
    </section>
  </div>
</template>
