<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout>
    <main class="mainBody">
      <div class="mainBody__container">
        <div class="mainBody__content">
          <h2>Dashboard</h2>
          <p>Welcome to the dashboard!</p>
        </div>
        <div class="mainBody__schedule">
          <h2>Schedule</h2>
          <p>Here is your schedule.</p>
        </div>
        <div class="mainBody__reports">
          <h2>Reports</h2>
          <p>Here are your reports.</p>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped>
.mainBody {
  padding: 16px;
}
</style>
