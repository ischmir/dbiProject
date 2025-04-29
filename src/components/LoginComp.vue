<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { auth } from '@/configs/firebase.js';

const email = ref('');
const password = ref('');
const loginErrorMessage = ref('');
const router = useRouter();
const route = useRoute();

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      loginErrorMessage.value = '';

      // Store the token in localStorage
      user.getIdToken().then((token) => {
        localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', token);

        const redirectPath = route.query.redirect || '/dashboard';
        router.push(redirectPath);
      });

      console.log('User successfully logged in:', user);
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        loginErrorMessage.value = 'User not found. Please register.';
      } else {
        loginErrorMessage.value = 'An error occurred. Please try again.';
      }
      console.error('Error registering user:', error.code);
    });
};

const register = () => {
  console.log('Redirect to registration page');
  router.push('/register');
};
</script>

<template>
  <div class="authentication">
    <div class="authentication__container">
      <h1 class="authentication__title">Login</h1>
      <form class="authentication__form" @submit.prevent="login">
        <div class="authentication__form-group">
          <input
            type="email"
            id="email"
            v-model="email"
            autocomplete="email"
            required
          />
          <label for="email">Email</label>
        </div>
        <div class="authentication__form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="current-password"
            required
          />
          <label for="password">Password</label>
        </div>
        <p v-if="loginErrorMessage" class="authentication__error">{{ loginErrorMessage }}</p>
        <div class="button-group">
          <button class="button--secondary" type="button" @click="register">Register</button>
          <button class="button--primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>