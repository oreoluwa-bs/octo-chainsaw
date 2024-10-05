<script setup lang="ts"></script>

<template>
  <header class="header"></header>
  <div class="content">
    <slot />
  </div>
</template>
<style scoped>
.header {
  background: var(--color-skyblue);
  /* background: red; */
  min-height: 250px;
}

.content {
  margin-top: -175px;
}
</style>
