<script setup lang="ts">
import IconSearch from './icons/IconSearch.vue'
</script>

<template>
  <form method="GET" action="/search">
    <div class="search__form__field">
      <IconSearch class="search__form__icon" />
      <input
        type="search"
        name="search"
        class="search__form__input"
        placeholder="Search for photo"
      />
    </div>
  </form>
</template>

<style scoped>
.search__form__field {
  position: relative;
}

.search__form__icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
}

.search__form__input {
  width: 100%;
  display: block;
  padding: 1rem 2rem 1rem 3rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 10px 10px 24px 3px rgba(0, 0, 0, 0.19);
  font-size: 1rem;
}
</style>
