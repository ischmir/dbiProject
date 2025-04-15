<template>
  <div class="layout">
    <HeaderComp />
    <NavComp />
    <main class="layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import NavComp from '@/components/NavComp.vue';
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout__content {
  flex: 1;
  overflow-y: auto;
}
</style>
