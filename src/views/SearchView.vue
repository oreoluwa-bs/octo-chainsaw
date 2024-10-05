<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { type SearchResults, unsplashAPI } from '@/lib/unsplash'
import MainLayout from '@/components/MainLayout.vue'
import { PhotoCardList, PhotoCardListSkeleton } from '@/components/photo-card'

const route = useRoute()
const errors = ref<string>()
const searchQuery = route.query.search
const isFetching = ref(false)
const photos = ref<SearchResults>({
  results: [],
  total: 0,
  total_pages: 0
})

watchEffect(async () => {
  try {
    isFetching.value = true
    if (searchQuery && typeof searchQuery === 'string') {
      photos.value = await unsplashAPI.search({ query: searchQuery })
    } else if (searchQuery && Array.isArray(searchQuery) && searchQuery[0]) {
      photos.value = await unsplashAPI.search({ query: searchQuery[0] })
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
      <h2 class="search__result__heading">
        Search results for <span>"{{ searchQuery }}"</span>
      </h2>

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
.search__result__heading {
  margin-bottom: 50px;
  color: var(--color-darkblue);
  font-size: x-large;
  font-weight: 600;
}
@media screen and (min-width: 768px) {
  .search__result__heading {
    font-size: xx-large;
  }
}
.search__result__heading span {
  color: var(--color-bluegrey);
}

.search__content {
  ---gutter: 0rem;
  padding-inline: var(---gutter);
  font-weight: normal;
}

@media screen and (min-width: 448px) {
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
