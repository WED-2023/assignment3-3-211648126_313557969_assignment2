<template>
  <div class="register-page">
    <h1 class="text-center mb-4">Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Username:</label>
        <input v-model="state.username" type="text" class="form-control" />
        <div v-if="v$.username.$error" class="text-danger">
          Username must be 3–8 alphabetic characters.
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label>First Name:</label>
          <input v-model="state.firstName" type="text" class="form-control" />
        </div>
        <div class="form-group col">
          <label>Last Name:</label>
          <input v-model="state.lastName" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label>Country:</label>
        <select v-model="state.country" class="form-control">
          <option disabled value="">Select country</option>
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
        <div v-if="v$.country.$error" class="text-danger">
          Please select a country.
        </div>
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input v-model="state.password" type="password" class="form-control" />
        <div v-if="v$.password.$error" class="text-danger">
          Password must be 5–10 characters, include a number and a special character.
        </div>
      </div>

      <div class="form-group">
        <label>Confirm Password:</label>
        <input v-model="state.confirmPassword" type="password" class="form-control" />
        <div v-if="v$.confirmPassword.$error" class="text-danger">
          Passwords must match.
        </div>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="state.email" type="email" class="form-control" />
        <div v-if="v$.email.$error" class="text-danger">
          A valid email is required.
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-block mt-3">Register</button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, email, sameAs} from '@vuelidate/validators';

const alphaOnly = helpers.regex(/^[A-Za-z]{3,8}$/);
const strongPassword = helpers.regex(/^(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W]{5,10}$/);

export default {
  name: "RegisterPage",
  setup(_, { expose }) {
    const state = reactive({
      username: '',
      firstName: '',
      lastName: '',
      country: '',
      password: '',
      confirmPassword: '',
      email: '',
    });

    const rules = {
      username: { required, alphaOnly },
      firstName: { required },
      lastName: { required },
      country: { required },
      password: { required, strongPassword },
      confirmPassword: { required, sameAsPassword: sameAs(() => state.password) },
      email: { required, email },
    };

    const v$ = useVuelidate(rules, state);

    const countries = reactive([]);

    onMounted(async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await res.json();
        if (Array.isArray(data)) {
          countries.push(...data.map(c => c.name.common).sort());
        } else {
          console.error("Invalid response from countries API", data);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    });

    const register = async () => {
      if (await v$.value.$validate()) {
        try {
          await window.axios.post('/register', state);
          window.toast("Registration Successful", "You can now login", "success");
          window.router.push('/login');
        } catch (err) {
          window.toast("Registration failed", err.response.data.message, "danger");
        }
      }
    };

    expose({ register });
    return { state, v$, register, countries };
  }
};
</script>

<style scoped>
.register-page {
  max-width: 500px;
  margin: auto;
  padding-top: 30px;
}
</style>
