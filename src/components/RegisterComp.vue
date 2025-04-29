<script setup>
import { ref, computed } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '@/configs/firebase.js';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const registerErrorMessages = ref([]);
const router = useRouter();

// Password validation regex
const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /\d/,
  special: /[@$!%*?&]/,
  length: /.{16,}/,
};

// Reactive validation states
const validationStates = ref({
  lowercase: false,
  uppercase: false,
  number: false,
  special: false,
  length: false,
});

// Track if the fields have been touched
const touchedFields = ref({
  password: false,
  confirmPassword: false,
});

// Watch password input and update validation states
const validatePassword = () => {
  validationStates.value.lowercase = passwordRegex.lowercase.test(password.value);
  validationStates.value.uppercase = passwordRegex.uppercase.test(password.value);
  validationStates.value.number = passwordRegex.number.test(password.value);
  validationStates.value.special = passwordRegex.special.test(password.value);
  validationStates.value.length = passwordRegex.length.test(password.value);

  // Update error messages for password validation
  registerErrorMessages.value = [];
  if (!validationStates.value.lowercase) registerErrorMessages.value.push('Password must contain a lowercase letter.');
  if (!validationStates.value.uppercase) registerErrorMessages.value.push('Password must contain an uppercase letter.');
  if (!validationStates.value.number) registerErrorMessages.value.push('Password must contain a number.');
  if (!validationStates.value.special) registerErrorMessages.value.push('Password must contain a special character.');
  if (!validationStates.value.length) registerErrorMessages.value.push('Password must be at least 16 characters long.');
};

const isPasswordValid = computed(() =>
  Object.values(validationStates.value).every((state) => state),
);

const login = () => {
  console.log('Redirect to login page');
  router.push('/login');
};

const register = () => {
  validatePassword();

  if (!isPasswordValid.value) {
    return; // Password validation errors are already in `registerErrorMessages`
  }

  if (password.value !== confirmPassword.value) {
    registerErrorMessages.value = ['Passwords do not match.'];
    return;
  }

  createUserWithEmailAndPassword(auth, name.value, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      registerErrorMessages.value = [];
      router.push('/dashboard');
      console.log('User registered:', user);
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        registerErrorMessages.value = ['Invalid email address.'];
      } else {
        registerErrorMessages.value = ['An error occurred. Please try again.'];
      }
      console.error('Error registering user:', error.code);
    });
};
</script>

<template>
  <div class="authentication">
    <div class="authentication__container">
      <h1 class="authentication__title">Registrer</h1>
      <form class="authentication__form" @submit.prevent="register">
        <div class="authentication__form-group">
          <input type="text" id="name" v-model="name" required />
          <label for="name">Navn</label>
        </div>
        <div class="authentication__form-group">
          <input type="email" id="email" v-model="email" required />
          <label for="email">Email</label>
        </div>
        <div class="authentication__form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            @input="validatePassword"
            @blur="() => { touchedFields.password = true; validatePassword(); }"
            required
          />
          <label for="password">Adgangskode</label>
        </div>
        <div class="authentication__form-group">
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            @blur="touchedFields.confirmPassword = true"
            required
          />
          <label for="authentication__confirm-password">Gentag adgangskode</label>
        </div>
        <div id="authentication__message" v-if="touchedFields.password || registerErrorMessages.length > 0">
          <ul class="authentication__error">
            <li v-for="(message, index) in registerErrorMessages" :key="index">
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="button-group">
          <button class="button--secondary" type="button" @click="login">Annuller</button>
          <button class="button--primary" type="submit">Opret bruger</button>
        </div>
      </form>
    </div>
  </div>
</template>