<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import NavComp from '@/components/NavComp.vue';
import MainComp from '@/components/MainComp.vue';
</script>

<template>
  <div class="layout-grid">
    <HeaderComp class="header-comp" />
    <NavComp class="nav-comp" />
    <MainComp class="main-comp" />
  </div>
</template>

<style scoped>
.layout-grid {
  display: grid;
  grid-template-columns: repeat(16, minmax(50px, 1fr)); /* Columns scale between 50px and 1fr */
  grid-template-rows: auto 1fr; /* Header takes auto height, rest fills */
  grid-template-areas:
    "header header header header header header header header header header header header header header header header"
    "nav nav nav main main main main main main main main main main main main main";
  gap: 1vh; /* Responsive gap between rows and columns */
  height: calc(100vh - 2vh); /* Full viewport height minus 12px margin on top and bottom */
}

.header-comp {
  grid-area: header; /* Header spans the entire top row */
  box-sizing: border-box; /* Include padding in height calculation */
}

.nav-comp {
  grid-area: nav; /* Navigation spans 4 columns */
}

.main-comp {
  grid-area: main; /* Main content spans the remaining 12 columns */
  overflow-y: auto; /* Allow scrolling for main content */
}
</style>
