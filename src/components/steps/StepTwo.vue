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
    <textarea
      class="create-form__textarea"
      placeholder="Beskrivelse"
      :value="props.modelValue.description"
      @input="emit('update:modelValue', { ...props.modelValue, description: $event.target.value })"
    ></textarea>
  </div>
</template>

<style scoped>
.create-form__textarea {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  height: 100px;
}
</style>
