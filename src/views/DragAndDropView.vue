<script setup>
import DropZone from '@/components/drag-and-drop/DropZoneComp.vue';
import ItemPaletteComp from '@/components/drag-and-drop/ItemPaletteComp.vue';
</script>

<template>
    <div class="background__form-editor">
        <div class="form-editor">
        <div class="form-editor__drop-zone">
            <DropZone />
        </div>
        <div class="form-editor__palette">
            <ItemPaletteComp />
        </div>
    </div>
    </div>
</template>

<style scoped>
    .background__form-editor {
    background: var(--cta-button-hover-background);
    height: 100%;
    }
  .form-editor {
    display: flex;
    height: 100%;
    gap: 1vh;
  }
  .form-editor__drop-zone {
    width: 100%;
  }
  .form-editor__palette {
    width:80%;
  }
  </style>
