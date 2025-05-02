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
    <div class="form-group">
      <input
        type="text"
        id="name"
        class="form-input"
        placeholder=" "
        :value="props.modelValue.name"
        @input="emit('update:modelValue', { ...props.modelValue, name: $event.target.value })"
      />
      <label for="name" class="form-label">Navn</label>
    </div>
    <div class="form-group">
      <input
        type="email"
        id="email"
        class="form-input"
        placeholder=" "
        :value="props.modelValue.email"
        @input="emit('update:modelValue', { ...props.modelValue, email: $event.target.value })"
      />
      <label for="email" class="form-label">Email</label>
    </div>
    <div class="form-group">
      <input
        type="number"
        id="age"
        class="form-input"
        placeholder=" "
        :value="props.modelValue.age"
        @input="emit('update:modelValue', { ...props.modelValue, age: $event.target.value })"
      />
      <label for="age" class="form-label">Alder</label>
    </div>
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
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
}

.form-input:focus {
  border-color: blue;
}

.form-label {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #aaa;
  transition: all 0.2s ease;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: blue;
}

.checkbox-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
