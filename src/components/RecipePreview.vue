<template>
  <div class="card h-100 shadow-sm">
    <!-- Recipe picture (clickable) -->
    <div class="image-wrapper" @click="goToRecipe">
      <img
        v-if="localRecipe.image"
        :src="localRecipe.image"
        class="card-img-top recipe-image"
        :alt="`Image of ${localRecipe.title}`"
      />
      <div class="image-overlay" v-if="localRecipe.viewed">👁 Viewed</div>
    </div>

    <!-- Card body -->
    <div class="card-body text-center">
      <h5 class="card-title title-link" @click="goToRecipe">
        {{ localRecipe.title }}
      </h5>

      <p class="text-muted mb-1">⏱ {{ localRecipe.duration }} min</p>

      <p class="flags mb-2">
        <span v-if="localRecipe.vegan">🌱 Vegan&nbsp;</span>
        <span v-else-if="localRecipe.vegetarian">🥬 Vegetarian&nbsp;</span>
        <span v-if="localRecipe.glutenFree">🌾 GF</span>
      </p>

      <!-- Favorite toggle -->
      <button class="fav-btn" :class="{ on: localRecipe.favorite }" @click.stop="toggleFavorite">
        ★
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, watch, getCurrentInstance} from 'vue'

const props = defineProps({
  recipe: { type: Object, required: true }
})

const router = useRouter()
const { appContext }  = getCurrentInstance()
const store  = appContext.config.globalProperties.store
const toast  = appContext.config.globalProperties.toast 

// Create reactive local copy to avoid direct prop mutation
const localRecipe = reactive({ ...props.recipe })

console.log("localRecipe: ", localRecipe)

// Sync prop changes (optional, if recipe can change)
watch(() => props.recipe, (newVal) => {
  Object.assign(localRecipe, newVal)
})

// Save state
const state = reactive({ saving: false })

async function goToRecipe () {

   if (!store.username) {
    toast('Login required', 'Sign-in to track watched recipes', 'info', {
      timeout: 0,    // stays until user closes it
      closeOnClick: false,
      draggable: false
    })
    return 
  }
  try {
    localRecipe.viewed = true
    await window.axios.post('/users/watched', { recipeId:  localRecipe.id ?? localRecipe.recipe_id})
  } finally {
   
    router.push({ name: 'recipe', params: { recipeId:  localRecipe.id ?? localRecipe.recipe_id }})
  }
}

async function toggleFavorite () {
  if (state.saving) return
  if (!store.username) {
    toast('Login required', 'Sign-in to manage favorites', 'info', {
  timeout: 0,    // stays until user closes it
  closeOnClick: false,
  draggable: false
  })
    return
  }
  state.saving = true
  const wasFav = localRecipe.favorite
  localRecipe.favorite = !wasFav

  try {
    await window.axios.post('/users/favorites', { recipeId: localRecipe.id ?? localRecipe.recipe_id })
  } catch (e) {
    localRecipe.favorite = wasFav // rollback
    console.error(e)
  } finally {
    state.saving = false
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  transition: transform 0.15s;
}
.card:hover { transform: translateY(-4px); cursor: pointer; }

/* Image */
.image-wrapper { position: relative; }
.recipe-image  { width: 100%; height: 190px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px; }
.image-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.35);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-weight: bold; border-top-left-radius: 12px; border-top-right-radius: 12px;
}

/* Title link */
.title-link { cursor: pointer; }

/* Flags */
.flags { font-size: 0.9rem; }

/* Favorite star */
.fav-btn {
  background: none; border: none; font-size: 1.4rem; line-height: 1;
  color: #bbb; transition: color 0.2s;
}
.fav-btn.on { color: #ffb400; }
.fav-btn:hover { color: #ffb400; }
</style>