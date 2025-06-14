<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />

        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />

        <button type="submit">Login</button>

        <p class="register-text">
          Not registered?
          <router-link to="/register">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    console.log("username: ", username)
    console.log("pass: ",password)
    const response = await window.axios.post('/login', {
      username: username.value,
      password: password.value
    })
    console.log('Login successful:', response.data)
    router.push('/') // redirect after login
  } catch (error) {
    alert('Login failed')
    console.log(error)
  }
}
</script>

<style scoped>
.login-page {
  /* background: url('@/assets/7aaba0b3-2d24-40e9-96b9-d5179789f148.png') no-repeat center center fixed;
  background-size: cover; */
  /* min-height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
}

.login-card {
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-card label {
  display: block;
  margin: 0.5rem 0 0.2rem;
  font-weight: bold;
}

.login-card input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.login-card button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.login-card button:hover {
  background-color: #0056b3;
}

.register-text {
  margin-top: 1rem;
  text-align: center;
}

.register-text a {
  color: #007bff;
  text-decoration: none;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
