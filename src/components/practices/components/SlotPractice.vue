<script setup>
import { ref } from 'vue'
import SlotDefaultChild from './SlotDefaultChild.vue'
import SlotNamedChild from './SlotNamedChild.vue'
import SlotScopedChild from './SlotScopedChild.vue'

const showDefaultContent = ref(true)
const defaultMessage = ref('부모가 전달한 기본 슬롯 콘텐츠입니다.')
const namedTitle = ref('Named Slot 카드')
const namedMessage = ref('header·default·footer 슬롯을 각각 원하는 위치에 주입했습니다.')
const scopedCount = ref(1)

function toggleDefaultContent() {
  showDefaultContent.value = !showDefaultContent.value
}

function increaseScopedCount() {
  scopedCount.value += 1
}
</script>

<template>
  <div class="slot-practice-stack">
    <section class="practice-section slot-overview-section">
      <p class="section-kicker">173~177쪽 · Slots</p>
      <h2>부모가 자식의 화면 영역을 주입하는 방법</h2>
      <p>
        Slot은 자식 컴포넌트가 레이아웃을 맡고, 부모 컴포넌트가 실제 콘텐츠를 전달하는 기능입니다. 기본 슬롯과 이름 있는
        슬롯, 자식 데이터를 부모 템플릿에서 받는 Scoped Slot을 각각 실행해 보세요.
      </p>
      <div class="slot-flow-grid">
        <article>
          <span class="slot-flow-number">01</span>
          <strong>Default Slot</strong>
          <p>이름 없이 전달한 콘텐츠가 자식의 <code>&lt;slot /&gt;</code> 위치에 들어갑니다.</p>
        </article>
        <article>
          <span class="slot-flow-number">02</span>
          <strong>Named Slot</strong>
          <p><code>#header</code>처럼 이름을 지정해 여러 영역에 콘텐츠를 나눠 넣습니다.</p>
        </article>
        <article>
          <span class="slot-flow-number">03</span>
          <strong>Scoped Slot</strong>
          <p>자식이 <code>:message</code>와 같은 slot props를 제공하고 부모가 렌더링합니다.</p>
        </article>
      </div>
    </section>

    <section class="practice-section slot-demo-section">
      <div class="slot-demo-heading">
        <div>
          <p class="section-kicker">177쪽 · Default Slot</p>
          <h2>기본 슬롯과 fallback</h2>
        </div>
        <button type="button" @click="toggleDefaultContent">
          {{ showDefaultContent ? 'fallback 보기' : '콘텐츠 전달' }}
        </button>
      </div>
      <p>
        부모가 슬롯을 전달할 때와 전달하지 않을 때를 비교합니다. 콘텐츠를 비우면 자식이 준비한 fallback 문구가
        표시됩니다.
      </p>
      <pre class="code-sample" v-pre><code>&lt;SlotDefaultChild&gt;
  &lt;strong&gt;부모가 전달한 콘텐츠&lt;/strong&gt;
&lt;/SlotDefaultChild&gt;

&lt;!-- 슬롯이 없으면 자식의 fallback이 표시됩니다. --&gt;</code></pre>
      <div class="slot-live-grid">
        <div class="slot-parent-panel">
          <span class="slot-child-label">PARENT TEMPLATE</span>
          <label>
            기본 슬롯 메시지
            <input v-model="defaultMessage" type="text" />
          </label>
          <p>
            {{ showDefaultContent ? '현재 부모 콘텐츠를 전달 중입니다.' : '현재 슬롯을 비워 fallback을 확인합니다.' }}
          </p>
        </div>
        <SlotDefaultChild v-if="showDefaultContent">
          <strong>{{ defaultMessage }}</strong>
        </SlotDefaultChild>
        <SlotDefaultChild v-else fallback-text="부모 슬롯이 비어 있어 자식 fallback이 렌더링되었습니다." />
      </div>
    </section>

    <section class="practice-section slot-demo-section">
      <div class="slot-demo-heading">
        <div>
          <p class="section-kicker">177쪽 · Named Slot</p>
          <h2>이름 있는 슬롯으로 카드 영역 구성</h2>
        </div>
        <span class="slot-demo-tag">#header · default · #footer</span>
      </div>
      <p>자식은 카드의 구조를 고정하고, 부모는 header·본문·footer 콘텐츠를 각각 원하는 위치에 주입합니다.</p>
      <pre class="code-sample" v-pre><code>&lt;SlotNamedChild&gt;
  &lt;template #header&gt;...&lt;/template&gt;
  &lt;template #default&gt;...&lt;/template&gt;
  &lt;template #footer&gt;...&lt;/template&gt;
