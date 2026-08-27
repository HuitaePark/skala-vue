<script setup>
import { computed } from 'vue'
import UnitToggler from '@/components/practices/pinia/UnitToggler.vue'
import WeatherParent from '@/components/practices/hands-on/WeatherParent.vue'
import UserFormPractice from '@/components/practices/ui-library/UserFormPractice.vue'

const props = defineProps({
  challenge: {
    type: String,
    default: 'all',
  },
})

const challengeMeta = {
  all: {
    eyebrow: 'PDF 232~249 · UI Libraries',
    title: 'Element Plus UI Library 전체 보기',
    description:
      'PDF의 UI Library 개념과 세 가지 Code Challenge를 한 번에 확인합니다. 아래 메뉴에서 회원가입 Form, 상품 입력, 시스템 피드백 과제를 각각 열어 볼 수 있습니다.',
  },
  form: {
    eyebrow: 'PDF 246 · Code Challenge',
    title: 'Code Challenge · UI Library Form',
    description:
      'Element Plus의 Form, Input, Switch를 사용해 이메일 형식과 약관 동의를 확인하는 회원가입 화면을 실행합니다.',
  },
  product: {
    eyebrow: 'PDF 247 · Code Challenge',
    title: 'Code Challenge · UI Library 상품',
    description:
      'Input Number와 Rate를 반응성 데이터에 연결하고, 수량과 평점이 주문 요약에 즉시 반영되는 상품 화면을 실행합니다.',
  },
  progress: {
    eyebrow: 'PDF 248 · Code Challenge',
    title: 'Code Challenge · UI Library 피드백',
    description:
      'Message Box 확인 흐름과 Progress 상태를 사용해 삭제 확인과 데이터 동기화 진행률 인터랙션을 실행합니다.',
  },
}

const currentMeta = computed(() => challengeMeta[props.challenge] ?? challengeMeta.all)
const isOverview = computed(() => props.challenge === 'all')
</script>

<template>
  <div class="page-shell ui-library-page">
    <section class="page-intro">
      <p class="eyebrow">{{ currentMeta.eyebrow }}</p>
      <h1>{{ currentMeta.title }}</h1>
      <p>{{ currentMeta.description }}</p>
    </section>

    <nav class="challenge-tabs" aria-label="UI Library Code Challenge 목록">
      <RouterLink class="challenge-tab" :class="{ 'is-active': props.challenge === 'form' }" to="/ui-library">
        <span>246</span>
        <strong>회원가입 Form</strong>
      </RouterLink>
      <RouterLink
        class="challenge-tab"
        :class="{ 'is-active': props.challenge === 'product' }"
        to="/ui-library/product"
      >
        <span>247</span>
        <strong>상품 수량·평점</strong>
      </RouterLink>
      <RouterLink
        class="challenge-tab"
        :class="{ 'is-active': props.challenge === 'progress' }"
        to="/ui-library/progress"
      >
        <span>248</span>
        <strong>진행률·삭제 확인</strong>
      </RouterLink>
      <RouterLink class="challenge-tab" :class="{ 'is-active': isOverview }" to="/ui-library/overview">
        <span>ALL</span>
        <strong>전체 보기</strong>
      </RouterLink>
    </nav>

    <section v-if="isOverview" class="practice-section ui-library-overview">
      <p class="section-kicker">232~245쪽 · UI Library 개념</p>
      <h2>외부 컴포넌트와 Vue 상태 연결</h2>
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

    <UserFormPractice :challenge="props.challenge" />

    <section v-if="isOverview" class="ui-weather-preview">
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

    <RouterLink v-if="isOverview" class="next-link secondary-link" to="/vite">Vite 품질·배포 과제로 이동 →</RouterLink>
    <RouterLink v-else class="next-link secondary-link" to="/ui-library/overview">UI Library 전체 보기 →</RouterLink>
  </div>
</template>

<style scoped>
.ui-library-page {
  width: min(980px, 100%);
}
.challenge-tabs {
  margin: -8px 0 22px;
  padding: 6px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  border: 1px solid #dce7eb;
  border-radius: 11px;
  background: #f8fbfc;
}
.challenge-tab {
  min-width: 0;
  padding: 10px 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #63747d;
  text-decoration: none;
}
.challenge-tab:hover,
.challenge-tab.is-active {
  border-color: #cce7da;
  color: #287550;
  background: #eaf8f1;
}
.challenge-tab span {
  color: #42a579;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.challenge-tab strong {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  .challenge-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ui-library-overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
