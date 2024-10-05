<script setup lang="ts">
const heights = [300, 250, 400, 350, 450, 500]
const height = heights[Math.floor(Math.random() * heights.length)]
</script>

<template>
  <div class="skeleton photo-card" :style="{ '---height': height + 'px' }">
    <div class="photo-card__meta skeleton">
      <div
        class="skeleton skeleton--dark"
        style="height: 28px; margin-bottom: 8px; width: 60%"
      ></div>
      <div class="skeleton skeleton--dark" style="height: 20px; width: 40%"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background: rgb(246, 246, 246);
}

.skeleton.skeleton--dark {
  background: rgb(236, 236, 236);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.photo-card {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  height: var(---height, 400px);
}

.photo-card__meta {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  color: white;
  z-index: 2;
}
</style>
