<script setup>
// Importerer ikon komponenten som bruges til at vise ikoner
import IconsComp from '@/components/IconsComp.vue';

// Definerer de properties som komponenten modtager fx. type, title og icon
const props = defineProps(['type', 'title', 'icon']);

// Funktion der håndterer når brugeren begynder at trække komponenten
function onDragStart(event) {
  // Konverterer komponentens data til JSON og gemmer det i drag eventet
  // Dette data bruges senere når komponenten droppes
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: props.type,    // Sender typen videre (f.eks. "title" eller "text")
    title: props.title,  // Sender titlen videre
    iconName: props.icon, // Sender ikon navnet videre
  }));
}
</script>

<template>
    <div
      class="palette-item"
      draggable="true"
      @dragstart="onDragStart"
    >
      <IconsComp :iconName="icon" />
      <p class="palette-item__text">{{ title }}</p>
    </div>
</template>

<style scoped>
  .palette-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    min-width: 12rem;
    padding: 1rem 1.5rem;
    background: var(--forms-charts);
    cursor: grab;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .palette-item:hover {
    background: var(--cta-button-light-hover);
  }
  .palette-item:active {
    cursor: grabbing;
  }
  .palette-item__text {
    font-size: 1rem;
    font-weight: bold;
    margin-left: 1rem;
  }
</style>
