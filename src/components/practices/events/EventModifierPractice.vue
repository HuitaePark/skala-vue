<script setup>
import { ref } from 'vue'

const preventMessage = ref('링크를 눌러도 페이지가 이동하지 않습니다.')
const bubbleLog = ref([])
const onceCount = ref(0)
const overlayOpen = ref(true)
const overlayMessage = ref('회색 배경을 직접 클릭하면 닫힙니다.')
const keyModifierMessage = ref('Enter 또는 Esc를 눌러 보세요.')
const systemModifierMessage = ref('Ctrl + 클릭을 기다리는 중입니다.')
const mouseModifierMessage = ref('마우스 수식어를 기다리는 중입니다.')
const captureLog = ref('capture 단계 이벤트를 기다리는 중입니다.')

function handlePrevent() {
  preventMessage.value = 'prevent 적용: 기본 링크 이동이 차단되었습니다.'
}

function addBubbleLog(message) {
  bubbleLog.value = [...bubbleLog.value, message].slice(-4)
}

function resetBubbleLog() {
  bubbleLog.value = []
}

function resetOnce() {
  onceCount.value = 0
}

function closeOverlay() {
  overlayOpen.value = false
  overlayMessage.value = 'self 적용: 배경을 직접 클릭해서 닫혔습니다.'
}

function clickOverlayContent() {
  overlayMessage.value = '안쪽 콘텐츠 클릭: self 때문에 닫히지 않았습니다.'
}

function resetOverlay() {
  overlayOpen.value = true
  overlayMessage.value = '회색 배경을 직접 클릭하면 닫힙니다.'
}

function handleEnter() {
  keyModifierMessage.value = 'enter 적용: Enter 키 입력을 처리했습니다.'
}

function handleEscape() {
  keyModifierMessage.value = 'esc 적용: Escape 키 입력을 처리했습니다.'
}

function handleCaptureParent() {
  captureLog.value = 'capture: 부모 리스너가 자식보다 먼저 실행되었습니다.'
}

function handleCaptureChild() {
  captureLog.value = '자식 click: capture 이후 자식 핸들러가 실행되었습니다.'
}
</script>

<template>
  <section class="practice-section event-practice modifier-practice">
    <p class="section-kicker">101~104쪽 · Event Modifier</p>
    <h2>이벤트 수식어로 기본 동작 제어하기</h2>
    <p>
      수식어는 이벤트 리스너의 동작을 간결하게 보완합니다. <code>@click.prevent</code>는
      <code>e.preventDefault()</code>와 같은 역할을 합니다.
    </p>

    <pre class="code-sample" v-pre><code>v-on:submit.prevent="onSubmit"

&lt;a href="https://www.naver.com" @click.prevent="handleLink"&gt;네이버 링크&lt;/a&gt;
&lt;div @click="handleBox"&gt;
  &lt;button @click.stop="handleChild"&gt;버블링 차단&lt;/button&gt;
&lt;/div&gt;

