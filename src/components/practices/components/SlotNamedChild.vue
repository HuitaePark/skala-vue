<template>
  <article class="slot-child-card slot-named-child">
    <span class="slot-child-label">CHILD COMPONENT</span>
    <header class="slot-named-region">
      <slot name="header">
        <strong>기본 헤더</strong>
      </slot>
    </header>
    <div class="slot-named-region slot-named-body">
      <slot>
        <span>기본 본문 슬롯입니다.</span>
      </slot>
    </div>
    <footer class="slot-named-region slot-named-footer">
      <slot name="footer">
        <span>기본 푸터</span>
      </slot>
    </footer>
  </article>
</template>
