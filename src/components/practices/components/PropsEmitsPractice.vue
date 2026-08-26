<script setup>
import { computed, ref, watch } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

const parentData = ref('안녕하세요, 자식 컴포넌트!')
const draftMessage = ref(parentData.value)
const parentLikes = ref(80)
const parentStatus = ref('대기 중')
const selectedItemId = ref('props')
const childVisible = ref(true)
const eventLogs = ref([])

const items = [
  { id: 'props', label: 'Props 전달' },
  { id: 'emit', label: 'Emit 이벤트' },
  { id: 'challenge', label: 'Challenge' },
]

const selectedItem = computed(() => items.find((item) => item.id === selectedItemId.value) ?? items[0])
const popularityLabel = computed(() => (parentLikes.value >= 100 ? '인기 데이터' : '좋아요를 모으는 중'))
const messageLength = computed(() => draftMessage.value.length)

watch(parentData, (nextValue, previousValue) => {
  addEventLog('watch(parentData)', `${previousValue} → ${nextValue}`)
})

watch(parentLikes, (nextValue, previousValue) => {
  addEventLog('watch(parentLikes)', `${previousValue} → ${nextValue}`)
})

function addEventLog(type, message) {
  eventLogs.value = [
    {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    },
    ...eventLogs.value,
  ].slice(0, 10)
}

function applyParentData() {
  const nextMessage = draftMessage.value.trim() || '빈 메시지 대신 기본값을 전달했습니다.'
  parentData.value = nextMessage
  parentStatus.value = '부모에서 전달됨'
  addEventLog('parent → child', `parentData 전달: ${nextMessage}`)
}

function increaseLikes() {
  parentLikes.value += 1
  parentStatus.value = '좋아요 업데이트'
}

function handleUpdateRequest(payload) {
  parentLikes.value = payload.nextLikes
  parentStatus.value = '자식 요청 반영 완료'
  addEventLog('child → parent', `update-request: ${payload.message}`)
}

function handleNotifyRequest(payload) {
  parentStatus.value = '자식 알림 수신'
  addEventLog('child → parent', `notify-request: ${payload.message}`)
}

function handleSelectItem(payload) {
  selectedItemId.value = payload.id
  parentStatus.value = `선택됨: ${payload.label}`
  addEventLog('child → parent', `select-item: ${payload.label}`)
}

function toggleChild() {
  childVisible.value = !childVisible.value
  parentStatus.value = childVisible.value ? '자식 컴포넌트 표시' : '자식 컴포넌트 숨김'
}

function clearEventLogs() {
  eventLogs.value = []
  parentStatus.value = '이벤트 로그 초기화'
}
</script>

<template>
  <div class="props-practice-stack">
    <section class="practice-section props-overview">
      <p class="section-kicker">156쪽 · Props &amp; Emits</p>
      <h2>부모와 자식 컴포넌트의 데이터 흐름</h2>
      <p>
        Props는 부모에서 자식으로 전달하는 반응형 데이터이고, Emits는 자식이 부모에게 사용자
        동작이나 변경 요청을 알리는 이벤트입니다. 아래 예제는 PDF의 단방향 데이터 흐름을 직접 실행합니다.
      </p>

      <div class="props-flow-grid">
        <article class="props-flow-card props-flow-down">
          <span class="props-flow-direction">Parent → Child</span>
          <h3>Props 전달</h3>
          <p>부모가 자식 태그의 속성으로 값을 내려보냅니다.</p>
          <code>&lt;Child :parent-data="message" /&gt;</code>
        </article>
        <article class="props-flow-card props-flow-up">
          <span class="props-flow-direction">Child → Parent</span>
          <h3>Emits 발생</h3>
          <p>자식이 사용자 동작을 커스텀 이벤트로 부모에게 올립니다.</p>
          <code>emit('update-request', payload)</code>
        </article>
      </div>
    </section>

    <section class="practice-section props-live-practice">
      <p class="section-kicker">157~164쪽 · defineProps()</p>
      <h2>defineProps()로 부모 데이터 받기</h2>
      <p>
        배열 문법과 객체 문법으로 Props를 선언하고, required·default·type 유효성 조건을 함께 확인합니다.
        자식 컴포넌트는 전달받은 Props를 읽기만 하며 직접 수정하지 않습니다.
      </p>

      <pre class="code-sample" v-pre><code>const props = defineProps({
  parentData: { type: String, required: true },
  likes: { type: Number, required: true },
  status: { type: String, default: '대기 중' }
})

