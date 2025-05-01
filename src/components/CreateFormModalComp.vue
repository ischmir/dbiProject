<script setup>
import { ref, computed } from 'vue';
import IconsComp from '@/components/IconsComp.vue';
import StepOne from '@/components/steps/StepOne.vue';
import StepTwo from '@/components/steps/StepTwo.vue';

const currentPage = ref(1);
const totalPages = 2;

const formData = ref({
  name: '',
  email: '',
  age: '',
  options: {
    opt1: false,
    opt2: false,
    opt3: false,
  },
  description: '',
});

const canGoNext = computed(() => currentPage.value < totalPages);
const canGoBack = computed(() => currentPage.value > 1);

const goToNextPage = () => {
  if (canGoNext.value) {
    currentPage.value++;
  } else {
    // Handle form submission when on the last page
    console.log('Form submitted:', formData.value);
  }
};

const goToPreviousPage = () => {
  if (canGoBack.value) currentPage.value--;
};

const currentComponent = computed(() => {
  if (currentPage.value === 1) return StepOne;
  if (currentPage.value === 2) return StepTwo;
  return null; // Fallback value to ensure a return
});
</script>

<template>
  <div class="create-form__modal">
    <div class="modal__backdrop" @click="$emit('close')"></div>
    <div class="modal__container">
      <!-- Header -->
      <div class="container__header">
        <h2 class="header__title">Opret skema</h2>
        <div class="header__icons">
          <IconsComp class="header__icon" iconName="help" />
          <IconsComp class="header__icon" iconName="close" @click="$emit('close')" />
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="container__progress-bar">
        <div class="progress-bar__page">
            <p class="progress-bar__page-number">side {{ currentPage }} /</p>
            <p class="progress-bar__page-number">{{ totalPages }}</p>
        </div>
        <div class="progress-bar">
          <div
            class="progress-bar__fill"
            :style="{ width: (currentPage / totalPages) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <!-- Dynamic Form Page -->
      <form class="container__create-form">
        <component
          :is="currentComponent"
          v-model="formData"
        />
      </form>

      <!-- Navigation Buttons -->
      <div class="button-group">
        <button type="button" @click="$emit('close')">Annuller</button>
        <button v-if="canGoBack" type="button" @click="goToPreviousPage">
          Tilbage
        </button>
        <button type="button" @click="goToNextPage">
          {{ currentPage === totalPages ? 'Opret' : 'Næste' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-form__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal__container {
    position: relative;
    z-index: 2;
    background: #fff;
    width: 90%;
    max-width: 500px;
    padding: 2rem;
    border-radius: 4px;
    border: solid 10px;
    border-color: var(--cta-button-hover-background);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    .header__title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .header__icons {
      display: flex;
      gap: 0.5rem;

      .header__icon {
        cursor: pointer;
      }
    }
  }

  .container__progress-bar {
    width: 100%;
    margin-bottom: 1rem;

    .progress-bar__page {
        font-size: 0.7rem;
        color: var(--headlines-paragraphs);
        display: flex;
        align-items: right;
        justify-content: flex-end;
        margin-bottom: 0.5rem;
    }

    .progress-bar {
      width: 100%;
      height: 10px;
      background: var(--inactive-buttons-backgrounds);
      border-radius: 4px;
      overflow: hidden;

      .progress-bar__fill {
        height: 100%;
        border-radius: 4px;
        background: var(--cta-button-hover-background);
        transition: width 0.3s ease;
      }
    }
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: lightgray;
      cursor: not-allowed;
    }

    button + button {
      margin-left: 0.5rem;
    }
  }
}

.create-form__input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

</style>
