<!-- <template>
  <h1>Favorites</h1>
</template>

<script>
export default {

}
</script>

<style>

</style> -->


<template>
  <div class="container mt-4">
    <!-- show list when we have data -->
    <RecipePreviewList
      v-if="favorites.length"
      :recipes="favorites"
      title="My Favorite Recipes"          
    />
    <!-- fallback if no favourites -->
    <div v-else class="text-center text-muted">
      You don’t have any favourite recipes yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import RecipePreviewList from '@/components/RecipePreviewList.vue'

// ----- refs / globals -------------------------------------------------------
const favorites = ref([])
const { appContext } = getCurrentInstance()
const toast = appContext.config.globalProperties.toast

// ----- fetch favourites on mount -------------------------------------------
const loadFavorites = async () => {
  try {
    // backend returns ONLY the user’s favourites because session cookie is sent
    const { data } = await window.axios.get('/users/favorites', {
      withCredentials: true      // <-- obligatory when using session cookies
    })

    /* expected shape:
       data = { favorites: [ { recipeId, title, image, ... } ] }
       adjust if your backend sends a different key
    */
    favorites.value = data.favorites ?? data
  } catch (err) {
    console.error(err)
    toast?.('Error', 'Could not load favourite recipes', 'danger')
  }
}

// run once component is in DOM
onMounted(loadFavorites)
</script>

<style scoped>
/* tiny tweak to mimic your style guide; delete or change freely */
h1 {
  font-family: "Georgia", serif;
  font-weight: 700;
}
</style>
