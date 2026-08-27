<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  challenge: {
    type: String,
    default: 'all',
  },
})

const userForm = ref({
  email: '',
  agree: false,
})
const productQuantity = ref(1)
const productRate = ref(4)
const downloadProgress = ref(0)
const isDownloading = ref(false)
let downloadTimer

const showForm = computed(() => props.challenge === 'all' || props.challenge === 'form')
const showProduct = computed(() => props.challenge === 'all' || props.challenge === 'product')
const showProgress = computed(() => props.challenge === 'all' || props.challenge === 'progress')

const orderSummary = computed(() => `선택 수량 ${productQuantity.value}개 · 내가 준 점수 ${productRate.value}점`)

function handleRegister() {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('✖ 올바른 이메일 형식이 아닙니다.')
    return
  }

  if (!userForm.value.agree) {
    ElMessage.warning('⚠ 이용약관에 동의하셔야 합니다.')
    return
  }

  ElMessage.success('🛩 가입 신청이 정상적으로 완료되었습니다!')
}

async function confirmDelete() {
  try {
    await ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '최종 경고', {
      confirmButtonText: '네, 삭제합니다',
      cancelButtonText: '취소',
      type: 'warning',
    })
    ElMessage.success('🗑 파일이 안전하게 파쇄되었습니다.')
  } catch {
    ElMessage.info('✖ 삭제 작업이 취소되었습니다.')
  }
}

function startDownload() {
  if (isDownloading.value) return

  isDownloading.value = true
  downloadProgress.value = 0
  downloadTimer = window.setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      downloadProgress.value = 100
      window.clearInterval(downloadTimer)
      downloadTimer = undefined
      isDownloading.value = false
      ElMessage.success('💾 대용량 데이터 로드가 완료되었습니다!')
    }
  }, 350)
}

onUnmounted(() => {
  if (downloadTimer) window.clearInterval(downloadTimer)
})
</script>

<template>
  <div class="ui-library-stack">
    <section v-if="showForm" class="practice-section ui-card-section">
      <div class="ui-card-heading">
        <div>
          <p class="section-kicker">Element Plus · 실습 1</p>
          <h2>회원가입 Form &amp; 입력 제어</h2>
        </div>
        <span class="ui-library-label">el-form · el-input · el-switch</span>
      </div>
      <el-form class="registration-form" label-position="top" @submit.prevent="handleRegister">
        <el-form-item label="이메일 주소">
          <el-input v-model="userForm.email" type="email" placeholder="example@email.com" clearable />
        </el-form-item>
        <el-form-item>
          <el-switch v-model="userForm.agree" />
          <span class="switch-copy">개인정보 수집 및 필수 이용약관에 동의합니다.</span>
        </el-form-item>
        <el-button class="register-button" type="success" native-type="submit">🛩 회원가입하기</el-button>
      </el-form>
    </section>

    <section v-if="showProduct" class="practice-section ui-card-section">
      <div class="ui-card-heading">
        <div>
          <p class="section-kicker">Element Plus · 실습 2</p>
          <h2>커머스 상품 수량 &amp; 평점 시스템</h2>
        </div>
        <span class="ui-library-label">el-input-number · el-rate</span>
      </div>
      <div class="commerce-row">
        <span>구매 수량 선택</span>
        <el-input-number v-model="productQuantity" :min="1" :max="10" controls-position="right" />
        <small>(최대 10개 구매 가능)</small>
      </div>
      <div class="commerce-row">
        <span>상품 만족도 별점</span>
        <el-rate v-model="productRate" />
        <strong>{{ productRate }}점</strong>
      </div>
      <div class="ui-live-summary"><span class="live-dot"></span>{{ orderSummary }}</div>
    </section>

    <section v-if="showProgress" class="practice-section ui-card-section">
      <div class="ui-card-heading">
        <div>
          <p class="section-kicker">Element Plus · 실습 3</p>
          <h2>시스템 피드백 &amp; 진행률 인터랙션</h2>
        </div>
        <span class="ui-library-label">el-message-box · el-progress</span>
      </div>
      <div class="feedback-actions">
        <el-button type="danger" plain @click="confirmDelete">🗑 서버 파일 삭제 테스트</el-button>
        <el-button type="primary" :disabled="isDownloading" @click="startDownload">💾 데이터 동기화 시작</el-button>
      </div>
      <el-progress
        class="download-progress"
        :percentage="downloadProgress"
        :status="downloadProgress === 100 ? 'success' : undefined"
        :stroke-width="8"
      />
      <p class="progress-caption">
        {{
          isDownloading
            ? '동기화 중…'
            : downloadProgress === 100
              ? '동기화 완료'
              : '버튼을 눌러 진행률 인터랙션을 시작하세요.'
        }}
      </p>
    </section>
  </div>
</template>

<style scoped>
.ui-library-stack {
  display: grid;
  gap: 20px;
}
.ui-card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}
.ui-card-heading h2 {
  margin-bottom: 0;
}
.ui-library-label {
  padding: 6px 8px;
  border-radius: 999px;
  color: #7c56b5;
  background: #f1eafd;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}
.registration-form {
  max-width: 720px;
  margin-top: 18px;
}
.registration-form :deep(.el-form-item) {
  margin-bottom: 16px;
}
.registration-form :deep(.el-form-item__label) {
  color: #526a75;
  font-size: 12px;
  font-weight: 800;
}
.registration-form :deep(.el-input__wrapper) {
  min-height: 40px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #dbe4e6 inset;
}
.registration-form :deep(.el-switch) {
  --el-switch-on-color: #42b883;
}
.switch-copy {
  margin-left: 8px;
  color: #63747d;
  font-size: 12px;
}
.register-button {
  width: 100%;
  min-height: 40px;
}
.commerce-row {
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #edf1f2;
  color: #526a75;
  font-size: 12px;
}
.commerce-row:first-of-type {
  margin-top: 12px;
}
.commerce-row > span {
  min-width: 130px;
  font-weight: 800;
}
.commerce-row small {
  color: #8b999f;
}
.commerce-row strong {
  color: #b78321;
  font-size: 13px;
}
.commerce-row :deep(.el-input-number) {
  width: 150px;
}
.commerce-row :deep(.el-rate) {
  --el-rate-icon-size: 21px;
}
.ui-live-summary {
  margin-top: 16px;
  padding: 11px 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  color: #526a75;
  background: #f3f5f5;
  font-size: 12px;
}
.live-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #49d991;
  box-shadow: 0 0 0 4px rgba(73, 217, 145, 0.16);
}
.feedback-actions {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.download-progress {
  margin-top: 19px;
}
.progress-caption {
  margin: 8px 0 0;
  color: #82919a;
  font-size: 11px;
}
@media (max-width: 620px) {
  .ui-card-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .commerce-row {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px 0;
  }
  .commerce-row > span {
    min-width: 100%;
  }
}
</style>
