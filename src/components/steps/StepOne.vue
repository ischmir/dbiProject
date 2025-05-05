<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// Declare the prop and emit
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// Toggle checkbox state
const toggleCheckbox = (option) => {
  emit('update:modelValue', {
    ...props.modelValue,
    options: {
      ...props.modelValue.options,
      [option]: !props.modelValue.options[option],
    },
  });
};

// Computed property to check the length of the form-name input
const isFormNameValid = computed(() => props.modelValue.name.length >= 3);
</script>

<template>
  <div>
    <div class="create-form__form-group">
      <input
        class="create-form__input"
        :class="{ 'input--invalid': props.modelValue.name.length > 0 && !isFormNameValid, 'input--valid': isFormNameValid }"
        type="text"
        id="form-name"
        :value="props.modelValue.name"
        @input="emit('update:modelValue', { ...props.modelValue, name: $event.target.value })"
      />
      <label class="form-label" for="form-name">Skemanavn</label>
    </div>
    <div class="form-group__error-handling">
      <p v-if="props.modelValue.name.length > 0 && !isFormNameValid" class="message--error">
        Navnet skal være mindst 3 tegn langt.
      </p>
      <p v-if="isFormNameValid" class="message--success">
        Navnet er gyldigt.
      </p>
    </div>

    <div class="checkbox-group">
      <div class="checkbox-container" @click="toggleCheckbox('opt1')">
        <span
          class="custom-checkbox"
          :class="{ checked: props.modelValue.options.opt1 }"
        ></span>
        Tillad at gemme rapporter midlertidigt
      </div>
      <div class="checkbox-container" @click="toggleCheckbox('opt2')">
        <span
          class="custom-checkbox"
          :class="{ checked: props.modelValue.options.opt2 }"
        ></span>
        Vis seneste rapport
      </div>
      <div class="checkbox-container" @click="toggleCheckbox('opt3')">
        <span
          class="custom-checkbox"
          :class="{ checked: props.modelValue.options.opt3 }"
        ></span>
        Beredskabsadgang
      </div>
    </div>

    <div class="create-form__form-group custom-select-wrapper">
      <label for="frequency" class="form-label">Udførelsesinterval</label>
      <select
        id="frequency"
        class="create-form__input custom-select"
        :value="props.modelValue.options.frequency"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, frequency: $event.target.value } })"
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
    <div class="authentication__form-group custom-select-wrapper">
      <label for="receiver-of-bill" class="form-label">Modtager af kvittering</label>
      <select
        id="receiver-of-bill"
        class="create-form__input custom-select"
        :value="props.modelValue.options.receiverOfBill"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, receiverOfBill: $event.target.value } })"
      >
        <option value="" disabled hidden>Skriv for at søge</option>
        <option value="admin-group">Administratorer</option>
        <option value="user-1">Johnny Test</option>
        <option value="user-2">John Dådyr</option>
      </select>
    </div>
    <div class="authentication__form-group custom-select-wrapper">
      <label for="receiver-of-deviation" class="form-label">Modtager af afvigelse</label>
      <select
        id="receiver-of-deviation"
        class="create-form__input custom-select"
        :value="props.modelValue.options.receiverOfDeviation"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, receiverOfDeviation: $event.target.value } })"
      >
        <option value="" disabled hidden>Skriv for at søge</option>
        <option value="admin-group">Administratorer</option>
        <option value="user-1">Johnny Test</option>
        <option value="user-2">John Dådyr</option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">
    .create-form__form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .create-form__input {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
    height: 60px;
    padding: 1.5rem 0.5rem 0.5rem 0.5rem;
    border: 1px solid var(--placeholder-text-inactive-text);
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    background-color: var(--forms-charts);
    transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .create-form__input:focus {
            border-color: var(--cta-button-forms-strokes);
    }

    .input--invalid {
    background-color: var(--warning-light);
    }

    .input--valid {
    background-color: var(--success-light);
    }

    .custom-select {
        appearance: none; // Skjul browserens pil
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: white;
        background-image: url('@/assets/icons/arrow-right.svg'); // Dit ikon
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1rem;
        padding-right: 2.5rem; // Giv plads til ikonet
        cursor: pointer;
    }

    .form-group__error-handling {
        margin: -1.5rem 1rem;
    }

    .message--error {
    color: var(--warning-dark);
    font-size: 0.7rem;
    margin-top: 0.25rem;
    }

    .message--success {
    color: var(--success-dark);
    font-size: 0.7rem;
    margin-top: 0.25rem;
    }

    .form-label {
    position: absolute;
    top: 30%;
    left: 0.5rem;
    font-size: 0.8rem;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    color: var(--headlines-paragraphs);
    }

    .checkbox-group {
    margin: 2rem auto;
    }

    .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;
    font-size: 1rem;
    }

    .custom-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/icons/checkbox.svg'); /* Path to unmarked checkbox */
    background-size: cover;
    background-repeat: no-repeat;
    transition: background-image 0.3s ease;
    }

    .custom-checkbox.checked {
    background-image: url('@/assets/icons/checkbox-checked.svg'); /* Path to marked checkbox */
    }
</style>