<script setup>
import '@fontsource/montserrat';
</script>

<template>
  <div>
    <router-view />
    <!-- Render the current route -->
  </div>
</template>

<style>
/* global styles */
body {
  font-family: "Montserrat", sans-serif;
}

html {
  font-size: 16px;
}

h1 {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 3rem; /* 48px / 16 = 3rem */
  line-height: 3.75rem; /* 60px / 16 = 3.75rem */
  letter-spacing: 0%;
  vertical-align: middle;
}

h2 {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 2rem; /* 32px / 16 = 2rem */
  line-height: 2.5rem; /* 40px / 16 = 2.5rem */
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}

h3 {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1.5rem; /* 24px / 16 = 1.5rem */
  line-height: 2.25rem; /* 36px / 16 = 2.25rem */
  letter-spacing: 0%;
  vertical-align: middle;
}

p {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1rem; /* 16px / 16 = 1rem */
  line-height: 1.5rem; /* 24px / 16 = 1.5rem */
  letter-spacing: 0%;
  vertical-align: middle;
}
</style>
