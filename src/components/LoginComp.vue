<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loginErrorMessage = ref('');
const router = useRouter();
const auth = getAuth();

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      loginErrorMessage.value = '';
      router.push('/');
      console.log('User successfully logged in:', user);
    })
    .catch((error) => {
      switch (error.code) {
      case 'auth/user-not-found':
        loginErrorMessage.value = 'User not found. Please register.';
        break;
      case 'auth/wrong-password':
        loginErrorMessage.value = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        loginErrorMessage.value = 'Invalid email address.';
        break;
      default:
        loginErrorMessage.value = 'An error occurred. Please try again.';
      }
      console.error('Error logging in:', error.code);
    });
};

const register = () => {
  console.log('Redirect to registration page');
  router.push('/register');
};
</script>

<template>
  <div class="login">
    <div class="login__container">
      <h1 class="login__title">Login</h1>
      <form class="login__form" @submit.prevent="login">
        <div class="login__form-group">
          <input type="email" id="email" v-model="email" required />
          <label for="email">Email</label>
        </div>
        <div class="login__form-group">
          <input type="password" id="password" v-model="password" required />
          <label for="password">Password</label>
        </div>
        <p v-if="loginErrorMessage" class="login__error">{{ loginErrorMessage }}</p>
      </form>
      <div class="login__buttons">
        <button class="login__register-button" type="button" @click="register">Register</button>
        <button class="login__submit-button" type="submit">Login</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--background-color);
}

.login__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: auto;
    padding: 4rem;
    border-radius: 4px;
    background-color: var(--primary-color);
}

.login__form-group {
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

.login__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.login__submit-button {
    width: -webkit-fill-available;
    padding: 1.5rem;
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
.login__register-button {
    width: -webkit-fill-available;
    padding: 1.5rem;
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

.login__error {
    color: red;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}
</style>