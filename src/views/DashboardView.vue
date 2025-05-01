<script setup>
import { ref } from 'vue';
import CreateFormModalComp from '@/components/CreateFormModalComp.vue';

const isModalVisible = ref(false); // Control the visibility of the modal

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <button @click="openModal">Opret Skema</button>

    <!-- Show the modal when isModalVisible is true -->
    <CreateFormModalComp v-if="isModalVisible" @close="closeModal" />
  </div>
</template>

<style scoped>
.dashboard {
  padding: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: darkblue;
}
</style>
