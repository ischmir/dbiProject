<script setup>
// Importerer nødvendige Vue funktioner og komponenter
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '@/stores/userStore';

// Opretter reaktive variabler til login formular
const email = ref('');
const password = ref('');
const loginErrorMessage = ref('');

// Initialiserer Firebase auth og router
const auth = getAuth();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// Login funktion der håndterer bruger login
const login = async () => {
  try {
    // Prøver at logge ind med email og password
    await signInWithEmailAndPassword(auth, email.value, password.value);

    // Rydder eventuelle fejlbeskeder
    loginErrorMessage.value = '';

    // Update the user store with the logged-in user
    await userStore.init();

    // Finder den side brugeren skal redirectes til efter login
    const redirectPath = route.query.redirect || '/dashboard';

    // Redirecter brugeren
    router.replace(redirectPath);
  } catch (error) {
    // Håndterer forskellige login fejl
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
      loginErrorMessage.value = 'Forkert email eller adgangskode.';
    } else {
      loginErrorMessage.value = 'Noget gik galt. Prøv igen.';
    }
  }
};

// Funktion der sender brugeren til registreringssiden
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
          <label for="password">Adgangskode</label>
        </div>
        <p v-if="loginErrorMessage" class="authentication__error">{{ loginErrorMessage }}</p>
        <div class="button-group">
          <button class="button--secondary" type="button" @click="register">Opret Bruger</button>
          <button class="button--primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>