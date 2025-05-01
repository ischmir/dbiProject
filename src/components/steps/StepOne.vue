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
    <input
      class="create-form__input"
      type="text"
      placeholder="Navn"
      :value="props.modelValue.name"
      @input="emit('update:modelValue', { ...props.modelValue, name: $event.target.value })"
    />
    <input
      class="create-form__input"
      type="email"
      placeholder="Email"
      :value="props.modelValue.email"
      @input="emit('update:modelValue', { ...props.modelValue, email: $event.target.value })"
    />
    <input
      class="create-form__input"
      type="number"
      placeholder="Alder"
      :value="props.modelValue.age"
      @input="emit('update:modelValue', { ...props.modelValue, age: $event.target.value })"
    />
    <div class="checkbox-group">
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt1"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt1: $event.target.checked } })"
        />
        Mulighed 1
      </label>
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt2"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt2: $event.target.checked } })"
        />
        Mulighed 2
      </label>
      <label>
        <input
          type="checkbox"
          :checked="props.modelValue.options.opt3"
          @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, opt3: $event.target.checked } })"
        />
        Mulighed 3
      </label>
    </div>
  </div>
</template>

<style scoped>
.create-form__input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}

.checkbox-group label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
