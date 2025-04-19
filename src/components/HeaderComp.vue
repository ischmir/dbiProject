<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import IconsComp from './IconsComp.vue';

const route = useRoute();
const title = computed(() => route.meta.title);

// Track the hovered button
const hoveredButton = ref(null);

const handleMouseOver = (label) => {
  hoveredButton.value = label;
};

const handleMouseLeave = () => {
  hoveredButton.value = null;
};
</script>

<template>
    <header>
        <!-- Logo -->
        <router-link to="/" class="header__logo base-container">
            <img alt="DBI Logo" class="header__logo-image" src="../assets/img/dbi-logo-black.svg" />
            <span class="header__logo-title">Egenkontrol</span>
        </router-link>

        <!-- Title and Search -->
        <div class="header__center base-container">
            <h1 class="header__title">{{ title }}</h1>
            <div class="header__search">
                <input type="text" class="header__search-input" placeholder="Søg" />
                <IconsComp class="header__search-icon" iconName="search" />
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="header__actions">
            <div
                class="header__button base-container"
                @mouseover="handleMouseOver('Help')"
                @mouseleave="handleMouseLeave"
            >
                <IconsComp class="header__button-icon" iconName="help" />
                <div v-if="hoveredButton === 'Help'" class="modal">Help</div>
            </div>
            <div
                class="header__button base-container"
                @mouseover="handleMouseOver('Notifications')"
                @mouseleave="handleMouseLeave"
            >
                <IconsComp class="header__button-icon" iconName="notifications" />
                <div v-if="hoveredButton === 'Notifications'" class="modal">Notifications</div>
            </div>
            <div
                class="header__button base-container"
                @mouseover="handleMouseOver('User')"
                @mouseleave="handleMouseLeave"
            >
                <IconsComp class="header__button-icon" iconName="user" />
                <div v-if="hoveredButton === 'User'" class="modal">User</div>
            </div>
            <div
                class="header__button base-container"
                @mouseover="handleMouseOver('Logout')"
                @mouseleave="handleMouseLeave"
            >
                <IconsComp class="header__button-icon" iconName="logout" />
                <div v-if="hoveredButton === 'Logout'" class="modal">Logout</div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-areas: 
        "logo logo logo center center center center center center center center center actions actions actions actions";
    column-gap: 1vh;
    box-sizing: border-box;
}

/* ─── Logo Area ─────────────────────────────── */
.header__logo {
    grid-area: logo;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    text-decoration: none; /* Remove underline for the link */
    color: inherit; /* Inherit text color */
}

.header__logo-image {
    height: 3vw;
}

.header__logo-title {
    display: flex;
    align-items: flex-end;
    height: 3vw;
    font-weight: bolder;
    padding-left: 0.25vh;
}

/* ─── Center Area ───────────────────────────── */
.header__center {
    grid-area: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    padding: 0 2vh;
}

.header__search {
    position: relative;
}

.header__search-input {
    padding: 1.5vh 10vh 1.5vh 2vh;
    border: 1px solid var(--placeholder-text-inactive-text);
    border-radius: 9999px;
    outline: none;
    font-size: 1rem;
}

.header__search-icon {
    position: absolute;
    top: 50%;
    right: 2vh;
    transform: translateY(-50%);
    filter: invert(84%) sepia(7%) saturate(128%) hue-rotate(155deg) brightness(84%) contrast(86%);
}

/* ─── Actions Area ──────────────────────────── */
.header__actions {
    grid-area: actions;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1vh;
}

/* ─── Button Styling ────────────────────────── */
.header__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    position: relative;
}

.header__button-icon {
    cursor: pointer;
}

.header__button-icon:active {
    filter: invert(14%) sepia(86%) saturate(4039%) hue-rotate(347deg) brightness(86%) contrast(99%);
}

.header__button-icon:hover {
    filter: invert(14%) sepia(86%) saturate(4039%) hue-rotate(347deg) brightness(86%) contrast(99%);
}

/* ─── Modal Styling ─────────────────────────── */
.modal {
    position: absolute;
    top: calc(70% + 4px);
    left: 50%;
    transform: translateX(-75%);
    background-color: var(--strokes-lines);
    color: var(--headlines-paragraphs);
    padding: 0.5vh 1vh;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 10;
}

/* ─── Help Modal Arrow ──────────────────────── */
.modal::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 75%;
    transform: translateX(-50%) translateY(-100%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent var(--strokes-lines) transparent;
}
</style>
