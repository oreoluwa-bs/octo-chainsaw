<script setup lang="ts">
import type { UnsplashPhoto } from '@/lib/unsplash'
import { determineOrientation } from './utils'

const props = defineProps<{
  photo: UnsplashPhoto
}>()

const { orientation } = determineOrientation(props.photo.width, props.photo.height)
</script>

<template>
  <div>
    <img
      :src="photo.urls.regular"
      :alt="photo.alt_description || photo.description || ''"
      class="photo-card__img"
      :data-orientation="orientation"
    />

    <div class="photo-card__meta">
      <h3>{{ photo.user.name }}</h3>
      <p>{{ photo.user.location }}</p>
    </div>
  </div>
</template>

<style scoped>
.photo-card__img {
  margin-inline: auto;
  max-height: 60vh;
  width: 100%;
  object-fit: cover;
}

.photo-card__img[data-orientation='portrait'],
.photo-card__img[data-orientation='square'] {
  object-fit: contain;
}

.photo-card__meta {
  padding: 1rem 1.5rem;
}

.photo-card__meta h3 {
  margin-bottom: 0.2rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-darkblue);
}
.photo-card__meta p {
  font-size: small;
  margin: 0;
  color: var(--color-darkgrey);
}

@media screen and (min-width: 768px) {
  .photo-card__meta {
    padding: 1.25rem 2.5rem;
  }
}
</style>
