<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '@/configs/firebase.js';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstname = ref('');
const surname = ref('');
const phone = ref('');
const registerErrorMessage = ref('');
const router = useRouter();

const login = () => {
  console.log('Redirect to login page');
  router.push('/login');
};

const register = () => {
  if (password.value !== confirmPassword.value) {
    registerErrorMessage.value = 'Passwords do not match.';
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      registerErrorMessage.value = ''; // Clear error message on success
      router.push('/dashboard'); // Redirect to dashboard or another page
      console.log('User registered:', user);
    })
    .catch((error) => {
      switch (error.code) {
      case 'auth/email-already-in-use':
        registerErrorMessage.value = 'Email is already in use.';
        break;
      case 'auth/invalid-email':
        registerErrorMessage.value = 'Invalid email address.';
        break;
      case 'auth/weak-password':
        registerErrorMessage.value = 'Password is too weak.';
        break;
      default:
        registerErrorMessage.value = 'An error occurred. Please try again.';
      }
      console.error('Error registering user:', error.code, error.message);
    });
};
</script>

<template>
  <div class="authentication">
    <div class="authentication__container">
      <h1 class="authentication__title">Registrer</h1>
      <form class="authentication__form" @submit.prevent="register">
        <div class="authentication__form-group">
          <input type="text" id="firstname" v-model="firstname" required />
          <label for="firstname">Fornavn</label>
        </div>
        <div class="authentication__form-group">
          <input type="text" id="surname" v-model="surname" required />
          <label for="surname">Efternavn</label>
        </div>
        <div class="authentication__form-group">
          <input type="email" id="email" v-model="email" required />
          <label for="email">Email</label>
        </div>
        <div class="authentication__form-group">
          <input type="number" id="phone" v-model="phone" required />
          <label for="phone">tlf. nummer</label>
        </div>
        <div class="authentication__form-group">
          <input type="password" id="password" v-model="password" required />
          <label for="password">Adgangskode</label>
        </div>
        <div class="authentication__form-group">
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
          <label for="confirm-password">Gentag adgangskode</label>
        </div>
        <p v-if="registerErrorMessage" class="authentication__error">{{ registerErrorMessage }}</p>
        <div class="authentication__buttons">
          <button class="authentication__register-button" type="button" @click="login">Annuller</button>
          <button class="authentication__submit-button" type="submit">Opret bruger</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// scoped styles for the authentication component
.authentication {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--background-color);
}

.authentication__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  border-radius: 4px;
  background-color: var(--primary-color);
}

.authentication__form-group {
  position: relative;
  margin-bottom: 1.5rem;

  input {
    width: 20rem;
    padding: 1.5rem 0.5rem 0.5rem 0.5rem;
    border: 1px solid var(--placeholder-text-inactive-text);
    border-radius: 4px;
    outline: none;
    font-size: 1rem;
  }

  input:focus {
    border-color: var(--cta-button-forms-strokes);
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem);
    font-size: 0.8rem;
    color: var(--headlines-paragraphs);
  }

  label {
    position: absolute;
    top: 60%;
    left: 0.5rem;
    transform: translateY(-50%);
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
  }
}

.authentication__buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.authentication__submit-button {
  width: -webkit-fill-available;
  height: 3rem;
  margin-left: 1vh;
  border: none;
  border-radius: 4px;
  background-color: var(--cta-button-forms-strokes);
  color: var(--forms-charts);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--cta-button-hover-background);
  }
}

.authentication__register-button {
  width: -webkit-fill-available;
  height: 3rem;
  margin-right: 1vh;
  border: solid 1px var(--cta-button-forms-strokes);
  border-radius: 4px;
  background-color: var(--forms-charts);
  color: var(--cta-button-hover-background);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--cta-button-light-hover);
  }
}

.authentication__error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Hide spinner controls for number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
}
</style>