// Props는 readonly이므로 자식에서 직접 변경하지 않습니다.</code></pre>

      <div class="props-live-grid">
        <article class="props-parent-card">
          <div class="props-card-heading">
            <div>
              <span class="props-card-label">PARENT COMPONENT</span>
              <h3>PropsEmitsPractice</h3>
            </div>
            <span class="props-parent-status">{{ parentStatus }}</span>
          </div>

          <label class="props-field">
            <span>parentData</span>
            <input v-model="draftMessage" type="text" @keyup.enter="applyParentData" />
          </label>
          <p class="props-field-hint">문자 수 {{ messageLength }} · Enter 또는 버튼으로 자식에게 전달</p>

          <div class="props-parent-controls">
            <button type="button" @click="applyParentData">Props 전달</button>
            <button type="button" @click="increaseLikes">likes +1</button>
            <button type="button" @click="toggleChild">{{ childVisible ? '자식 숨기기' : '자식 보이기' }}</button>
          </div>

          <div class="props-derived-grid">
            <span><small>likes</small><strong>{{ parentLikes }}</strong></span>
            <span><small>computed 상태</small><strong>{{ popularityLabel }}</strong></span>
            <span><small>선택 항목</small><strong>{{ selectedItem.label }}</strong></span>
          </div>

          <p class="props-readonly-note"><code>readonly</code> child Props · 부모 상태를 바꾸면 자식 화면이 함께 갱신됩니다.</p>
        </article>

        <PropsEmitsChild
          v-if="childVisible"
          :parent-data="parentData"
          :likes="parentLikes"
          :status="parentStatus"
          :items="items"
          :selected-id="selectedItemId"
          @update-request="handleUpdateRequest"
          @notify-request="handleNotifyRequest"
          @select-item="handleSelectItem"
        />
        <div v-else class="props-child-hidden">
          <strong>ChildComponent가 화면에서 제거되었습니다.</strong>
          <span>자식 보이기 버튼으로 다시 마운트하세요.</span>
        </div>
      </div>
    </section>

    <section class="practice-section emits-practice">
      <p class="section-kicker">165~168쪽 · defineEmits()</p>
      <h2>defineEmits()로 부모에게 이벤트 보내기</h2>
      <p>
        자식 카드의 버튼을 클릭하면 <code>update-request</code>, <code>notify-request</code>,
        <code>select-item</code> 이벤트가 부모 핸들러로 전달됩니다. 아래 로그에서 이벤트 이름과 Payload를 확인하세요.
      </p>

      <pre class="code-sample" v-pre><code>const emit = defineEmits(['update-request', 'notify-request'])

function sendToParent() {
  emit('update-request', { message: '자식의 변경 요청' })
}

&lt;Child @update-request="handleUpdateRequest" /&gt;</code></pre>

      <div class="props-event-grid">
        <article class="props-event-summary">
          <span class="props-card-label">PARENT EVENT HANDLER</span>
          <h3>선택된 데이터</h3>
          <p class="props-selected-message">{{ selectedItem.label }}</p>
          <p>현재 상태: <strong>{{ parentStatus }}</strong></p>
          <p>Props 변경 감시: <strong>{{ parentData }}</strong></p>
          <button type="button" class="props-clear-button" @click="clearEventLogs">이벤트 로그 초기화</button>
        </article>

        <article class="props-event-log-card">
          <div class="props-log-heading">
            <h3>Event Timeline</h3>
            <span>{{ eventLogs.length }} logs</span>
          </div>
          <ol v-if="eventLogs.length" class="props-event-log-list">
            <li v-for="entry in eventLogs" :key="entry.id">
              <span>{{ entry.type }}</span>
              <p>{{ entry.message }}</p>
              <time>{{ entry.time }}</time>
            </li>
          </ol>
          <p v-else class="props-event-log-empty">자식 이벤트를 실행하면 부모 로그가 표시됩니다.</p>
        </article>
      </div>
    </section>

    <section class="practice-section composition-challenge props-check-section">
      <p class="section-kicker">172쪽 · Code Challenge</p>
      <h2>Props &amp; Emits Code Challenge</h2>
      <p>부모에서 Props를 전달하고, 자식에서 Emits로 부모 상태와 이벤트 로그를 갱신하는 전체 흐름을 구현했습니다.</p>
      <div class="challenge-checklist">
        <span>✓ defineProps() 배열·객체 문법</span>
        <span>✓ required / default / type 검증</span>
        <span>✓ Parent → Child Props 전달</span>
        <span>✓ readonly Props 규칙</span>
        <span>✓ defineEmits() 이벤트 선언</span>
        <span>✓ Payload와 부모 핸들러</span>
        <span>✓ Props &amp; Emits 통합 예제</span>
        <span>✓ Event Timeline 로그</span>
      </div>
    </section>
  </div>
</template>
