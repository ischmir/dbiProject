<script setup>
import { defineProps, defineEmits } from 'vue';

// Declare the prop and emit
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <div class="authentication__form-group">
      <input
        class="create-form__input"
        type="text"
        id="form-name"
        :value="props.modelValue.name"
        @input="emit('update:modelValue', { ...props.modelValue, name: $event.target.value })"
      />
      <label for="form-name">Skemanavn</label>
    </div>

    <div class="checkbox-group">
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt1"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt1: $event.target.checked } })"
        />
        Tillad at gemme rapporter midlertidigt
      </label>
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt2"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt2: $event.target.checked } })"
        />
        Vis seneste rapport
      </label>
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt3"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt3: $event.target.checked } })"
        />
        Beredskabsadgang
      </label>
    </div>

    <div class="authentication__form-group">
      <label for="frequency" class="form-label">Udførelsesinterval</label>
      <select
        id="frequency"
        class="create-form__input"
        :value="props.modelValue.options.value"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, value: $event.target.value } })"
      >
        <option value="" disabled hidden>ingen fast...</option>
        <option value="daily">Dagligt</option>
        <option value="weekly">Ugentlig</option>
        <option value="every-two-weeks">Hver anden uge</option>
        <option value="monthly">Månedligt</option>
        <option value="every-two-months">Hver anden måned</option>
        <option value="quarterly">Kvartalvis</option>
        <option value="every-half-year">Halvårlig</option>
        <option value="yearly">Årlig</option>
        <option value="every-five-years">Hvert femte år</option>
        <option value="every-ten-years">Hvert tiende år</option>
      </select>
    </div>
    <div class="authentication__form-group">
      <label for="receiver-of-bill" class="form-label">Modtager af kvittering</label>
      <select
        id="receiver-of-bill"
        class="create-form__input"
        :value="props.modelValue.options.value"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, value: $event.target.value } })"
      >
        <option value="" disabled hidden>Skriv for at søge</option>
        <option value="daily">administratorer</option>
        <option value="weekly">Johnny Test</option>
        <option value="every-two-weeks">John Dådyr</option>
      </select>
    </div>
    <div class="authentication__form-group">
      <label for="receiver-of-deviation" class="form-label">Modtager af afvigelse</label>
      <select
        id="receiver-of-deviation"
        class="create-form__input"
        :value="props.modelValue.options.value"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, value: $event.target.value } })"
      >
        <option value="" disabled hidden>Skriv for at søge</option>
        <option value="daily">administratorer</option>
        <option value="weekly">Johnny Test</option>
        <option value="every-two-weeks">John Dådyr</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.create-form__input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  height: 60px;
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
}

.create-form__input:focus {
  border-color: blue;
}

.form-label {
    position: absolute;
    top: 30%;
    left: 0.5rem;
    font-size: 0.8rem;
}

.checkbox-group {
    margin: 2rem auto;
}

.checkbox-group label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
