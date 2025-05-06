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

const isFormNameValid = computed(() => props.modelValue.name.length >= 3);
</script>

<template>
  <div class="create-form">
    <div class="create-form__form-group">
        <input
            class="form-group__input"
            :class="{ 'form-group__input--invalid': props.modelValue.name.length > 0 && !isFormNameValid, 'form-group__input--valid': isFormNameValid }"
            type="text"
            id="formName"
            :value="props.modelValue.name"
            @input="emit('update:modelValue', { ...props.modelValue, name: $event.target.value })"
        />
        <label class="form-group__form-label" for="formName">Skemanavn</label>
        <div class="form-group__error-handling">
            <p v-if="props.modelValue.name.length > 0 && !isFormNameValid" class="error-handling__message--error">
                Navnet skal være mindst 3 tegn langt.
            </p>
            <p v-if="isFormNameValid" class="error-handling__message--success">
                Navnet er gyldigt.
            </p>
        </div>
    </div>


    <div class="create-form__checkbox-group">
      <div class="checkbox-group__checkbox-container" @click="toggleCheckbox('opt1')">
        <span
          class="checkbox-container__custom-checkbox"
          :class="{ checked: props.modelValue.options.opt1 }"
        ></span>
        Tillad at gemme rapporter midlertidigt
      </div>
      <div class="checkbox-group__checkbox-container" @click="toggleCheckbox('opt2')">
        <span
          class="checkbox-container__custom-checkbox"
          :class="{ checked: props.modelValue.options.opt2 }"
        ></span>
        Vis seneste rapport
      </div>
      <div class="checkbox-group__checkbox-container" @click="toggleCheckbox('opt3')">
        <span
          class="checkbox-container__custom-checkbox"
          :class="{ checked: props.modelValue.options.opt3 }"
        ></span>
        Beredskabsadgang
      </div>
    </div>

    <div class="create-form__form-group custom-select-wrapper">
      <label for="frequency" class="form-group__form-label">Udførelsesinterval</label>
      <select
        id="frequency"
        class="form-group__input custom-select"
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
    <div class="create-form__form-group">
      <label for="receiverOfBill" class="form-group__form-label">Modtager af kvittering</label>
      <select
        id="receiverOfBill"
        class="form-group__input custom-select"
        :value="props.modelValue.options.receiverOfBill"
        @change="emit('update:modelValue', { ...props.modelValue, options: { ...props.modelValue.options, receiverOfBill: $event.target.value } })"
      >
        <option value="" disabled hidden>Skriv for at søge</option>
        <option value="admin-group">Administratorer</option>
        <option value="user-1">Johnny Test</option>
        <option value="user-2">John Dådyr</option>
      </select>
    </div>
    <div class="create-form__form-group">
      <label for="receiverOfDeviation" class="form-group__form-label">Modtager af afvigelse</label>
      <select
        id="receiverOfDeviation"
        class="form-group__input custom-select"
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
    .create-form {
        height: 58vh;
    }

    .create-form__form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .form-group__input {
    display: block;
    margin-bottom: 1.5rem;
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

    .form-group__input:focus {
            border-color: var(--cta-button-forms-strokes);
    }

    .form-group__input--invalid {
    background-color: var(--warning-light);
    }

    .form-group__input--valid {
    background-color: var(--success-light);
    }

    .form-group__error-handling {
        margin: -1.5rem 1rem;
    }

    .error-handling__message--error {
    color: var(--warning-dark);
    font-size: 0.7rem;
    margin-top: 0.25rem;
    position: absolute;
    }

    .error-handling__message--success {
    color: var(--success-dark);
    font-size: 0.7rem;
    margin-top: 0.25rem;
    position: absolute;
    }

    .form-group__form-label {
    position: absolute;
    top: 30%;
    left: 0.5rem;
    font-size: 0.8rem;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    color: var(--headlines-paragraphs);
    }

    .create-form__checkbox-group {
    margin: 4rem 0 2rem  0;
    }

    .checkbox-group__checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;
    font-size: 1rem;
    }

    .checkbox-container__custom-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/icons/checkbox.svg');
    background-size: cover;
    background-repeat: no-repeat;
    transition: background-image 0.3s ease;
    }

    .custom-checkbox.checked {
    background-image: url('@/assets/icons/checkbox-checked.svg');
    }

    .custom-select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-color: white;
        background-image: url('@/assets/icons/arrow-right.svg');
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1rem;
        padding-right: 2.5rem;
        cursor: pointer;
        margin: -0.5rem 0;
    }
</style>