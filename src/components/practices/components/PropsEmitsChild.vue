<script setup>
const props = defineProps({
  parentData: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: '대기 중',
  },
  items: {
    type: Array,
    default: () => [],
  },
  selectedId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-request', 'notify-request', 'select-item'])

function requestParentUpdate() {
  emit('update-request', {
    message: '자식 컴포넌트가 상위 컴포넌트의 갱신을 요청했습니다.',
    nextLikes: props.likes + 1,
  })
}

function sendNotification() {
  emit('notify-request', {
    message: `현재 좋아요 ${props.likes}개를 전달했습니다.`,
    payload: { likes: props.likes, status: props.status },
  })
}

function selectItem(item) {
  emit('select-item', { id: item.id, label: item.label })
}
</script>

<template>
  <article class="props-child-card">
    <div class="props-card-heading">
      <div>
        <span class="props-card-label">CHILD COMPONENT</span>
        <h3>PropsEmitsChild</h3>
      </div>
      <span class="props-readonly-badge">readonly props</span>
    </div>

    <div class="props-child-message">
      <small>부모가 전달한 parentData</small>
      <strong>{{ parentData }}</strong>
    </div>

    <div class="props-child-stats">
      <span><small>likes</small><strong>{{ likes }}</strong></span>
      <span><small>status</small><strong>{{ status }}</strong></span>
    </div>

    <p class="props-child-note">자식은 Props를 직접 바꾸지 않고 Emit으로 부모에게 변경을 요청합니다.</p>

    <div class="props-child-actions">
      <button type="button" @click="requestParentUpdate">update-request emit</button>
      <button type="button" @click="sendNotification">notify-request emit</button>
    </div>

    <div class="props-child-items">
      <span class="props-child-items-label">자식에서 선택 이벤트 보내기</span>
      <div class="props-item-buttons">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          :class="{ selected: item.id === selectedId }"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </article>
</template>
