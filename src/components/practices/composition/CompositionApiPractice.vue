<script setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue'

const props = defineProps({
  challengeOnly: {
    type: Boolean,
    default: false,
  },
})

const apiRows = [
  {
    category: 'Application',
    functions: 'createApp, createSSRApp, app.mount()',
    description: 'Vue 애플리케이션을 만들고 DOM에 연결합니다.',
  },
  {
    category: 'Reactive State',
    functions: 'ref, reactive, readonly, shallowRef',
    description: '반응형 상태를 선언하고 변경을 추적합니다.',
  },
  {
    category: 'Computed & Watchers',
    functions: 'computed, watch, watchEffect',
    description: '계산값과 데이터 변경 감시를 구성합니다.',
  },
  {
    category: 'Lifecycle Hooks',
    functions: 'setup, onMounted, onUpdated, onUnmounted',
    description: '컴포넌트 생명주기 시점에 코드를 실행합니다.',
  },
  {
    category: 'Rendering',
    functions: 'h, resolveComponent, nextTick',
    description: '렌더링과 DOM 업데이트 타이밍을 제어합니다.',
  },
  {
    category: 'Dependency Injection',
    functions: 'provide, inject',
    description: '컴포넌트 트리 전체에 값을 전달합니다.',
  },
]

// ref() 예제: 원시값, 배열, 객체를 모두 반응형으로 만들 수 있습니다.
const refCount = ref(0)
const refName = ref('홍길동')
const refIsActive = ref(true)
const refItems = ref(['사과', '배'])
const refUser = ref({ name: '이순신', age: 30 })

function increaseRef() {
  refCount.value += 1
}

function addRefItem() {
  refItems.value.push('귤')
}

function changeRefUserName() {
  refUser.value.name = '장보고'
}

// reactive() 예제: 객체와 배열의 내부 속성을 바로 변경합니다.
const reactiveUser = reactive({ name: '이순신', age: 30 })
const reactiveItems = reactive(['사과', '바나나'])

function increaseReactiveAge() {
  reactiveUser.age += 1
}

function addReactiveItem() {
  reactiveItems.push(`과일 ${reactiveItems.length + 1}`)
}

function removeReactiveItem(index) {
  reactiveItems.splice(index, 1)
}

// computed() 캐싱 비교: count가 바뀔 때만 계산값을 다시 만듭니다.
const computedCount = ref(1)
const dummyCount = ref(2)
let methodRunCount = 0
let computedRunCount = 0

function getMethodResult() {
  methodRunCount += 1
  return computedCount.value * 2
}

const computedDouble = computed(() => {
  computedRunCount += 1
  return computedCount.value * 2
})

function increaseComputedCount() {
  computedCount.value += 1
}

// 단일 source watch
const watchedCount = ref(0)
const watchMessage = ref('count 변경을 기다리는 중입니다.')

watch(watchedCount, (nextValue, previousValue) => {
  watchMessage.value = `watch 감지: ${previousValue} → ${nextValue}`
})

// Multi-Source Watch
const multiFirstName = ref('홍')
const multiLastName = ref('길동')
const multiWatchMessage = ref('이름 두 값을 함께 감시합니다.')

watch([multiFirstName, multiLastName], ([nextFirst, nextLast], [previousFirst, previousLast]) => {
  multiWatchMessage.value = `이름 변경: ${previousFirst}${previousLast} → ${nextFirst}${nextLast}`
})

// Deep Watch: reactive 객체 안쪽의 중첩 속성까지 감시합니다.
const deepProfile = reactive({
  name: '홍길동',
  address: { city: '서울' },
  settings: { alerts: true },
})
const deepWatchMessage = ref('중첩 객체 변경을 기다리는 중입니다.')

watch(
  deepProfile,
  () => {
    deepWatchMessage.value = `deep watch 감지: ${deepProfile.name} · ${deepProfile.address.city} · 알림 ${deepProfile.settings.alerts ? '켜짐' : '꺼짐'}`
  },
  { deep: true },
)

// reactive 반응형 데이터 자체를 source로 전달하는 watch 예제입니다.
const reactiveWatchUser = reactive({ name: '이순신', age: 30 })
const reactiveWatchMessage = ref('reactive 객체 변경을 기다리는 중입니다.')

watch(reactiveWatchUser, () => {
  reactiveWatchMessage.value = `reactive watch 감지: ${reactiveWatchUser.name} · ${reactiveWatchUser.age}세`
})

