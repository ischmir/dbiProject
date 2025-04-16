<!-- Icon.vue -->
<script setup>
import { computed } from 'vue';

// Props for the icon component
const props = defineProps({
    iconname: {
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

// Compute the background position based on the `iconname` prop
const backgroundPosition = computed(() => iconPositions[props.iconname] || '0 0');
</script>

<template>
    <!-- Dynamically set the background position -->
    <span class="icon" :style="{ backgroundPosition }"></span>
</template>

<style scoped>
.icon {
    width: 24px;
    height: 24px;
    background-image: url('@/assets/icons/icon-spritesheet.png'); /* Ensure the path is correct */
    background-repeat: no-repeat;
}
</style>