<script setup>
import { computed, ref } from 'vue'

const text1 = ref('')
const text2 = ref('')
const comment = ref('')
const isAgreed = ref(false)
const favoriteFruits = ref([])
const gender = ref('')
const selectedCar = ref('')

const formState = computed(() => ({
  comment: comment.value,
  isAgreed: isAgreed.value,
  favoriteFruits: favoriteFruits.value,
  gender: gender.value,
  selectedCar: selectedCar.value,
}))
</script>

<template>
  <section class="practice-section form-practice">
    <p class="section-kicker">106~109쪽 · Form Data Binding</p>
    <h2>v-model 양방향 데이터 바인딩</h2>
    <p>
      <code>v-model</code>은 HTML 입력 요소와 Vue의 반응성 데이터를 연결합니다. 입력값이 바뀌면
      상태가 바뀌고, 상태가 바뀌면 입력 화면도 함께 업데이트됩니다.
    </p>

    <pre class="code-sample" v-pre><code>const text1 = ref('')
const text2 = ref('')

&lt;input v-model="text1" placeholder="여기에 입력하세요" /&gt;
&lt;input :value="text2" @input="(e) =&gt; (text2 = e.target.value)" /&gt;</code></pre>

    <div class="form-demo-grid">
      <div class="form-demo-card">
        <h3>1) v-model 축약 문법 (양방향)</h3>
        <input v-model="text1" type="text" placeholder="여기에 입력하세요" />
        <p>입력된 값: <strong>{{ text1 || '아직 입력 없음' }}</strong></p>
      </div>
      <div class="form-demo-card">
        <h3>2) 내부 동작 원리 (단방향 + 이벤트)</h3>
        <input :value="text2" type="text" placeholder="원리 파악용 입력창" @input="text2 = $event.target.value" />
        <p>입력된 값: <strong>{{ text2 || '아직 입력 없음' }}</strong></p>
      </div>
    </div>

    <div class="form-demo-card form-elements-card">
      <h3>모든 HTML Form 요소와 v-model 매핑</h3>

      <div class="form-element-grid">
        <label class="form-field form-field-wide">
          <span>1) Textarea (장문 텍스트)</span>
          <textarea v-model="comment" rows="3" placeholder="의견을 남겨주세요"></textarea>
          <small>데이터 상태: {{ comment || '아직 입력 없음' }}</small>
        </label>

        <fieldset class="form-field">
          <legend>2) 단일 Checkbox (동의 여부)</legend>
          <label class="choice-label"><input v-model="isAgreed" type="checkbox" /> 약관에 동의합니다.</label>
          <small>데이터 상태: {{ isAgreed }}</small>
        </fieldset>

        <fieldset class="form-field">
          <legend>3) 다중 Checkbox (배열 저장)</legend>
          <div class="choice-list">
            <label class="choice-label"><input v-model="favoriteFruits" type="checkbox" value="사과" /> 사과</label>
            <label class="choice-label"><input v-model="favoriteFruits" type="checkbox" value="바나나" /> 바나나</label>
            <label class="choice-label"><input v-model="favoriteFruits" type="checkbox" value="딸기" /> 딸기</label>
          </div>
          <small>데이터 상태: {{ favoriteFruits.length ? favoriteFruits.join(', ') : '선택 없음' }}</small>
        </fieldset>

        <fieldset class="form-field">
          <legend>4) Radio (단일 선택)</legend>
          <div class="choice-list">
            <label class="choice-label"><input v-model="gender" type="radio" value="남성" /> 남성</label>
            <label class="choice-label"><input v-model="gender" type="radio" value="여성" /> 여성</label>
          </div>
          <small>데이터 상태: {{ gender || '선택 없음' }}</small>
        </fieldset>

        <label class="form-field">
          <span>5) Select (드롭다운)</span>
          <select v-model="selectedCar">
            <option value="">-- 선택하세요 --</option>
            <option value="tesla">테슬라</option>
            <option value="hyundai">현대자동차</option>
            <option value="bmw">BMW</option>
          </select>
          <small>데이터 상태: {{ selectedCar || '선택 없음' }}</small>
        </label>
      </div>

      <details class="form-state-details">
        <summary>현재 form 상태 전체 보기</summary>
        <pre class="form-state-output"><code>{{ JSON.stringify(formState, null, 2) }}</code></pre>
      </details>
    </div>
  </section>
</template>
