<script setup>
import { computed, ref } from 'vue'

const lazyText = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')

const ageType = computed(() => typeof age.value)
const priceType = computed(() => typeof price.value)
</script>

<template>
  <section class="practice-section form-practice">
    <p class="section-kicker">110~112쪽 · v-model Modifiers</p>
    <h2>v-model 수식어</h2>
    <p>
      입력 요소의 동작이나 수집되는 데이터 형태를 쉽게 제어하는 문법입니다. 필요한 경우
      <code>.trim.number</code>처럼 수식어를 연결해서 사용할 수 있습니다.
    </p>

    <pre class="code-sample" v-pre><code>&lt;input v-model.lazy="lazyText" /&gt;
&lt;input v-model.number="age" /&gt;
&lt;input v-model.trim="userEmail" /&gt;
&lt;input v-model.trim.number="price" /&gt;</code></pre>

    <div class="form-modifier-grid">
      <div class="form-demo-card">
        <h3>1) .lazy (change 시점 반영)</h3>
        <input v-model.lazy="lazyText" type="text" placeholder="입력 후 Enter 또는 외부 클릭" />
        <p>
          실시간이 아닌 확정된 값: <strong>{{ lazyText || '아직 확정 없음' }}</strong>
        </p>
      </div>

      <div class="form-demo-card">
        <h3>2) .number (Number 자동 형변환)</h3>
        <input v-model.number="age" type="text" placeholder="나이를 입력하세요" />
        <p>
          입력된 값: <strong>{{ age || '아직 입력 없음' }}</strong>
        </p>
        <p>
          데이터 타입: <strong>{{ ageType }}</strong>
        </p>
      </div>

      <div class="form-demo-card">
        <h3>3) .trim (양끝 공백 제거)</h3>
        <input v-model.trim="userEmail" type="text" placeholder="앞뒤 공백을 포함해 입력" />
        <p>
          공백 제거된 값: <strong>{{ userEmail || '아직 입력 없음' }}</strong>
        </p>
        <p>
          문자열 길이: <strong>{{ userEmail.length }}</strong>
        </p>
      </div>

      <div class="form-demo-card">
        <h3>4) Chaining (.trim.number)</h3>
        <input v-model.trim.number="price" type="text" placeholder="공백과 숫자를 섞어 입력" />
        <p>
          처리된 값: <strong>{{ price || '아직 입력 없음' }}</strong>
        </p>
        <p>
          데이터 타입: <strong>{{ priceType }}</strong>
        </p>
      </div>
    </div>

    <div class="event-reference-table modifier-table" role="region" aria-label="v-model 수식어 목록">
      <div class="event-reference-row event-reference-head"><span>수식어</span><span>동작</span></div>
      <div class="event-reference-row"><code>.lazy</code><span>input 대신 change 시점에 반영</span></div>
      <div class="event-reference-row"><code>.number</code><span>입력값을 Number 타입으로 자동 변환</span></div>
      <div class="event-reference-row"><code>.trim</code><span>양끝 공백을 제거한 뒤 수집</span></div>
      <div class="event-reference-row"><code>.trim.number</code><span>수식어를 체이닝해서 순서대로 적용</span></div>
    </div>
  </section>
</template>
