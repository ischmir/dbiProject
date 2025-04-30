<template>
  <div class="authentication">
    <div class="authentication__container" v-if="!loading">
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
            @blur="() => { touched.password = true; validatePassword(); }"
            required
          />
          <label for="password">Adgangskode</label>
        </div>
        <div class="authentication__form-group">
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            @blur="touched.confirm = true"
            required
          />
          <label for="confirm-password">Gentag adgangskode</label>
        </div>
        <div class="authentication__message" v-if="touched.password || registerErrorMessages.length">
          <ul class="authentication__error">
            <li v-for="(msg, i) in registerErrorMessages" :key="i">{{ msg }}</li>
          </ul>
        </div>
        <div class="button-group">
          <button type="button" class="button--secondary" @click="goLogin">Annuller</button>
          <button type="submit" class="button--primary" :disabled="loading">Opret bruger</button>
        </div>
      </form>
    </div>
    <div v-else class="authentication__loading">
      <p>Registrantion in progress…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Reactive form fields
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const registerErrorMessages = ref([]);
const loading = ref(false);
const touched = ref({ password: false, confirm: false });

const router = useRouter();
const auth = getAuth();
const db = getFirestore();

// Password validation rules
const rules = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number:    /\d/,
  special:   /[@$!%*?&]/,
  length:    /.{16,}/,
};
const valid = ref({ lowercase: false, uppercase: false, number: false, special: false, length: false });

function validatePassword() {
  valid.value.lowercase = rules.lowercase.test(password.value);
  valid.value.uppercase = rules.uppercase.test(password.value);
  valid.value.number    = rules.number.test(password.value);
  valid.value.special   = rules.special.test(password.value);
  valid.value.length    = rules.length.test(password.value);

  registerErrorMessages.value = [];
  if (!valid.value.lowercase) registerErrorMessages.value.push('Må indeholde små bogstaver');
  if (!valid.value.uppercase) registerErrorMessages.value.push('Må indeholde STORE bogstaver');
  if (!valid.value.number)    registerErrorMessages.value.push('Må indeholde tal');
  if (!valid.value.special)   registerErrorMessages.value.push('Må indeholde specialtegn');
  if (!valid.value.length)    registerErrorMessages.value.push('Mindst 16 tegn');
}

const isPasswordValid = computed(() => Object.values(valid.value).every(v => v));

function goLogin() {
  router.push('/login');
}

async function register() {
  registerErrorMessages.value = [];

  if (!isPasswordValid.value) return;
  if (password.value !== confirmPassword.value) {
    registerErrorMessages.value = ['Adgangskoder matcher ikke'];
    return;
  }

  loading.value = true;
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // Create profile doc
    await setDoc(doc(db, 'users', user.uid), {
      role: 'user',
      name: name.value,
      email: user.email,
      createdAt: serverTimestamp(),
    });
    // Force token refresh
    await user.getIdTokenResult(true);
    router.push('/dashboard');
  } catch (err) {
    const code = err.code;
    if (code === 'auth/email-already-in-use') {
      registerErrorMessages.value = ['Email er allerede registreret'];
    } else if (code === 'auth/invalid-email') {
      registerErrorMessages.value = ['Ugyldig email'];
    } else {
      registerErrorMessages.value = ['Noget gik galt, prøv igen'];
    }
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
