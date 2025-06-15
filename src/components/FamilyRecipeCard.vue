<template>
  <article class="card">
    <div class="card-body">
      <h2 class="card-title">{{ recipe.title }}</h2>
      <img :src="recipe.image" :alt="recipe.title" class="card-img" />
      <p class="card-meta"><strong>Occasion:</strong> {{ recipe.occasion }}</p>
      <p class="card-meta"><strong>Originator:</strong> {{ recipe.originator_name }}</p>
      <h3 class="card-sub">Ingredients</h3>
      <ul class="list-disc list-inside text-sm mb-3">
        <li v-for="(ing, i) in parsedIngredients" :key="i">{{ ing }}</li>
      </ul>
      <h3 class="card-sub">Instructions</h3>
      <p class="text-sm whitespace-pre-line">{{ recipe.instructions }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  recipe: { type: Object, required: true }
})

const parsedIngredients = computed(() => {
  return props.recipe.ingredients.split('\n').filter(Boolean)
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.card-body {
  padding: 1rem;
  flex: 1;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}
.card-meta {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 0.25rem;
}
.card-sub {
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}
</style>
