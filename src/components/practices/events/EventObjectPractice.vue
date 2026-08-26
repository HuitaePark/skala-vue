<script setup>
import { ref } from 'vue'

const position = ref('아직 좌표를 읽지 않았습니다.')
const targetInfo = ref('아직 대상 태그를 확인하지 않았습니다.')
const eventInfo = ref('이벤트를 기다리는 중입니다.')
const keyboardInfo = ref('키보드 입력을 기다리는 중입니다.')

function getOnlyEvent(event) {
  position.value = `좌표: X=${event.clientX}, Y=${event.clientY}`
  eventInfo.value = `type=${event.type}, button=${event.button}`
}

function getWithParam(name, event) {
  targetInfo.value = `대상: ${name} / 클릭된 태그: ${event.target.tagName}`
  eventInfo.value = `listener가 걸린 태그: ${event.currentTarget.tagName}`
}

function readKeyboardEvent(event) {
  keyboardInfo.value = `key=${event.key}, code=${event.code}, shiftKey=${event.shiftKey}`
}
</script>

<template>
  <section class="practice-section event-practice">
    <p class="section-kicker">97~100쪽 · JavaScript Event Object</p>
    <h2>이벤트 객체와 <code>$event</code> 전달</h2>
    <p>
      브라우저는 이벤트가 발생할 때 <code>target</code>, <code>currentTarget</code>,
      <code>type</code>, 좌표와 키보드 정보가 담긴 Event Object를 자동으로 전달합니다.
    </p>

    <pre class="code-sample" v-pre><code>const getOnlyEvent = (e) =&gt; {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}
const getWithParam = (name, e) =&gt; {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}

&lt;button @click="getOnlyEvent"&gt;이벤트 자동 전달&lt;/button&gt;
&lt;button @click="getWithParam('회원A', $event)"&gt;$event 명시 전달&lt;/button&gt;</code></pre>

    <div class="event-demo-grid">
      <div class="event-demo-card event-coordinate-card">
        <h3>1) 이벤트 객체 자동 전달</h3>
        <p>{{ position }}</p>
        <p>{{ eventInfo }}</p>
        <button type="button" @click="getOnlyEvent">클릭 좌표 알아내기</button>
      </div>
      <div class="event-demo-card">
        <h3>2) 함수 인자와 $event</h3>
        <p>{{ targetInfo }}</p>
        <p>{{ eventInfo }}</p>
        <button type="button" @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
      </div>
    </div>

    <div class="event-demo-card event-capture-card">
      <h3>키보드 Event Object</h3>
      <label>
        <span>키를 눌러 key / code / modifier를 확인하세요.</span>
        <input type="text" @keydown="readKeyboardEvent" />
      </label>
      <p class="event-feedback">{{ keyboardInfo }}</p>
    </div>

    <div class="event-properties-grid">
      <div><code>e.target</code><span>이벤트를 발생시킨 실제 HTML 태그</span></div>
      <div><code>e.currentTarget</code><span>이벤트 리스너가 걸린 HTML 태그</span></div>
      <div><code>e.type</code><span>click, keyup, submit 등 이벤트 종류</span></div>
      <div><code>e.clientX / e.clientY</code><span>브라우저 viewport 기준 마우스 좌표</span></div>
      <div><code>e.key / e.code</code><span>누른 문자와 물리적 키 위치</span></div>
      <div><code>e.shiftKey / e.ctrlKey</code><span>보조키를 함께 눌렀는지 여부</span></div>
    </div>

    <div class="event-methods-list">
      <div><code>e.preventDefault()</code><span>태그의 기본 동작 중지</span></div>
      <div><code>e.stopPropagation()</code><span>부모로 올라가는 이벤트 버블링 중지</span></div>
      <div><code>e.stopImmediatePropagation()</code><span>현재 태그의 다른 리스너까지 중지</span></div>
    </div>
  </section>
</template>
