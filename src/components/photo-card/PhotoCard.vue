<script setup lang="ts">
import type { UnsplashPhoto } from '@/lib/unsplash'
import { ref } from 'vue'
import { PhotoCardSkeleton, PhotoCardLarge } from '.'

defineProps<{
  photo: UnsplashPhoto
}>()

const dialogRef = ref<HTMLDialogElement>()
const hasLoaded = ref(false)

function openDialog() {
  dialogRef.value?.showModal()
}
function closeDialog() {
  dialogRef.value?.close()
}
</script>

<template>
  <div class="photo-card">
    <img
      :src="photo.urls.small"
      :alt="photo.alt_description || photo.description || ''"
      class="photo-card__img"
      @load="() => (hasLoaded = true)"
    />
    <button class="photo-card__trigger" @click="openDialog"></button>
    <div class="photo-card__meta">
      <h3>{{ photo.user.name }}</h3>
      <p>{{ photo.user.location }}</p>
    </div>
  </div>
  <PhotoCardSkeleton v-if="!hasLoaded" />

  <dialog ref="dialogRef" class="dialog photo-card__dialog">
    <button
      autofocus
      variant="ghost"
      size="icon"
      @click="closeDialog"
      class="photo-card__dialog__close-btn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class=""
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>

    <div class="photo-card__dialog__content">
      <PhotoCardLarge :photo="photo" />
    </div>
  </dialog>
</template>

<style scoped>
.photo-card {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}
.photo-card__trigger {
  position: absolute;
  inset: 0;
  border: none;
  background: none;
  background-image: linear-gradient(to bottom, #00000000 60%, #000000);
  cursor: pointer;
  z-index: 1;
}
.photo-card__img {
  /* width: 100%; */
  max-width: 100%;
  object-fit: cover;
}
.photo-card__meta {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  color: white;
  z-index: 2;
  pointer-events: none;
}

.photo-card__meta h3 {
  margin-bottom: 0.25rem;
  font-weight: 500;
  font-size: medium;
}

.photo-card__meta p {
  font-size: small;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .photo-card__meta h3 {
    font-size: large;
  }
  .photo-card__meta p {
    font-size: smaller;
  }
}
.photo-card__dialog {
  /* overflow: auto; */
  border-radius: 1rem;
  background-color: white;
  border: none;
  padding: 0;
  margin: auto;
  overflow: visible;
  border-radius: 1rem;
  width: min(100%, 880px);
}

.photo-card__dialog__content {
  max-height: 80vh;
  width: 100%;
  border-radius: 1rem;
  overflow: auto;
}
.photo-card__dialog__close-btn {
  color: white;
  position: absolute;
  right: 1rem;
  top: -2rem;
  z-index: 20;
  background: transparent;
  border: none;
  cursor: pointer;
}

@media screen and (min-width: 1240px) {
  .photo-card__dialog__close-btn {
    right: -100px;
    top: -40px;
  }
}
</style>
