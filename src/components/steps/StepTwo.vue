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
      <textarea
        id="description"
        class="form-input"
        placeholder=" "
        :value="props.modelValue.description"
        @input="emit('update:modelValue', { ...props.modelValue, description: $event.target.value })"
      ></textarea>
      <label for="description" class="form-label">Beskrivelse</label>
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
  resize: none;
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
</style>
