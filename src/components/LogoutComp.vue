<script setup>
// Importerer Firebase auth funktioner til at håndtere logout
import { getAuth, signOut } from "firebase/auth";
// Importerer router til at navigere efter logout
import { useRouter } from "vue-router";
// Importerer ikon komponenten
import IconsComp from "./IconsComp.vue";

// Initialiserer Firebase auth og router
const auth = getAuth();
const router = useRouter();

// Funktion der håndterer bruger logout
const logout = () => {
  // Logger brugeren ud af Firebase
  signOut(auth)
    .then(() => {
      console.log("User successfully logged out");
      // Fjerner brugerens token fra localStorage
      localStorage.removeItem("token");
      // Sender brugeren til login siden
      router.push("/login");
    })
    .catch((error) => {
      // Logger eventuelle fejl der opstår under logout
      console.error("Error logging out:", error.message);
    });
};
</script>

<template>
  <IconsComp @click="logout" class="header__button-icon" iconName="logout" />
</template>