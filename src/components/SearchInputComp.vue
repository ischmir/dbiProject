<script setup>
// Importerer ikon komponenten
import IconsComp from "./IconsComp.vue";

// Props for ikon komponenten
const props = defineProps({
  // onChange er en funktion der kaldes når brugeren ændrer inputtet
  onChange: {
    type: Function,
  },
});
</script>

<template>
  <div class="search__input">
    <input
      type="text"
      class="search__input-input"
      v-on:input="(e) => props.onChange(e.target.value)"
      placeholder="Søg"
    />
    <IconsComp class="search__input-icon" iconName="search" />
  </div>
</template>

<style lang="scss" scoped>
.search__input {
  position: relative;
}

.search__input-input {
  padding: 2% 0% 2% 7%;
  border: 1px solid var(--placeholder-text-inactive-text);
  border-radius: 9999px;
  outline: none;
  font-size: 1rem;
}

.search__input-icon {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  filter: invert(84%) sepia(7%) saturate(128%) hue-rotate(155deg) brightness(84%) contrast(86%);
}
</style>
