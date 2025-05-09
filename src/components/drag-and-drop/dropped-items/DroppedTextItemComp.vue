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
      <p class="content__text">{{ data.inputTitle }}</p>
      <caption class="content__info">Tekst:</caption>
      <div class="content__input-container">
        <IconsComp class="content__icon" iconName="title" />
        <input class="content__input" v-model="data.inputTitle" />
      </div>
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
        padding: 10px;
        margin: 1rem;
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

    .content__input-container {
        position: relative;
        width: 100%;
    }

    .content__input {
        width: 100%;
        padding: 0.5rem 0rem 0.5rem 3rem;
    }

    .content__icon {
        position: absolute;
        left: 0.8rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .dropped-component__actions {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
        margin: 0 1rem;
    }
</style>
