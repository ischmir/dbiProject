<script setup>
// Importerer IconsComp til visning af icon
import IconsComp from "@/components/IconsComp.vue";

// Props: type, title, icon
const props = defineProps(["type", "title", "icon"]);

// Når brugeren starter drag af item
function onDragStart(event) {
  // Lægger item data i drag event som JSON
  // Data bruges ved drop
  event.dataTransfer.setData("application/json", JSON.stringify({
    type: props.type,     // type sendes videre
    title: props.title,   // title sendes videre
    iconName: props.icon,  // icon sendes videre
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
