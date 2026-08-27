<template>
  <section class="practice-section style-practice">
    <p class="section-kicker">113~114쪽 · Vue Style</p>
    <h2>Scoped Style과 External Style</h2>
    <p>
      <code>&lt;style scoped&gt;</code>는 현재 컴포넌트의 HTML에만 적용되고, 외부 CSS는 프로젝트의 여러 컴포넌트에서
      재사용할 수 있습니다.
    </p>

    <pre class="code-sample" v-pre><code>&lt;style scoped&gt;
.title {
  color: #ff7675;
  font-weight: bold;
}
&lt;/style&gt;

&lt;style&gt;
@import '@/assets/challenge.css';
&lt;/style&gt;</code></pre>

    <div class="style-demo-grid">
      <div class="style-demo-card">
        <h3>Scoped Style</h3>
        <p class="scoped-title">이 글자는 이 컴포넌트 내부에서만 빨간색입니다.</p>
        <div class="scoped-card">이 카드의 배경·간격도 이 컴포넌트 전용 스타일입니다.</div>
      </div>
      <div class="style-demo-card">
        <h3>External Style</h3>
        <p>공통 CSS에서 불러온 버튼 클래스를 사용합니다.</p>
        <button type="button" class="external-style-button">외부 CSS 버튼 스타일</button>
        <code class="style-source-label">src/assets/challenge.css</code>
      </div>
    </div>

    <div class="style-scope-note">
      <strong>확인 포인트</strong>
      <span>Scoped CSS는 data attribute로 현재 컴포넌트의 DOM만 골라 스타일을 적용합니다.</span>
    </div>
  </section>
</template>

<style scoped>
.scoped-title {
  color: #e75b5b;
  font-size: 18px;
  font-weight: 800;
}

.scoped-card {
  padding: 16px;
  border: 1px solid #f3c5c5;
  border-radius: 8px;
  color: #8c4848;
  background: #fff6f6;
  line-height: 1.6;
}
</style>

<style>
@import '@/assets/challenge.css';
</style>
