<template>
  <!-- Full‑screen backdrop -->
  <div class="modal-backdrop">
    <div class="modal-panel">
      <div class="modal-header">
        <h2 class="text-lg font-semibold">Create New Recipe</h2>
        <!-- console.log for debugging + proper reactive prop -->
        <button class="close" @click="handleClose">&times;</button>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- BASIC DETAILS -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label" for="title">Title</label>
            <input id="title" v-model="form.title" required class="form-input" />
          </div>
          <div>
            <label class="form-label" for="image">Upload Image</label>
            <input id="image" type="file" accept="image/*" @change="handleFileUpload" class="form-input" />
          </div>
          <div>
            <label class="form-label" for="duration">Duration (min)</label>
            <input id="duration" v-model.number="form.duration" type="number" min="1" class="form-input" />
          </div>
          <div>
            <label class="form-label" for="servings">Servings</label>
            <input id="servings" v-model.number="form.servings" type="number" min="1" class="form-input" />
          </div>
        </div>

        <!-- TOGGLES -->
        <div class="flex flex-wrap gap-4">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="form.vegan" /> Vegan
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="form.vegetarian" /> Vegetarian
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="form.glutenFree" /> Gluten‑Free
          </label>
        </div>

        <!-- INGREDIENTS -->
        <div>
          <h3 class="section-title">Ingredients</h3>
          <div v-for="(ing, i) in form.ingredients" :key="`ing-${i}`" class="input-row">
            <input v-model="form.ingredients[i]" placeholder="e.g. 2 cups flour" class="flex-1 form-input" />
            <button type="button" class="btn-secondary" @click="removeIngredient(i)">✕</button>
          </div>
          <button type="button" class="btn-add" @click="addIngredient">+ Add ingredient</button>
        </div>

        <!-- STEPS -->
        <div>
          <h3 class="section-title">Steps</h3>
          <div v-for="(step, i) in form.steps" :key="`step-${i}`" class="input-row">
            <input v-model="form.steps[i]" placeholder="e.g. Preheat oven..." class="flex-1 form-input" />
            <button type="button" class="btn-secondary" @click="removeStep(i)">✕</button>
          </div>
          <button type="button" class="btn-add" @click="addStep">+ Add step</button>
        </div>

        <!-- SUBMIT -->
        <button type="submit" class="btn-primary w-full">Save Recipe</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

// ---------------------------------------------------------------------------
// Props (keep them reactive with toRefs!)
// ---------------------------------------------------------------------------
// const props = defineProps({ visible: { type: Boolean, default: true } })
// const { visible } = reactive(true) // NOW reactive ✅

// Emits
const emit = defineEmits(['close', 'created','error'])

// debugging helper
// ---------------------------------------------------------------------------
// Reactive Form State
// ---------------------------------------------------------------------------
const form = reactive({
  title: '',
  imageFile: null,
  duration: 0,
  likes: 0,
  vegan: false,
  vegetarian: false,
  glutenFree: false,
  viewed: false,
  ingredients: [''],
  steps: [''],
  servings: 1,
})

const handleClose = () => {
  console.log('Close button clicked')
  emit('close')
  console.log("the form visibility is: ", form.visible)
  // reset();
}
// ---------------------------------------------------------------------------
// Helpers – add/remove rows
// ---------------------------------------------------------------------------
const reset = () => {
  Object.assign(form, {
    title: '',
    imageFile: null,
    duration: 0,
    likes: 0,
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    viewed: false,
    ingredients: [''],
    steps: [''],
    servings: 1,
  })
}
const addIngredient = () => form.ingredients.push('')
const removeIngredient = (i) => form.ingredients.splice(i, 1)
const addStep = () => form.steps.push('')
const removeStep = (i) => form.steps.splice(i, 1)

// Handle file input
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  form.imageFile = file ?? null
}

// ---------------------------------------------------------------------------
// Submit via multipart/form-data
// ---------------------------------------------------------------------------
const handleSubmit = async () => {
  try {
    const data = new FormData()
    data.append('title', form.title)
    data.append('duration', form.duration)
    data.append('servings', form.servings)

    data.append('vegan', form.vegan)
    data.append('vegetarian', form.vegetarian)
    data.append('glutenFree', form.glutenFree)

    data.append('ingredients', JSON.stringify(form.ingredients))
    data.append('steps', JSON.stringify(form.steps))
    if (form.imageFile) data.append('image', form.imageFile)

    await axios.post('/recipes', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    emit('created')
    reset()
    // emit('close')
  } catch (err) {
    console.error('Failed to create recipe:', err)
    alert('Something went wrong while saving the recipe.')
    emit('error')
  }
}
</script>

<style scoped>
/***** layout *****/
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modal-panel {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  max-height: 90vh;
  width: 100%;
  max-width: 42rem;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.close {
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
}
.close:hover {
  color: red;
}
/* form helpers stay unchanged */
.form-label { display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.25rem }
.form-input { width:100%;border-radius:.5rem;border:1px solid #d1d5db;padding:.5rem;outline:none }
.form-input:focus{border-color:#6366f1;box-shadow:0 0 0 1px #6366f1}
.section-title{font-weight:600;margin-bottom:.5rem}
.input-row{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem}
.btn-secondary{padding:.25rem .5rem;border-radius:.5rem;border:1px solid #d1d5db;font-size:.875rem;background:transparent;cursor:pointer}
.btn-secondary:hover{background:#f3f4f6}
.btn-add{font-size:.875rem;color:#4f46e5;background:none;border:none;cursor:pointer}
.btn-add:hover{text-decoration:underline}
.btn-primary{background:#4f46e5;color:#fff;padding:.5rem 1rem;border-radius:.75rem;border:none;cursor:pointer}
.btn-primary:hover{background:#4338ca}
</style>
