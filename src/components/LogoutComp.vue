<!-- Logout Component -->
<script setup>
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import { useRouter } from 'vue-router';
import IconsComp from './IconsComp.vue';

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

<style scoped>
 /* Scoped styles for LogoutComp */
</style>
