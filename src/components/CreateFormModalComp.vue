<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { getFirestore, collection, addDoc } from "firebase/firestore";
import IconsComp from "@/components/IconsComp.vue";
import StepOne from "@/components/steps/StepOne.vue";
import StepTwo from "@/components/steps/StepTwo.vue";

// Events til parent (fx close)
const emit = defineEmits(["close"]);
const router = useRouter(); // Initialiserer router

// Aktuelt step i modal (1 eller 2)
const currentPage = ref(1);
// Antal steps i modal
const totalPages = 2;

// Props: folderId (id på folder)
const props = defineProps({
  folderId: {
    type: String,
    required: true, // Skal være id på folder
  },
});
console.log("Props", props);

// Data for ny form
const formData = ref({
  name: "", // Navn på form
  folderId: props.folderId, // folderId fra props
  components: [], // components (drag & drop)
  options: {
    // Checkbox options
    opt1: false, // Mulighed for at gemme rapport
    opt2: false, // Mulighed for at vise seneste rapport
    opt3: false, // Mulighed for beredskabsadgang
    // Dropdown options
    frequency: "", // frequency (interval)
    receiverOfBill: "", // receiverOfBill
    receiverOfDeviation: "", // receiverOfDeviation
    rights: "", // rights
    checkpoints: "", // checkpoints
  },
});

// Kan gå til næste step?
// Validerer navn på step 1 (min 3 tegn)
const canGoNext = computed(() => {
  if (currentPage.value === 1) {
    return formData.value.name.length >= 3; // Skemanavn skal være mindst 3 tegn
  }
  return true; // Ingen krav for side 2 - brugeren kan altid gå videre
});

// Kan gå tilbage?
// Kun hvis ikke på første step
const canGoBack = computed(() => currentPage.value > 1);

// Næste step eller opret form
const goToNextPage = async () => {
  if (currentPage.value < totalPages) {
    // Hvis ikke sidste step, gå til næste
    currentPage.value++;
  } else {
    // Opretter form hvis sidste step
    try {
      const db = getFirestore();
      const formCollection = collection(db, "forms");
      const docRef = await addDoc(formCollection, formData.value);
      console.log("Form submitted successfully:", formData.value);

      // Gå til form editor med nyt id
      // docRef.id er Firestore id
      router.push(`/form-editor/${docRef.id}`);
    } catch (error) {
      // Fejl ved oprettelse af form
      console.error("Error submitting form:", error);
    }
  }
};

// Gå til forrige step
const goToPreviousPage = () => {
  if (canGoBack.value) currentPage.value--; // Kun hvis ikke på første step
};

// Viser komponent for aktuelt step
// Afhænger af step
const currentComponent = computed(() => {
  if (currentPage.value === 1) return StepOne; // StepOne på step 1
  if (currentPage.value === 2) return StepTwo; // StepTwo på step 2
  return null; // Fallback hvis fejl
});
</script>

<template>
  <div class="create-form__modal">
    <div class="modal__backdrop" @click="emit('close')"></div>
    <div class="modal__container">
      <!-- Header -->
      <div class="container__header">
        <div class="header__content">
          <h2 class="header__title">Opret skema</h2>
          <IconsComp class="header__icon" iconName="help" />
        </div>
        <div class="header__content">
          <IconsComp class="header__icon" iconName="close" @click="emit('close')" />
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="container__progress-bar">
        <div class="progress-bar__page">
          <p class="progress-bar__page-number--active">side {{ currentPage }}</p>
          <p class="progress-bar__page-number">af {{ totalPages }}</p>
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
        <component :is="currentComponent" v-model="formData" />
      </form>

      <!-- Navigation Buttons -->
      <div id="create-form__button-group">
        <button class="button--secondary" type="button" @click="$emit('close')">
          Annuller
        </button>
        <button
          class="button--secondary"
          v-if="canGoBack"
          type="button"
          @click="goToPreviousPage"
        >
          Tilbage
        </button>
        <button
          class="button--primary"
          type="button"
          :disabled="currentPage === 1 && !canGoNext"
          @click="goToNextPage"
        >
          {{ currentPage === totalPages ? "Opret" : "Næste" }}
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
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal__container {
    position: relative;
    z-index: 2;
    background: #fff;
    width: 65vw;
    height: 90vh;
    padding: 2rem;
    border-radius: 4px;
    border: solid 10px;
    border-color: var(--cta-button-hover-background);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
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
      margin-right: 1rem;
    }

    .header__content {
      display: flex;
      align-items: center;
    }

    .header__icon {
      cursor: pointer;
    }
  }

  .container__progress-bar {
    width: 100%;
    margin-bottom: 1rem;

    .progress-bar__page {
      font-size: 0.7rem;
      display: flex;
      align-items: right;
      justify-content: flex-end;
      margin-bottom: 0.5rem;

      .progress-bar__page-number--active {
        color: var(--headlines-paragraphs);
        padding-right: 4px;
      }
      .progress-bar__page-number {
        color: var(--placeholder-text-inactive-text);
      }
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
  form.container__create-form {
    width: 100%;
    overflow: auto;
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

  #create-form__button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    gap: 0.5rem;
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
}

.button--primary:disabled {
  background-color: var(--cta-button-disabled-background);
  color: var(--help-text);
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