// 배열 변경은 새 배열을 반환하는 source로 감시하면 push/splice도 확인할 수 있습니다.
const watchedItems = ref(['사과', '배'])
const arrayWatchMessage = ref('배열 변경을 기다리는 중입니다.')

watch(
  () => [...watchedItems.value],
  (nextItems, previousItems) => {
    arrayWatchMessage.value = `배열 변경: [${previousItems.join(', ')}] → [${nextItems.join(', ')}]`
  },
)

function addWatchedItem() {
  watchedItems.value.push(`과일 ${watchedItems.value.length + 1}`)
}

function removeWatchedItem(index) {
  watchedItems.value.splice(index, 1)
}

// watchEffect(): 내부에서 읽은 반응형 값을 자동으로 추적하고 최초 1회 즉시 실행합니다.
const effectUsername = ref('이순신')
const effectAge = ref(20)
const effectLog = ref('대기 중...')

watchEffect(() => {
  effectLog.value = `[자동 감지] 이름: ${effectUsername.value} / 나이: ${effectAge.value}세`
})
</script>

<template>
  <div class="composition-practice-stack">
    <template v-if="!props.challengeOnly">
      <section class="practice-section composition-overview">
        <p class="section-kicker">117~120쪽 · Composition API Overview</p>
        <h2>Composition API 핵심 함수</h2>
        <p>
          Vue 3의 <code>&lt;script setup&gt;</code>에서 상태와 로직을 기능별로 모아 작성합니다. 아래 표는 PDF에 나온
          Application, Reactive State, Computed &amp; Watchers의 주요 함수를 실행 가능한 예제와 함께 정리한 것입니다.
        </p>

        <pre class="code-sample" v-pre><code>import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>

        <div class="composition-api-table" role="region" aria-label="Composition API 함수 요약">
          <div class="composition-api-row composition-api-head">
            <span>분류</span><span>함수</span><span>역할</span>
          </div>
          <div v-for="row in apiRows" :key="row.category" class="composition-api-row">
            <strong>{{ row.category }}</strong>
            <code>{{ row.functions }}</code>
            <span>{{ row.description }}</span>
          </div>
        </div>
      </section>

      <section class="practice-section reactive-practice">
        <p class="section-kicker">121~126쪽 · Reactive State</p>
        <h2>ref()와 reactive() 반응성 비교</h2>
        <p>
          <code>ref()</code>는 원시값·배열·객체를 하나의 반응형 참조로 감싸고, <code>reactive()</code>는 객체와 배열의
          속성을 직접 변경하는 방식입니다.
        </p>

        <pre class="code-sample" v-pre><code>const count = ref(0)
const user = ref({ name: '이순신', age: 30 })
const items = reactive(['사과', '바나나'])

user.value.name = '장보고'
items.push('과일 3')</code></pre>

        <div class="composition-demo-grid">
          <div class="composition-demo-card">
            <h3>1) ref() 예제</h3>
            <p>
              Ref 카운트: <strong>{{ refCount }}</strong>
            </p>
            <label class="composition-field">
              <span>이름</span>
              <input v-model="refName" type="text" />
            </label>
            <p>
              입력값: <strong>{{ refName }}</strong>
            </p>
            <p>
              활성 상태: <strong>{{ refIsActive ? '활성' : '비활성' }}</strong>
            </p>
            <p>
              과일 목록: <strong>{{ refItems.join(', ') }}</strong>
            </p>
            <p>
              사용자 정보: <strong>{{ refUser.name }} · {{ refUser.age }}세</strong>
            </p>
            <div class="composition-button-row">
              <button type="button" @click="increaseRef">Ref 변수 증가</button>
              <button type="button" @click="refIsActive = !refIsActive">토글</button>
              <button type="button" @click="addRefItem">과일 추가</button>
              <button type="button" @click="changeRefUserName">사용자 이름 변경</button>
            </div>
          </div>

          <div class="composition-demo-card">
            <h3>2) reactive() 예제</h3>
            <p>
              이름: <strong>{{ reactiveUser.name }}</strong> / 나이: <strong>{{ reactiveUser.age }}세</strong>
            </p>
            <button type="button" @click="increaseReactiveAge">reactive 나이 한 살 추가</button>
            <p class="composition-subtitle">배열(Array) reactive</p>
            <ul class="composition-item-list">
              <li v-for="(item, index) in reactiveItems" :key="`${item}-${index}`">
                <span>{{ item }}</span>
                <button type="button" @click="removeReactiveItem(index)">삭제</button>
              </li>
            </ul>
            <button type="button" @click="addReactiveItem">과일 항목 추가</button>
          </div>
        </div>
      </section>
    </template>

    <section class="practice-section computed-practice">
      <p class="section-kicker">127~129쪽 · computed()</p>
      <h2>computed() 캐싱 동작 비교</h2>
      <p>
        일반 함수는 컴포넌트가 다시 렌더링될 때마다 실행되지만, <code>computed()</code>는 의존하는 값이 바뀔 때만 다시
        계산하고 그 사이에는 이전 결과를 재사용합니다.
      </p>

      <pre class="code-sample" v-pre><code>const getMethodResult = () =&gt; count.value * 2
