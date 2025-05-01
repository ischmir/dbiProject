<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import IconsComp from './IconsComp.vue';

const auth = getAuth();
const router = useRouter();

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('User successfully logged out');
      localStorage.removeItem('token');
      router.push('/login');
    })
    .catch((error) => {
      console.error('Error logging out:', error.message);
    });
};
</script>

<template>
  <IconsComp @click="logout" class="header__button-icon" iconName="logout" />
</template>