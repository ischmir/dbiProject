<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '@/stores/userStore';

const email = ref('');
const password = ref('');
const loginErrorMessage = ref('');
const auth = getAuth();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);

    loginErrorMessage.value = '';

    // Update the user store with the logged-in user
    await userStore.init();

    const redirectPath = route.query.redirect || '/dashboard';

    router.replace(redirectPath);
  } catch (error) {
    console.log(error);
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/invalid-credential'
    ) {
      loginErrorMessage.value = 'Forkert email eller adgangskode.';
    } else {
      loginErrorMessage.value = 'Noget gik galt. Prøv igen.';
    }
  }
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
            data-cy="login-email"
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
            data-cy="login-password"
          />
          <label for="password">Adgangskode</label>
        </div>
        <p v-if="loginErrorMessage" class="authentication__error">{{ loginErrorMessage }}</p>
        <div class="button-group">
          <button class="button--secondary" type="button" data-cy="register-link" @click="register">Opret Bruger</button>
          <button class="button--primary" type="submit" data-cy="login-submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>