&lt;button @click.once="submitSurvey"&gt;한 번만 실행&lt;/button&gt;
&lt;div @click.self="closeOverlay"&gt;배경을 직접 클릭할 때만 실행&lt;/div&gt;</code></pre>

    <div class="modifier-grid">
      <div class="event-demo-card">
        <h3>1) .prevent · 기본 동작 막기</h3>
        <a href="https://www.naver.com" @click.prevent="handlePrevent">이동하지 않는 링크</a>
        <p class="event-feedback">{{ preventMessage }}</p>
      </div>

      <div class="event-demo-card">
        <h3>2) .stop · 이벤트 버블링 막기</h3>
        <div class="bubble-parent" @click="addBubbleLog('부모 click 실행')">
          <p>부모 영역을 클릭하면 부모 로그가 남습니다.</p>
          <button type="button" @click="addBubbleLog('일반 자식 click 실행')">버블링 발생 버튼</button>
          <button type="button" @click.stop="addBubbleLog('.stop 자식 click 실행')">버블링 차단 버튼</button>
        </div>
        <button type="button" @click="resetBubbleLog">로그 초기화</button>
        <ul v-if="bubbleLog.length" class="output-list">
          <li v-for="(line, index) in bubbleLog" :key="`${line}-${index}`">{{ line }}</li>
        </ul>
      </div>

      <div class="event-demo-card">
        <h3>3) .once · 최초 1회만 실행</h3>
        <p>실행 횟수: <strong>{{ onceCount }}</strong></p>
        <button type="button" :disabled="onceCount > 0" @click.once="onceCount++">한 번만 증가</button>
        <button type="button" @click="resetOnce">초기화</button>
      </div>

      <div class="event-demo-card">
        <h3>4) .self · 자기 자신을 클릭할 때만</h3>
        <div v-if="overlayOpen" class="event-overlay" @click.self="closeOverlay">
          <div class="event-overlay-content" @click="clickOverlayContent">안쪽 콘텐츠</div>
        </div>
        <p class="event-feedback">{{ overlayMessage }}</p>
        <button type="button" @click="resetOverlay">배경 다시 열기</button>
      </div>
    </div>

    <div class="modifier-demo-row">
      <div class="event-demo-card">
        <h3>키보드 수식어</h3>
        <input type="text" placeholder="Enter / Esc 입력" @keyup.enter="handleEnter" @keyup.esc="handleEscape" />
        <p class="event-feedback">{{ keyModifierMessage }}</p>
      </div>
      <div class="event-demo-card">
        <h3>시스템 수식어</h3>
        <button type="button" @click.ctrl.exact="systemModifierMessage = 'ctrl.exact: Ctrl만 누르고 클릭했습니다.'">Ctrl + 클릭</button>
        <p class="event-feedback">{{ systemModifierMessage }}</p>
      </div>
      <div class="event-demo-card">
        <h3>마우스 수식어</h3>
        <button type="button" @click.right.prevent="mouseModifierMessage = '.right.prevent: 우클릭을 처리했습니다.'">우클릭</button>
        <button type="button" @click.middle="mouseModifierMessage = '.middle: 휠 클릭을 처리했습니다.'">휠 클릭</button>
        <p class="event-feedback">{{ mouseModifierMessage }}</p>
      </div>
    </div>

    <div class="event-capture-card event-demo-card">
      <h3>.capture · 이벤트 캡처링 단계</h3>
      <div class="capture-parent" @click.capture="handleCaptureParent">
        <button type="button" @click="handleCaptureChild">부모 capture → 자식 click</button>
      </div>
      <p class="event-feedback">{{ captureLog }}</p>
    </div>

    <div class="event-reference-table modifier-table" role="region" aria-label="이벤트 수식어 목록">
      <div class="event-reference-row event-reference-head"><span>수식어</span><span>동작</span></div>
      <div class="event-reference-row"><code>.prevent</code><span>기본 동작 방지</span></div>
      <div class="event-reference-row"><code>.stop</code><span>이벤트 버블링 차단</span></div>
      <div class="event-reference-row"><code>.once</code><span>최초 1회 실행 후 리스너 제거</span></div>
      <div class="event-reference-row"><code>.self</code><span>자기 자신을 직접 클릭했을 때만 실행</span></div>
      <div class="event-reference-row"><code>.capture / .passive</code><span>캡처링 단계에서 감지 / 스크롤 성능 최적화</span></div>
      <div class="event-reference-row"><code>.enter .tab .delete .esc .space</code><span>키보드 키 수식어</span></div>
      <div class="event-reference-row"><code>.ctrl .alt .shift .meta .exact</code><span>시스템 보조키 조합</span></div>
      <div class="event-reference-row"><code>.left .right .middle</code><span>마우스 버튼 수식어</span></div>
    </div>
  </section>
</template>
