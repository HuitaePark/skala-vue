<script setup>
import UnitToggler from '@/components/practices/pinia/UnitToggler.vue'
import WeatherParent from '@/components/practices/hands-on/WeatherParent.vue'
import UserFormPractice from '@/components/practices/ui-library/UserFormPractice.vue'
</script>

<template>
  <div class="page-shell ui-library-page">
    <section class="page-intro">
      <p class="eyebrow">PDF 232~249 · UI Libraries</p>
      <h1>Element Plus로 완성한 UI Library Challenge</h1>
      <p>
        외부 UI 라이브러리의 Form, 입력 제어, Message Box, Progress 컴포넌트를 학습 예제에 적용했습니다. 아래 실습은
        PDF의 Code Challenge를 그대로 실행하면서 Weather 서비스 확장에 연결할 수 있는 화면입니다.
      </p>
    </section>

    <section class="practice-section ui-library-overview">
      <p class="section-kicker">Hands-on · Weather UI Library</p>
      <h2>외부 라이브러리 적용 범위</h2>
      <div class="ui-library-overview-grid">
        <article>
          <strong>폼 검증</strong>
          <p>이메일 형식과 약관 동의를 검사하고 Element Plus Message로 결과를 알립니다.</p>
        </article>
        <article>
          <strong>상태 입력</strong>
          <p>수량, 별점과 실시간 주문 요약을 반응형 데이터로 연결합니다.</p>
        </article>
        <article>
          <strong>피드백</strong>
          <p>삭제 확인 대화상자와 다운로드 진행률로 비동기 인터랙션을 표현합니다.</p>
        </article>
      </div>
    </section>

    <UserFormPractice />

    <section class="ui-weather-preview">
      <el-card shadow="never">
        <template #header>
          <div class="ui-weather-preview-heading">
            <div>
              <p class="section-kicker">Hands-on 확장 · Weather Component</p>
              <strong>Element Plus 카드 안에 날씨 컴포넌트 적용</strong>
            </div>
            <UnitToggler />
          </div>
        </template>
        <WeatherParent />
      </el-card>
    </section>

    <RouterLink class="next-link secondary-link" to="/axios">Axios Weather로 이동 →</RouterLink>
    <RouterLink class="next-link secondary-link" to="/vite">Vite 품질·배포 과제로 이동 →</RouterLink>
  </div>
</template>

<style scoped>
.ui-library-page {
  width: min(980px, 100%);
}
.ui-library-overview {
  margin-bottom: 20px;
}
.ui-library-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.ui-library-overview-grid article {
  padding: 14px;
  border: 1px solid #e1e4f0;
  border-radius: 9px;
  background: #fbfaff;
}
.ui-library-overview-grid strong {
  color: #62418f;
  font-size: 13px;
}
.ui-library-overview-grid p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}
.ui-weather-preview {
  margin-top: 20px;
}
.ui-weather-preview :deep(.el-card) {
  border: 1px solid #e1e4f0;
  border-radius: 12px;
  background: #fff;
}
.ui-weather-preview-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.ui-weather-preview-heading .section-kicker {
  margin-bottom: 5px;
}
.ui-weather-preview-heading strong {
  color: #62418f;
  font-size: 13px;
}
.ui-weather-preview :deep(.el-card__body) {
  padding: 0;
}
@media (max-width: 700px) {
  .ui-library-overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
