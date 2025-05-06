<script setup>
import { defineProps, defineEmits } from 'vue';

// Declare the props and emit
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

if (!props.modelValue.options.rights) {
  emit('update:modelValue', {
    ...props.modelValue,
    options: { ...props.modelValue.options, rights: '' },
  });
}

if (!props.modelValue.options.checkpoints) {
  emit('update:modelValue', {
    ...props.modelValue,
    options: { ...props.modelValue.options, checkpoints: '' },
  });
}
</script>

<template>
  <div class="create-form">
    <div class="create-form__form-group create-form__container">
      <h4>Tildel adgang</h4>
      <hr class="form-group__horizontal-line" />
      <ul class="form-group__list">
        <li>rettighedshaver</li>
      </ul>
      <hr class="form-group-horizontal-line" />
      <select
        id="rights"
        class="form-group__select"
        :value="props.modelValue.options.rights"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, rights: $event.target.value } })"
      >
        <option value="" disabled hidden>Vælg</option>
        <option value="admin-group">Administratorer</option>
        <option value="user-1">Johnny Test</option>
        <option value="user-2">Bob Burger</option>
        <option value="user-group">Gruppe 2</option>
        <option value="quarterly">Jimmy Pesto Sr.</option>
        <option value="every-half-year">Jimmy Pesto Jr.</option>
      </select>
    </div>
    <div class="create-form__form-group">
      <h4>Tilføj tjekpunkter</h4>
      <hr class="form-group-horizontal-line" />
      <select
        id="checkpoints"
        class="form-group__select"
        :value="props.modelValue.options.checkpoints"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, checkpoints: $event.target.value } })"
      >
        <option value="" disabled hidden>Vælg</option>
        <option value="1">UCL Seebladsgade</option>
        <option value="2">UCL Niels Bohrs Alle</option>
        <option value="3">Tietgenskolen</option>
        <option value="4">Munkebjergskolen</option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--forms-charts);
  border-radius: 8px;
  height: 456px;
}

.create-form__form-group {
  position: relative;
  margin-bottom: 1.5rem;
  width: 50%;
}

.form-group__horizontal-line {
  margin: 0.2rem 0rem 1rem 0rem;
}

.form-group__list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.form-group__select {
  display: block;
  margin: 1.5rem 0;
  width: 100%;
  height: 40px;
  padding: 0rem 0rem 0rem 0.5rem;
  border: 1px solid var(--placeholder-text-inactive-text);
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  background-color: var(--forms-charts);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('@/assets/icons/arrow-right.svg');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
  cursor: pointer;
}

.form-group__select:focus {
  border-color: var(--cta-button-forms-strokes);
}
</style>
