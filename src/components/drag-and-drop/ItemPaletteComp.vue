<script setup>
import PaletteItem from '@/components/drag-and-drop/palette-items/TextItemComp.vue';
</script>

<template>
      <div class="item-palette">
        <h2 class="item-palette__title">Design</h2>
        <hr class="item-palette__divider" />
        <div class="item-palette__items">
        <PaletteItem type="text" title="Overskrift" iconName="title" />
        <PaletteItem type="text" title="Brødtekst" iconName="text" />
        <PaletteItem type="text" title="Kommentar" iconName="comment" />
        </div>
      </div>
</template>

  <style scoped>
  .item-palette {
    height: 100%;
    padding: 20px;
    background: var(--primary-color);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
    .item-palette__title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: start;
    }
    .item-palette__divider {
        border: 1px solid var(--cta-button-light-hover);
        margin-bottom: 1rem;
    }

    .item-palette__items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
  </style>
