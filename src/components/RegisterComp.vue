<script setup>
// Importerer nødvendige Vue funktioner
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// Importerer Firebase authication og firestore funktioner
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Opretter variabler til registreringsformularen
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const registerErrorMessages = ref([]);
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

// Definerer krav til adgangskode med regex
const passwordRegex = {
  lowercase: /[a-z]/,    // Skal indeholde små bogstaver
  uppercase: /[A-Z]/,    // Skal indeholde store bogstaver
  number: /\d/,          // Skal indeholde tal
  special: /[@$!%*?&]/,  // Skal indeholde specialtegn
  length: /.{16,}/,      // Skal være mindst 16 tegn
};

// Holder styr på om hvert krav til adgangskoden er opfyldt
const validationStates = ref({
  lowercase: false,
  uppercase: false,
  number: false,
  special: false,
  length: false,
});

// Holder styr på hvilke felter brugeren har interageret med
const touchedFields = ref({
  password: false,
  confirmPassword: false,
});

// Funktion der tjekker om adgangskoden opfylder alle krav
const validatePassword = () => {
  // Tjekker hvert krav mod adgangskoden
  validationStates.value.lowercase = passwordRegex.lowercase.test(password.value);
  validationStates.value.uppercase = passwordRegex.uppercase.test(password.value);
  validationStates.value.number = passwordRegex.number.test(password.value);
  validationStates.value.special = passwordRegex.special.test(password.value);
  validationStates.value.length = passwordRegex.length.test(password.value);

  // Samler eventuelle fejlbeskeder
  registerErrorMessages.value = [];
  if (!validationStates.value.lowercase) registerErrorMessages.value.push('Password must contain a lowercase letter.');
  if (!validationStates.value.uppercase) registerErrorMessages.value.push('Password must contain an uppercase letter.');
  if (!validationStates.value.number) registerErrorMessages.value.push('Password must contain a number.');
  if (!validationStates.value.special) registerErrorMessages.value.push('Password must contain a special character.');
  if (!validationStates.value.length) registerErrorMessages.value.push('Password must be at least 16 characters long.');
};

// Tjekker om adgangskoden er gyldig (alle krav er opfyldt)
const isPasswordValid = computed(() =>
  Object.values(validationStates.value).every((state) => state),
);

// Hovedfunktion til at registrere en ny bruger
const register = async () => {
  validatePassword();

  // Tjekker om adgangskoden er gyldig
  if (!isPasswordValid.value) return;

  // tjekker om adgangskoderne matcher, hvis ikke returneres en fejlbesked
  if (password.value !== confirmPassword.value) {
    registerErrorMessages.value = ['Passwords do not match.'];
    return;
  }

  try {
    // Opretter bruger i Firebase
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);

    // Gemmer brugerdata i Firestore
    await setDoc(doc(db, 'users', user.uid), {
      role: 'user',
      name: name.value,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    // Sender brugeren til dashboard
    router.push('/dashboard');
  } catch (error) {
    // Håndterer fejl under registrering
    if (error.code === 'auth/invalid-email') {
      registerErrorMessages.value = ['Invalid email address.'];
    } else {
      registerErrorMessages.value = ['An error occurred. Please try again.'];
    }
    console.error('Register error:', error);
  }
};

// Funktion der sender brugeren til login siden
const login = () => {
  console.log('Redirect to login page');
  router.push('/login');
};
</script>

<template>
  <div class="authentication">
    <div class="authentication__container">
      <h1 class="authentication__title">Opret Bruger</h1>
      <form class="authentication__form" @submit.prevent="register">
        <div class="authentication__form-group">
          <input
            type="text"
            id="name"
            v-model="name"
            required
          />
          <label for="name">Navn</label>
        </div>
        <div class="authentication__form-group">
          <input
            type="email"
            id="email"
            v-model="email"
            required
          />
          <label for="email">Email</label>
        </div>
        <div class="authentication__form-group">
          <input
            v-model="password"
            type="password"
            @input="validatePassword"
            @blur="() => { touchedFields.password = true; validatePassword(); }"
            required
          />
          <label for="password">Adgangskode</label>
        </div>
        <div class="authentication__form-group">
          <input
            v-model="confirmPassword"
            type="password"
            @blur="touchedFields.confirmPassword = true"
            required
          />
          <label for="confirm-password">Gentag Adgangskode</label>
        </div>
        <ul class="authentication__error" v-if="registerErrorMessages.length > 0">
          <li v-for="(msg, index) in registerErrorMessages" :key="index">{{ msg }}</li>
        </ul>
        <div class="button-group">
          <button class="button--secondary" type="button" @click="login">Annuller</button>
          <button class="button--primary" type="submit">Opret Bruger</button>
        </div>
    </form>
    </div>
  </div>
</template>
