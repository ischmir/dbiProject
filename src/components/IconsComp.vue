<!-- Icon.vue -->
<script setup>
    import { computed } from 'vue';

    // Props for the icon component
    defineProps({
        name: {
            type: String,
            required: true,
        },
    });

    // Map of icon names to their background positions
    const iconPositions = {
        'help': '-60px 0',
        'notifications': '-120px 0',
        'user': '-180px 0',
        'logout': '-240px 0',
        // Add other icons as needed
    };

    // Compute the background position based on the `name` prop
    const backgroundPosition = computed(() => iconPositions[name] || '0 0');
    console.log('name prop:', name); // Debugging the name prop
</script>

<template>
    <!-- Dynamically set the background position -->
    <span class="icon" :style="{ backgroundPosition }"></span>
</template>

<style scoped>
    /* Dynamically set the background position */
    .icon {
        width: 24px;
        height: 24px;
        background-image: url('@/assets/icons/icon-spritesheet.png');
        background-repeat: no-repeat;
        background-position: -60px 0; /* Test with a specific icon */
    }
</style>