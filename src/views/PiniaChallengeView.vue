<script setup>
import { computed } from 'vue'
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import UnitToggler from '@/components/practices/pinia/UnitToggler.vue'
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()
const unit = computed(() => configStore.unit)
const unitSymbol = computed(() => configStore.unitSymbol)
const unitLabel = computed(() => (unit.value === 'celsius' ? '섭씨' : '화씨'))
</script>

<template>
  <div class="page-shell pinia-page">
    <section class="page-intro">
      <p class="eyebrow">PDF 198~212 · Pinia &amp; Hands-on</p>
      <h1>Pinia Store로 공유 상태 관리</h1>
      <p>
        전역 store를 등록하고 state·getter·action을 컴포넌트에서 사용하는 흐름입니다.
        <code>storeToRefs()</code>로 state와 getter의 반응성을 유지하고, 날씨 화면의 온도 단위를 여러 라우트에서 함께
        바꿔 보세요.
      </p>
    </section>

    <div class="pinia-grid">
      <section class="practice-section">
        <p class="section-kicker">Code Challenge · counter store</p>
        <h2>state · getters · actions</h2>
        <StoreCounter />
        <pre class="code-sample" v-pre><code>const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore</code></pre>
      </section>

      <section class="practice-section pinia-unit-card">
        <p class="section-kicker">Hands-on · Weather Store</p>
        <h2>날씨 단위 설정 store</h2>
        <p>
          현재 설정: <strong>{{ unitLabel }} ({{ unitSymbol }})</strong>
        </p>
        <UnitToggler />
        <p class="pinia-unit-note">이 설정은 Weather Router 메인·상세 화면의 온도 표시에 즉시 반영됩니다.</p>
        <pre class="code-sample" v-pre><code>const unit = ref('celsius')
const unitSymbol = computed(() =&gt; unit.value === 'fahrenheit' ? '°F' : '°C')
function toggleUnit() { /* celsius ↔ fahrenheit */ }</code></pre>
      </section>
    </div>

    <section class="practice-section pinia-concepts">
      <p class="section-kicker">핵심 개념</p>
      <h2>Pinia에서 놓치기 쉬운 지점</h2>
      <div class="pinia-concept-list">
        <article>
          <strong>1. 앱에 Pinia 등록</strong>
          <p><code>app.use(createPinia())</code>를 mount 전에 한 번 등록합니다.</p>
        </article>
        <article>
          <strong>2. 반응성 보존</strong>
          <p>state/getter를 구조 분해할 때는 <code>storeToRefs()</code>를 사용합니다.</p>
        </article>
        <article>
          <strong>3. action 호출</strong>
          <p>action은 store에서 구조 분해해도 함수 동작을 유지합니다.</p>
        </article>
        <article>
          <strong>4. 인증 확장</strong>
          <p>실서비스에서는 auth store와 라우터 가드로 JWT 로그인 상태를 보호합니다.</p>
        </article>
      </div>
    </section>

    <RouterLink class="next-link secondary-link" to="/weather">Weather Router에서 단위 전환 확인 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/axios">Axios API 실습으로 이동 →</RouterLink>
  </div>
</template>

<style scoped>
.pinia-page {
  width: min(980px, 100%);
}
.pinia-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.pinia-unit-card :deep(.unit-toggler) {
  margin-top: 12px;
}
.pinia-unit-note {
  color: var(--muted);
  font-size: 12px;
}
.pinia-concepts {
  margin-top: 20px;
}
.pinia-concept-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.pinia-concept-list article {
  padding: 14px;
  border: 1px solid #dce7eb;
  border-radius: 9px;
  background: #fbfdfd;
}
.pinia-concept-list strong {
  color: #2c5162;
  font-size: 13px;
}
.pinia-concept-list p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
@media (max-width: 760px) {
  .pinia-grid,
  .pinia-concept-list {
    grid-template-columns: 1fr;
  }
}
</style>
