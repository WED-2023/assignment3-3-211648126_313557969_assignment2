<template>
  <div class="container" v-if="recipe">
    <div class="recipe-header mt-3 mb-4 text-center">
      <h1>{{ recipe.title }}</h1>
      <img v-if="recipe.image" :src="recipe.image" class="center" />
    </div>

    <div class="recipe-body">
      <div class="recipe-info-strip">
        <span class="pill">⏱ Ready in {{ recipe.prep_time ?? recipe.duration }} minutes</span>
        <span class="pill">🍽 Servings: {{ recipe.servings }}</span>
        <span class="pill" v-if="recipe.vegan ?? recipe.is_vegan">🌱 Vegan&nbsp;</span>
        <span class="pill" v-if="recipe.vegetarian ?? recipe.is_vegetarian">🥬 Vegetarian&nbsp;</span>
        <span class="pill" v-if="recipe.glutenFree ?? recipe.is_gluten_free">🌾 GF</span>
      </div>

      <div class="recipe-grid">
        <!-- Ingredients -->
        <section class="section-card">
          <header class="section-header">
            <h5 class="section-title">🧂 Ingredients</h5>
          </header>

          <ul v-if="recipe.ingredients?.length" class="list ingredients-list">
            <li v-for="(ing, idx) in recipe.ingredients" :key="idx" class="list-item">
              {{ ing }}
            </li>
          </ul>
          <p v-else class="muted">No ingredients provided.</p>
        </section>

        <!-- Steps -->
        <section class="section-card">
          <header class="section-header">
            <h5 class="section-title">👨‍🍳 Steps</h5>
          </header>

          <ol v-if="recipe.steps?.length" class="list steps-list">
            <li v-for="(step, idx) in recipe.steps" :key="idx" class="list-item step-item">
              <div class="step-badge">{{ idx + 1 }}</div>
              <div class="step-text">{{ step }}</div>
            </li>
          </ol>
          <p v-else class="muted">No steps provided.</p>
        </section>
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
    console.log("Showing recipe id: ", recipeId)
    if (!recipeId) {
      router.replace('/NotFound');
      return;
    }

    try {
      this.recipe = await getRecipeFromCacheOrFetch(recipeId, () =>
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

.recipe-info-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0 18px;
  justify-content: center;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: #f7f9fc;
  border: 1px solid #e6edf3;
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
}

/* two-column responsive layout */
.recipe-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 900px) {
  .recipe-grid { grid-template-columns: 1fr; }
}

/* card look for sections */
.section-card {
  background: #ffffff;
  border: 1px solid #e8eef5;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(16, 24, 40, 0.06);
  padding: 16px 18px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

/* lists */
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ingredients-list .list-item {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px dashed #e8eef5;
  background: #fbfdff;
  color: #1f2937;
  margin-bottom: 8px;
}

/* steps with numbered badges */
.steps-list {
  counter-reset: step; /* not required with explicit badge, but keeps options open */
}

.step-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #eef2f7;
  background: #fcfeff;
  margin-bottom: 10px;
}

.step-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0ea5e9;
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
  line-height: 1;
}

.step-text {
  color: #1f2937;
}

/* misc */
.muted {
  color: #6b7280;
  margin: 4px 0 0;
}

.recipe-header {
  text-align: center;
  margin: 24px 0;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e8eef5;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(16, 24, 40, 0.06);
}

.recipe-header h1 {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  font-family: "Georgia", serif;
}

.recipe-header img.center {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

</style>
