<!-- src/App.vue -->
<script setup>
import { useUserProfile } from '@/composables/useUserProfile';

const { profileReady } = useUserProfile();
</script>

<template>
  <div v-if="!profileReady">Loading…</div>
  <div v-else>
    <!-- your normal app goes here -->
    <router-view/>
  </div>
</template>