&lt;/SlotNamedChild&gt;</code></pre>
      <div class="slot-live-grid">
        <div class="slot-parent-panel">
          <span class="slot-child-label">PARENT TEMPLATE</span>
          <label>
            카드 제목
            <input v-model="namedTitle" type="text" />
          </label>
          <label>
            카드 본문
            <textarea v-model="namedMessage" rows="3"></textarea>
          </label>
        </div>
        <SlotNamedChild>
          <template #header>
            <strong>{{ namedTitle }}</strong>
            <span class="slot-header-badge">ACTIVE</span>
          </template>
          <template #default>
            <p>{{ namedMessage }}</p>
          </template>
          <template #footer>
            <span>부모가 footer까지 전달함</span>
          </template>
        </SlotNamedChild>
      </div>
    </section>

    <section class="practice-section slot-demo-section">
      <div class="slot-demo-heading">
        <div>
          <p class="section-kicker">177쪽 · Scoped Slot</p>
          <h2>자식의 데이터를 부모 템플릿에서 렌더링</h2>
        </div>
        <button type="button" @click="increaseScopedCount">자식 데이터 +1</button>
      </div>
      <p>
        자식이 <code>&lt;slot :message="message" :count="count" /&gt;</code>로 데이터를 제공하면 부모가
        <code>v-slot="slotProps"</code>로 받아 화면을 결정할 수 있습니다.
      </p>
      <pre class="code-sample" v-pre><code>&lt;SlotScopedChild v-slot="slotProps"&gt;
  &lt;strong&gt;{{ slotProps.message }}&lt;/strong&gt;
  &lt;span&gt;{{ slotProps.count }}회&lt;/span&gt;
&lt;/SlotScopedChild&gt;</code></pre>
      <div class="slot-live-grid">
        <div class="slot-parent-panel">
          <span class="slot-child-label">PARENT TEMPLATE</span>
          <strong>받은 slot props</strong>
          <code>message · count · nextCount</code>
          <p>부모는 자식이 제공한 값으로 원하는 UI를 직접 렌더링합니다.</p>
        </div>
        <SlotScopedChild v-slot="slotProps" message="자식이 전달한 작업 상태" :count="scopedCount">
          <div class="slot-scoped-output">
            <strong>{{ slotProps.message }}</strong>
            <span>현재 {{ slotProps.count }}회 실행</span>
            <small>다음 실행 예상: {{ slotProps.nextCount }}회</small>
          </div>
        </SlotScopedChild>
      </div>
    </section>
  </div>
</template>

<style scoped>
.slot-practice-stack {
  display: grid;
  gap: 20px;
}
.slot-overview-section {
  border-color: #cfe4da;
  background: #fbfffd;
}
.slot-flow-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.slot-flow-grid article {
  min-height: 130px;
  padding: 15px;
  border: 1px solid #e0ece6;
  border-radius: 9px;
  background: #fff;
}
.slot-flow-number {
  display: inline-grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 7px;
  color: #287550;
  background: #eaf8f1;
  font-size: 10px;
  font-weight: 800;
}
.slot-flow-grid strong {
  display: block;
  margin-top: 12px;
  color: #2c5162;
  font-size: 15px;
}
.slot-flow-grid p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
.slot-demo-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}
.slot-demo-heading h2 {
  margin-bottom: 0;
}
.slot-demo-heading button {
  flex: 0 0 auto;
}
.slot-demo-tag {
  padding: 6px 9px;
  border-radius: 999px;
  color: #7c56b5;
  background: #f1eafd;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}
.slot-live-grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(260px, 1.2fr);
  gap: 14px;
  align-items: stretch;
}
.slot-parent-panel,
.slot-child-card {
  min-width: 0;
  padding: 17px;
  border: 1px solid #dce7eb;
  border-radius: 10px;
  background: #fbfdfd;
}
.slot-parent-panel {
  display: grid;
  align-content: start;
  gap: 10px;
}
.slot-parent-panel label {
  display: grid;
  gap: 6px;
  color: #526a75;
  font-size: 12px;
  font-weight: 800;
}
.slot-parent-panel input,
.slot-parent-panel textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #c8d5da;
  border-radius: 7px;
  color: var(--ink);
  background: #fff;
  font: inherit;
  font-size: 12px;
  resize: vertical;
}
.slot-parent-panel p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.6;
}
.slot-parent-panel > strong {
  color: #2c5162;
  font-size: 14px;
}
.slot-child-card {
  display: grid;
  align-content: start;
  gap: 12px;
  color: #49616a;
  background: #f7fbf9;
}
.slot-child-label {
  color: #42a579;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
}
.slot-child-content {
  min-height: 74px;
  padding: 15px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  color: #2c5162;
  background: #eaf8f1;
  line-height: 1.6;
}
.slot-fallback {
  color: #8b5b2a;
}
.slot-named-child {
  gap: 0;
  overflow: hidden;
  padding: 0;
}
.slot-named-child > .slot-child-label {
  padding: 16px 17px 0;
}
.slot-named-region {
  padding: 14px 17px;
}
.slot-named-region strong {
  color: #2c5162;
  font-size: 15px;
}
.slot-named-body {
  min-height: 90px;
  color: var(--muted);
  line-height: 1.6;
}
.slot-named-body p {
  margin: 0;
  font-size: 12px;
}
.slot-named-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e0ece6;
  color: #82919a;
  font-size: 11px;
}
.slot-header-badge {
  margin-left: 8px;
  padding: 4px 7px;
  border-radius: 999px;
  color: #287550;
  background: #e4f6ed;
  font-size: 9px;
  font-weight: 800;
}
.slot-scoped-output,
.slot-scoped-fallback {
  width: 100%;
  display: grid;
  gap: 7px;
}
.slot-scoped-output strong,
.slot-scoped-fallback strong {
  color: #2c5162;
  font-size: 16px;
}
.slot-scoped-output span,
.slot-scoped-fallback span {
  color: #526a75;
  font-size: 13px;
}
.slot-scoped-output small {
  color: #82919a;
  font-size: 11px;
}
@media (max-width: 760px) {
  .slot-flow-grid,
  .slot-live-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .slot-demo-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