const doubleCount = computed(() =&gt; count.value * 2)

// count가 아닌 dummy만 바뀌면 computed 결과는 캐시됩니다.</code></pre>

      <div class="computed-demo-card">
        <p>
          count: <strong>{{ computedCount }}</strong> · dummy: <strong>{{ dummyCount }}</strong>
        </p>
        <div class="composition-button-row">
          <button type="button" @click="increaseComputedCount">count 증가 (의존성 변경)</button>
          <button type="button" @click="dummyCount += 1">dummy 증가 (무관한 변경)</button>
        </div>
        <div class="computed-result-grid">
          <p>
            일반 함수 결과: <strong>{{ getMethodResult() }}</strong>
          </p>
          <p>
            Computed 결과: <strong>{{ computedDouble }}</strong>
          </p>
          <p>
            함수 실행 횟수: <strong>{{ methodRunCount }}</strong> · computed 재계산 횟수:
            <strong>{{ computedRunCount }}</strong>
          </p>
        </div>
      </div>
    </section>

    <section class="practice-section watchers-practice">
      <p class="section-kicker">130~140쪽 · watch()</p>
      <h2>watch()로 변경 감시하기</h2>
      <p v-if="props.challengeOnly">
        <code>watch()</code>는 지정한 반응형 source의 이전 값과 현재 값을 전달합니다. 단일 값, 여러 값, 중첩 객체와
        reactive 객체를 각각 감시해 보세요.
      </p>
      <p v-else>
        <code>watch()</code>는 지정한 반응형 source의 이전 값과 현재 값을 전달합니다. 단일 값, 여러 값, 중첩 객체와
        배열을 각각 감시해 보세요.
      </p>

      <pre class="code-sample" v-pre><code>watch(count, (newValue, oldValue) =&gt; {
  message.value = `${oldValue} → ${newValue}`
})

watch([firstName, lastName], ([newFirst, newLast]) =&gt; { ... })
watch(profile, () =&gt; { ... }, { deep: true })
watch(reactiveUser, () =&gt; { ... })</code></pre>

      <div class="watch-demo-grid">
        <div class="watch-demo-card">
          <h3>1) 단일 source watch</h3>
          <p>
            count: <strong>{{ watchedCount }}</strong>
          </p>
          <button type="button" @click="watchedCount += 1">count +1</button>
          <p class="watch-feedback">{{ watchMessage }}</p>
        </div>

        <div class="watch-demo-card">
          <h3>2) Multi-Source Watch</h3>
          <div class="watch-name-fields">
            <label class="composition-field"><span>성</span><input v-model="multiFirstName" type="text" /></label>
            <label class="composition-field"><span>이름</span><input v-model="multiLastName" type="text" /></label>
          </div>
          <p class="watch-feedback">{{ multiWatchMessage }}</p>
        </div>

        <div class="watch-demo-card">
          <h3>3) Deep Watch</h3>
          <label class="composition-field"><span>이름</span><input v-model="deepProfile.name" type="text" /></label>
          <label class="composition-field"
            ><span>도시</span><input v-model="deepProfile.address.city" type="text"
          /></label>
          <label class="choice-label"><input v-model="deepProfile.settings.alerts" type="checkbox" /> 알림 켜기</label>
          <p class="watch-feedback">{{ deepWatchMessage }}</p>
        </div>

        <div class="watch-demo-card">
          <h3>4) reactive 반응형 데이터</h3>
          <p>
            이름: <strong>{{ reactiveWatchUser.name }}</strong> / 나이: <strong>{{ reactiveWatchUser.age }}세</strong>
          </p>
          <button type="button" @click="reactiveWatchUser.age += 1">reactive 나이 +1</button>
          <p class="watch-feedback">{{ reactiveWatchMessage }}</p>
        </div>

        <div v-if="!props.challengeOnly" class="watch-demo-card">
          <h3>5) Array Watch</h3>
          <ul class="composition-item-list compact-item-list">
            <li v-for="(item, index) in watchedItems" :key="`${item}-${index}`">
              <span>{{ item }}</span>
              <button type="button" @click="removeWatchedItem(index)">삭제</button>
            </li>
          </ul>
          <button type="button" @click="addWatchedItem">배열 항목 추가</button>
          <p class="watch-feedback">{{ arrayWatchMessage }}</p>
        </div>
      </div>
    </section>

    <section class="practice-section effect-practice">
      <p class="section-kicker">141~143쪽 · watchEffect()와 기타 함수</p>
      <h2>watchEffect() 자동 감시자</h2>
      <p>
        감시할 source를 따로 적지 않아도 effect 내부에서 읽은 반응형 값을 자동으로 추적합니다. 컴포넌트가 처음 열릴 때도
        한 번 실행되는 특징을 확인하세요.
      </p>

      <pre class="code-sample" v-pre><code>const username = ref('이순신')
