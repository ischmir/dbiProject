<script setup>
import { ref } from 'vue';
import DroppedTitleItemComp from '../drag-and-drop/dropped-items/DroppedTitleItemComp.vue';
import DroppedTextItemComp from '../drag-and-drop/dropped-items/DroppedTextItemComp.vue';
import IconsComp from '../IconsComp.vue';

const droppedItems = ref([]);

const componentMap = {
  title: DroppedTitleItemComp,
  text: DroppedTextItemComp,
};

function onDrop(event) {
  const json = event.dataTransfer.getData('application/json');
  if (!json) return;

  const data = JSON.parse(json);
  droppedItems.value.push({
    ...data,
    id: Date.now(),
    description: '',
    inputValue: '',
  });
}

function duplicateItem(index) {
  const item = droppedItems.value[index];
  droppedItems.value.splice(index + 1, 0, {
    ...item,
    id: Date.now(),
  });
}
</script>

<template>
  <div class="dropzone">
    <div class="dropzone__header">
      <h2 class="header__title">Skema Titel</h2>
      <div class="header__dropzone-actions">
        <IconsComp class="dropzone-actions__icon" iconName="more-horizon" />
        <IconsComp class="dropzone-actions__icon" iconName="save" />
      </div>
    </div>
    <hr class="dropzone__divider" />
    <div
      class="dropzone__container"
      @dragover.prevent
      @drop="onDrop"
    >
      <component
        v-for="(item, index) in droppedItems"
        :is="componentMap[item.type]"
        :key="item.id"
        :componentData="item"
        @delete="() => droppedItems.splice(index, 1)"
        @duplicate="() => duplicateItem(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.dropzone {
    height: 100%;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
}

.dropzone__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}

.header__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: start;
}
.header__dropzone-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    margin-bottom: 1rem;
}

.dropzone-actions__icon {
    cursor: pointer;
}

.dropzone__divider {
    border: 1px solid var(--placeholder-text-inactive-text);
    margin: 0.1rem 1rem 2rem 1rem;
}

.dropzone__container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: auto;
}
</style>
