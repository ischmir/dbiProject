<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout />
</template>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr); /* 16 equal columns */
  grid-template-rows: auto 1fr; /* Header takes auto height, rest fills */
  gap: 16px; /* Adjust spacing between rows and columns */
}

.header-comp {
  grid-column: span 16; /* Header spans all 16 columns */
}

.nav-comp {
  grid-column: span 4; /* NavComp spans 4 columns */
}

.main-comp {
  grid-column: span 12; /* MainComp spans 12 columns */
}

.mainBody__container {
  padding: 16px;
}
</style>
