<template>
 <RecipeCreateModal
  v-if="show"
  @close="handleClose"
  @created="onCreated"
  @error="handleClose"
  ></RecipeCreateModal>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RecipeCreateModal from '@/components/RecipeCreateModal.vue' // adjust path

// state
const show = ref(true) // when you navigate here, modal starts open

// router (optional: to go back to list after close/create)
const router = useRouter()

// handle created event
function onCreated() {
  alert('Recipe created successfully!')
  show.value = false
  router.back()
}

function handleClose() {
  show.value = false
  router.back()                    // or router.push({ name: 'recipes' })
}
</script>