const age = ref(20)
const logMessage = ref('대기 중...')

watchEffect(() =&gt; {
  logMessage.value = `[자동 감지] 이름: ${username.value} / 나이: ${age.value}세`
})</code></pre>

      <div class="effect-demo-card">
        <p>
          이름: <strong>{{ effectUsername }}</strong> / 나이: <strong>{{ effectAge }}세</strong>
        </p>
        <div class="composition-button-row">
          <button type="button" @click="effectUsername = '이순신'">이름을 '이순신'으로 변경</button>
          <button type="button" @click="effectAge += 1">나이 한 살 추가 (age++)</button>
        </div>
        <div class="effect-log" aria-live="polite">
          <h3>👁️ watchEffect 자동 모니터링 시스템</h3>
          <p>{{ effectLog }}</p>
          <small>새로고침 직후 버튼을 누르지 않아도 로그가 먼저 표시됩니다.</small>
        </div>
      </div>

      <div class="watcher-reference-table" role="region" aria-label="Computed와 Watcher 함수 요약">
        <div class="watcher-reference-row watcher-reference-head">
          <span>분류</span><span>함수</span><span>설명</span>
        </div>
        <div class="watcher-reference-row">
          <span>계산된 속성 선언</span><code>computed</code><span>반응형 상태에서 파생 값을 계산하고 캐시합니다.</span>
        </div>
        <div class="watcher-reference-row">
          <span>지정형 감시자</span><code>watch</code><span>특정 source의 변경과 이전·현재 값을 감시합니다.</span>
        </div>
        <div class="watcher-reference-row">
          <span>자동 의존성 감시자</span><code>watchEffect</code
          ><span>effect 내부에서 읽은 반응형 값을 자동 추적합니다.</span>
        </div>
        <div class="watcher-reference-row">
          <span>실행 시점 제어</span><code>watchPostEffect / watchSyncEffect</code
          ><span>DOM 반영 후 또는 동기적으로 effect를 실행합니다.</span>
        </div>
      </div>
    </section>

    <section class="practice-section composition-challenge">
      <p class="section-kicker">144쪽 · Code Challenge</p>
      <h2>Composition API Code Challenge</h2>
      <p v-if="props.challengeOnly">Computed &amp; Watchers 범위의 예제를 이 페이지에서 각각 실행했습니다.</p>
      <p v-else>
        PDF 144쪽의 과제 범위인 Reactive State와 Computed &amp; Watchers 예제를 이 페이지에서 모두 실행했습니다.
      </p>
      <div class="challenge-checklist">
        <span v-if="!props.challengeOnly">✓ ref() Example</span>
        <span v-if="!props.challengeOnly">✓ reactive() Example</span>
        <span>✓ computed() Example</span>
        <span>✓ watch() Example</span>
        <span>✓ Multi-Source Watch</span>
        <span>✓ Deep Watch</span>
        <span>✓ reactive 반응형 데이터 Watch</span>
        <span v-if="!props.challengeOnly">✓ Array Watch</span>
        <span>✓ watchEffect() Example</span>
      </div>
    </section>
  </div>
</template>
