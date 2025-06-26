<template>
  <div class="container" v-if="recipe">
    <div class="recipe-header mt-3 mb-4 text-center">
      <h1>{{ recipe.title }}</h1>
      <img v-if="recipe.image" :src="recipe.image" class="center" />
    </div>

    <div class="recipe-body">
      <div class="wrapper">
        <!-- Ingredients -->
        <div class="wrapped">
          <div class="mb-3">
            <div>⏱ Ready in {{ recipe.duration }} minutes</div>
            <div>🍽 Servings: {{ recipe.servings }}</div>
          </div>

          <h5>🧂 Ingredients</h5>
          <ul v-if="recipe.ingredients?.length">
            <li v-for="(ing, idx) in recipe.ingredients" :key="idx">
              {{ ing }}
            </li>
          </ul>
        </div>

        <!-- Steps -->
        <div class="wrapped">
          <h5>👨‍🍳 Steps</h5>
          <ol v-if="recipe.steps?.length">
            <li v-for="(step, idx) in recipe.steps" :key="idx">
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { getRecipeFromCacheOrFetch } from '@/recipe_utils.js';

export default {
  
  data () {
    return { recipe: null }
  },
  async created() {
    const route = useRoute();
    const router = useRouter();
    const recipeId = route.params.recipeId;
    const myRecipeMode = route.params.myRecipeMode;

    if (!recipeId) {
      router.replace('/NotFound');
      return;
    }

    try {
      this.recipe = await getRecipeFromCacheOrFetch(recipeId, myRecipeMode, () =>
        window.axios.get(`/recipes/${recipeId}`).then(res => res.data)
      );
    } catch (err) {
      router.replace('/NotFound');
    }
  }
}
</script>

<style scoped>
.wrapper   { display: flex; flex-wrap: wrap; gap: 1rem; }
.wrapped   { width: 50%; }
.center    { display: block; margin: 0 auto; max-width: 90%; }
</style>
