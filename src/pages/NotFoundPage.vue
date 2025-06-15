<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page not found</h2>
    <img src="/Assets/SmileyPlate.jpg" alt="Smiley Plate" class="not-found-image" />
    <p>Sorry, we couldn't find the page.</p>
    <router-link to="/" class="back-button">Back to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fdf9f6;
  padding: 2rem;
  text-align: center;
  font-family: 'Georgia', serif;
  color: #3a3a3a;
}

h1 {
  font-size: 6rem;
  margin: 0;
}

h2 {
  font-size: 2rem;
  margin: 0.5rem 0 1rem;
}

.not-found-image {
  width: 200px;
  margin: 1.5rem 0;
  /* border-radius: 50%; */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: 2rem;
}

.back-button {
  background-color: #e94e36;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #c93e2a;
}
</style>
