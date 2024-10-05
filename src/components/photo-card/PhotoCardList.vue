<script setup lang="ts">
import type { UnsplashPhoto } from '@/lib/unsplash'
import { PhotoCard } from '.'
import { computed } from 'vue'
import { groupInX } from './utils'

const props = defineProps<{
  photos: UnsplashPhoto[]
}>()
const columns3 = computed(() => groupInX(props.photos, 3))
const columns2 = computed(() => groupInX(props.photos, 2))
</script>

<template>
  <div>
    <div class="photo-card__list">
      <div class="photo-card__list__col" data-cols="3" v-for="(col, i) in columns3" :key="i">
        <PhotoCard v-for="photo in col" :key="photo.id" :photo="photo" />
      </div>
      <div class="photo-card__list__col" data-cols="2" v-for="(col, i) in columns2" :key="i">
        <PhotoCard v-for="photo in col" :key="photo.id" :photo="photo" />
      </div>
    </div>
  </div>
</template>

<style>
.photo-card__list {
  ---gap: 0.5rem;
  ---cols: 2;
  display: grid;
  grid-template-columns: repeat(var(---cols), 1fr);
  gap: var(---gap);
}

@media screen and (min-width: 400px) {
  .photo-card__list {
    ---gap: 1rem;
  }
}

@media screen and (min-width: 768px) {
  .photo-card__list {
    ---gap: 2rem;
    ---cols: 3;
  }
}

.photo-card__list__col {
  display: flex;
  flex-direction: column;
  gap: var(---gap);
}
.photo-card__list__col[data-cols='3'] {
  display: none;
}
@media screen and (min-width: 768px) {
  .photo-card__list__col[data-cols='3'] {
    display: flex;
  }
  .photo-card__list__col[data-cols='2'] {
    display: none;
  }
}
</style>
