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
          <label for="confirm-password">Gentag adgangskode</label>
        </div>
        <div id="message" v-if="touchedFields.password || registerErrorMessages.length > 0">
          <ul class="authentication__error">
            <li v-for="(message, index) in registerErrorMessages" :key="index" class="authentication__invalid">
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

<style lang="scss" scoped>
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

.authentication__title {
  margin-bottom: 1rem;
}

.authentication__form-group {
  position: relative;
  margin-bottom: 1.5rem;

  input {
    width: 22rem;
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

.button-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.button--primary {
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

.button--secondary {
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
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  list-style: none;
  padding: inherit;
}

#authentication__message {
  margin-top: 1rem;
}

.password_contains {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

#authentication__message p {
  font-size: 0.8rem;
  margin: 0.2rem 0;
}

.invalid {
  color: red;
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