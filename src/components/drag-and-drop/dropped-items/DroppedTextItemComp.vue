<script setup>
import { reactive } from 'vue';
import IconsComp from '@/components/IconsComp.vue';

const props = defineProps(['componentData']);
const emit = defineEmits(['delete', 'duplicate']); // Define emitted events
const data = reactive({ ...props.componentData });

function save() {
  console.log('Saved:', data);
}

function revert() {
  Object.assign(data, props.componentData);
}

// Define actions dynamically
const actions = [
  { title: 'Gem og se resultat', iconName: 'save', handler: revert },
  { title: 'Gå tilbage', iconName: 'history', handler: save },
  { title: 'kopier sektion', iconName: 'copy', handler: () => emit('duplicate') }, // Use emit instead of $emit
  { title: 'Slet sektion', iconName: 'delete', handler: () => emit('delete') }, // Use emit instead of $emit
];
</script>

<template>
  <div class="dropped-component">
    <div class="dropped-component__content">
      <caption class="content__info">Svartype: {{ data.title }}</caption>
      <h2 class="content__title">{{ data.inputTitle }}</h2>
      <caption class="content__info">Tekst:</caption>
      <input v-model="data.inputTitle" />
    </div>
    <div class="dropped-component__actions">
      <IconsComp
        v-for="(action, index) in actions"
        :key="index"
        :iconName="action.iconName"
        :title="action.title"
        @click="action.handler"
      />
    </div>
  </div>
</template>

<style scoped>
    .dropped-component {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background: var(--primary-color);
        border: 1px solid #ccc;
        margin-top: 10px;
        padding: 10px;
    }
    .dropped-component__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-grow: 1;
        margin-top: 10px;
        padding: 10px;
    }

    .content__info {
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--help-text)
    }
    .content__title {
        font-size: 2rem;
        height: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .dropped-component__actions {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
        margin: 0 1rem;
    }
</style>
