<script setup>
import PaletteItem from '@/components/drag-and-drop/PaletteItemComp.vue';
</script>

<template>
  <div class="item-palette">
    <h2 class="item-palette__title">Design</h2>
    <hr class="item-palette__divider" />
    <div class="item-palette__items">
      <PaletteItem type="title" data-cy="palette-item-title" title="Overskrift" icon="title" />
      <PaletteItem type="text" title="Brødtekst" icon="text-fields" />
    </div>
    <h2 class="item-palette__title">Spørgsmål</h2>
    <hr class="item-palette__divider" />
    <div class="item-palette__items">
      <PaletteItem type="text" title="Kommentar" icon="comment" />
      <PaletteItem type="text" title="Ja / Nej" icon="radio-button-unchecked" />
    </div>
  </div>
</template>

<style scoped>
  .item-palette {
    height: 100%;
    padding: 0.1rem 1.4rem;
    background: var(--primary-color);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .item-palette__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 2rem 0rem 1rem 1rem;
    text-align: start;
  }
  .item-palette__divider {
    border: 1px solid var(--placeholder-text-inactive-text);
    margin-bottom: 1rem;
  }

  .item-palette__items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
