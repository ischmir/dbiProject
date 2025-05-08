<script setup>
import IconsComp from '@/components/IconsComp.vue';

const props = defineProps(['type', 'title', 'icon']);

function onDragStart(event) {
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: props.type,
    title: props.title,
    iconName: props.iconName,
  }));
}
</script>

<template>
    <div
      class="palette-item"
      draggable="true"
      @dragstart="onDragStart"
    >
      <IconsComp iconName="iconName" />
      <p class="palette-item__text">{{ title }}</p>
    </div>
  </template>

  <style scoped>
  .palette-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 15rem;
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
