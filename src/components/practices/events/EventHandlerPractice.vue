<script setup>
import { ref } from 'vue'

const count = ref(0)
const handlerMessage = ref('아직 메서드 핸들러가 실행되지 않았습니다.')
const lastEvent = ref('없음')
const inputValue = ref('')
const selectedValue = ref('click')
const keyMessage = ref('키보드 이벤트를 기다리는 중입니다.')
const hoverMessage = ref('마우스를 올려 보세요.')
const submitMessage = ref('폼을 제출하면 이곳에 결과가 표시됩니다.')

function recordEvent(name) {
  lastEvent.value = name
}

function handleClick() {
  handlerMessage.value = '함수가 성공적으로 호출되었습니다!'
  recordEvent('click')
}

function handleInput(event) {
  inputValue.value = event.target.value
  recordEvent('input')
}

function handleKey(event) {
  keyMessage.value = `${event.type}: ${event.key} (${event.code})`
  recordEvent(event.type)
}

function handleChange() {
  recordEvent('change')
}

function handleSubmit() {
  submitMessage.value = `제출 완료: ${inputValue.value || '입력값 없음'}`
  recordEvent('submit')
}
</script>

<template>
  <section class="practice-section event-practice">
    <p class="section-kicker">94~96쪽 · v-on Event Handler</p>
    <h2>v-on 기본 문법과 이벤트 핸들러</h2>
    <p>
      <code>v-on:click</code>의 축약형은 <code>@click</code>입니다. 짧은 인라인 연산은 템플릿에서,
      복잡한 로직은 <code>&lt;script setup&gt;</code>의 메서드로 분리합니다.
    </p>

    <pre class="code-sample" v-pre><code>&lt;button v-on:click="count++"&gt;클릭&lt;/button&gt;
&lt;button @click="count++"&gt;클릭&lt;/button&gt;

function handleClick() {
  // 복잡한 로직은 메서드로 분리
}
&lt;button @click="handleClick"&gt;클릭하세요&lt;/button&gt;</code></pre>

    <div class="event-demo-grid">
      <div class="event-demo-card">
        <h3>1) 인라인 연산 처리</h3>
        <p>현재 카운트: <strong>{{ count }}</strong></p>
        <button type="button" @click="count++">1씩 증가</button>
      </div>

      <div class="event-demo-card">
        <h3>2) 스크립트 함수 호출</h3>
        <p class="event-feedback">{{ handlerMessage }}</p>
        <button type="button" @click="handleClick">핸들러 실행</button>
      </div>
    </div>

    <div class="event-demo-card event-observer-card">
      <h3>주요 이벤트 확인</h3>
      <div class="event-observer-grid">
        <label>
          input
          <input :value="inputValue" type="text" placeholder="입력 이벤트" @input="handleInput" @keydown="handleKey" @keyup="handleKey" />
        </label>
        <label>
          change
          <select v-model="selectedValue" @change="handleChange">
            <option value="click">click</option>
            <option value="submit">submit</option>
            <option value="input">input</option>
          </select>
        </label>
      </div>
      <p>마지막 이벤트: <strong>{{ lastEvent }}</strong></p>
      <p>키보드 상태: <strong>{{ keyMessage }}</strong></p>
      <div class="event-hover-target" @mouseenter="hoverMessage = 'mouseenter: 요소 안으로 들어왔습니다.'" @mouseleave="hoverMessage = 'mouseleave: 요소 밖으로 나갔습니다.'">
        {{ hoverMessage }}
      </div>
      <form class="event-form" @submit.prevent="handleSubmit">
        <input :value="inputValue" type="text" readonly aria-label="제출할 입력값" />
        <button type="submit">submit 이벤트 실행</button>
      </form>
      <p class="event-feedback">{{ submitMessage }}</p>
    </div>

    <div class="event-reference-table" role="region" aria-label="주요 이벤트 목록">
      <div class="event-reference-row event-reference-head"><span>이벤트</span><span>설명</span></div>
      <div class="event-reference-row"><code>click</code><span>클릭 이벤트</span></div>
      <div class="event-reference-row"><code>submit</code><span>폼 제출 이벤트</span></div>
      <div class="event-reference-row"><code>keyup / keydown</code><span>키를 뗐을 때 / 눌렀을 때</span></div>
      <div class="event-reference-row"><code>input / change</code><span>입력 필드 변경 / 값 변경 후 포커스 아웃</span></div>
      <div class="event-reference-row"><code>mouseenter / mouseleave</code><span>요소 위로 들어옴 / 요소에서 벗어남</span></div>
    </div>
  </section>
</template>
