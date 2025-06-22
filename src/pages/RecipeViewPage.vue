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

export default {
  
  data () {
    return { recipe: null }
  },
  created () {
    const route = useRoute();
    const router = useRouter();
    const passed = route?.state?.recipe;
    console.log("router : ", router)
    console.log("route : ", route)
    console.log("passed : ", passed)
    console.log("Passed recipe : " ,passed)
    if (!passed) {
       router.replace('/NotFound');
      return
    }
    this.recipe = passed
  }
}
</script>

<style scoped>
.wrapper   { display: flex; flex-wrap: wrap; gap: 1rem; }
.wrapped   { width: 50%; }
.center    { display: block; margin: 0 auto; max-width: 90%; }
</style>
