<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">My Recipes</h1>

    <!-- list of user-created recipes -->
    <RecipePreviewList
      v-if="myRecipes.length"
      :recipes="myRecipes"       
    />

    <!-- empty-state -->
    <p v-else class="text-center text-muted">
      You haven’t added any recipes yet.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import RecipePreviewList from '@/components/RecipePreviewList.vue'

// global helpers
const { appContext } = getCurrentInstance()
const toast  = appContext.config.globalProperties.toast

// state
const myRecipes = ref([])

// fetch current user’s recipes once component is mounted
const loadMyRecipes = async () => {
  try {
    const { data } = await window.axios.get('/users/recipes', {
      withCredentials: true      
    })

    /* If your backend wraps the array (e.g. {recipes:[...]}) adjust here */
    myRecipes.value = data.recipes ?? data
  } catch (err) {
    console.error(err)
    toast?.('Error', 'Could not load your recipes', 'danger')
  }
}

onMounted(loadMyRecipes)
</script>

<style scoped>
h1 {
  font-family: "Georgia", serif;
  font-weight: 700;
}
</style>
