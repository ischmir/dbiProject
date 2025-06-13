<script setup>
// importes nødvendige dele fra Vue og vores egne komponenter
// computed og ref bruges til at håndtere data der kan ændre sig
// useRoute bruges til at få information om den aktuelle side vi er på
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import IconsComp from './IconsComp.vue';
import LogoutComp from './LogoutComp.vue';
import SearchInputComp from './SearchInputComp.vue';

// Vi gemmer den aktuelle rute og dens titel
// Dette gør at headeren automatisk viser den rigtige titel for hver side
const route = useRoute();
const title = computed(() => route.meta.title);

// Vi bruger denne variabel til at huske hvilken knap brugeren 'hover'er over
// Når brugeren 'hover'er over en knap, gemmer vi hvilken knap det er
const hoveredButton = ref(null);

// Disse funktioner håndterer hvad der sker når brugeren holder musen over en knap
// handleMouseOver gemmer hvilken knap der er hovered
const handleMouseOver = (label) => {
  hoveredButton.value = label;
};
// handleMouseLeave nulstiller hovered knappen når musen fjernes
const handleMouseLeave = () => {
  hoveredButton.value = null;
};
</script>

<template>
  <header>
    <!-- Logo sektion med link til dashboard -->
    <router-link to="/dashboard" class="header__logo base-container">
      <img
        alt="DBI Logo"
        class="header__logo-image"
        src="../assets/img/dbi-logo-black.svg"
      />
      <span class="header__logo-title">Egenkontrol</span>
    </router-link>

    <!-- titel og søgefunktion -->
    <div class="header__center base-container">
      <h1 class="header__title">{{ title }}</h1>
      <SearchInputComp />
    </div>

    <!-- Action Buttons -->
    <div class="header__actions">
      <!-- 'help' knap med hover effekt -->
      <button
        class="header__button base-container"
        @mouseover="handleMouseOver('Help')"
        @mouseleave="handleMouseLeave"
        @focus="handleMouseOver('Help')"
      >
        <IconsComp class="header__button-icon" iconName="help" />
        <div v-if="hoveredButton === 'Help'" class="modal">Help</div>
      </button>
      <!-- Notifikations knap med hover effekt -->
      <button
        class="header__button base-container"
        @mouseover="handleMouseOver('Notifications')"
        @mouseleave="handleMouseLeave"
        @focus="handleMouseOver('Notifications')"
      >
        <IconsComp class="header__button-icon" iconName="notifications" />
        <div v-if="hoveredButton === 'Notifications'" class="modal">Notifications</div>
      </button>
      <!-- Bruger knap med hover effekt -->
      <button
        class="header__button base-container"
        @mouseover="handleMouseOver('User')"
        @mouseleave="handleMouseLeave"
        @focus="handleMouseOver('User')"
      >
        <IconsComp class="header__button-icon" iconName="user" />
        <div v-if="hoveredButton === 'User'" class="modal">User</div>
      </button>
      <!-- Log ud knap med hover effekt -->
      <button
        class="header__button base-container"
        @mouseover="handleMouseOver('Logout')"
        @mouseleave="handleMouseLeave"
        @focus="handleMouseOver('Logout')"
      >
        <LogoutComp class="header__button-icon" iconName="logout" />
        <div v-if="hoveredButton === 'Logout'" @click="logout" class="modal">Logout</div>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
/* Her definerer vi layoutet for hele headeren */
/* Vi bruger grid til at dele headeren op i tre områder: logo, midte og knapper */
header {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-areas: "logo logo logo center center center center center center center center center actions actions actions actions";
  column-gap: 1vh;
  box-sizing: border-box;
}

/* Styling for logo området */
.header__logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  text-decoration: none; /* Remove underline for the link */
  color: inherit; /* Inherit text color */
}

/* Størrelse på logo billedet */
.header__logo-image {
  height: 3vw;
}

/* Styling for logo teksten */
.header__logo-title {
  display: flex;
  align-items: flex-end;
  height: 3vw;
  font-weight: bolder;
  padding-left: 0.25vh;
}

/* Styling for centrum området med titel og søgefunktion */
.header__center {
  grid-area: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-color);
  padding: 0 2vh;
}

/* Styling for søgefunktionen */
.header__search {
  position: relative;
}

/* Styling for søge input feltet */
.header__search-input {
  padding: 1.5vh 10vh 1.5vh 2vh;
  border: 1px solid var(--placeholder-text-inactive-text);
  border-radius: 9999px;
  outline: none;
  font-size: 1rem;
}

/* Styling for søg ikonet */
.header__search-icon {
  position: absolute;
  top: 50%;
  right: 2vh;
  transform: translateY(-50%);
  filter: invert(84%) sepia(7%) saturate(128%) hue-rotate(155deg) brightness(84%)
    contrast(86%);
}

/* Styling for action buttons */
.header__actions {
  grid-area: actions;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1vh;
}

/* Generel styling for knapperne */
.header__button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  position: relative;
  border: none;
}

/* Styling for knap ikoner */
.header__button-icon {
  cursor: pointer;
}

/* Hover og active effekter for knap ikoner */
.header__button-icon:active {
  filter: invert(14%) sepia(86%) saturate(4039%) hue-rotate(347deg) brightness(86%)
    contrast(99%);
}

.header__button-icon:hover {
  filter: invert(14%) sepia(86%) saturate(4039%) hue-rotate(347deg) brightness(86%)
    contrast(99%);
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

/* Styling for modal pile */
.modal::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 75%;
  transform: translateX(-50%) translateY(-100%);
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent var(--strokes-lines) transparent;
}
</style>
