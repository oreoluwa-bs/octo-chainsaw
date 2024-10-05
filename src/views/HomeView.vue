<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { type SearchResults, unsplashAPI } from '@/lib/unsplash'
import { PhotoCardList, PhotoCardListSkeleton } from '@/components/photo-card'
import MainLayout from '@/components/MainLayout.vue'
import PhotosSearch from '@/components/PhotosSearch.vue'

const errors = ref<string>()
const isFetching = ref(false)
const searchQuery = ref<string>('African')
const photos = ref<SearchResults>({
  results: [],
  total: 0,
  total_pages: 0
})

watchEffect(async () => {
  try {
    isFetching.value = true
    photos.value = {
      ...(await unsplashAPI.search({ query: searchQuery.value, order_by: 'latest' }))
    }
  } catch (err) {
    if (err instanceof Error) {
      errors.value = err.message
    } else if (typeof err === 'string') {
      errors.value = err
    } else {
      errors.value = 'Something unexpected occured'
    }
  } finally {
    isFetching.value = false
  }
})
</script>

<template>
  <MainLayout>
    <main class="container">
      <PhotosSearch class="search__form" />

      <div class="search__content">
        <PhotoCardListSkeleton v-if="isFetching" />
        <div v-else>
          <div role="alert" v-if="errors">
            {{ errors }}
          </div>
          <PhotoCardList v-else :photos="photos.results" />
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<style scoped>
.search__form {
  margin-bottom: 50px;
}

.search__content {
  ---gutter: 0rem;
  padding-inline: var(---gutter);
  font-weight: normal;
}

@media screen and (min-width: 400px) {
  .search__content {
    ---gutter: 1rem;
  }
}
@media screen and (min-width: 768px) {
  .search__content {
    ---gutter: 3rem;
  }
}
</style>
