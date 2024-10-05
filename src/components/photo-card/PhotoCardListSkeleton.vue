<script setup lang="ts">
import { PhotoCardSkeleton } from '.'
import { groupInX } from './utils'

const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const columns3 = groupInX(arr, 3)
const columns2 = groupInX(arr, 3)
</script>

<template>
  <div>
    <div class="photo-card__list">
      <div class="photo-card__list__col" data-cols="3" v-for="(col, i) in columns3" :key="i">
        <PhotoCardSkeleton v-for="j in col" :key="j" />
      </div>
      <div class="photo-card__list__col" data-cols="2" v-for="(col, i) in columns2" :key="i">
        <PhotoCardSkeleton v-for="j in col" :key="j" />
      </div>
    </div>
  </div>
</template>
