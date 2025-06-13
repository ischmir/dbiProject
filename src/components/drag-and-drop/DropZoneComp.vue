<script setup>
// Importerer nødvendige Vue funktioner og komponenter
import { onMounted, ref } from 'vue';
import DroppedTitleItemComp from '../drag-and-drop/dropped-items/DroppedTitleItemComp.vue';
import DroppedTextItemComp from '../drag-and-drop/dropped-items/DroppedTextItemComp.vue';
import IconsComp from '../IconsComp.vue';
// Importerer Firebase funktioner til at arbejde med databasen
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

// Holder styr på de komponenter der er blevet droppet i zonen
const droppedItems = ref([]);

// Initialiserer Firebase og router
const db = getFirestore();
const route = useRoute();
const router = useRouter();

// Henter eksisterende komponenter fra databasen når siden indlæses
const getFormComponents = async () => {
  const formRef = doc(db, 'forms', route.params.id);
  const form = await getDoc(formRef);

  const data = form.data();

  droppedItems.value = data.components ||[];

  console.log(data);

  // const q = query(formCollection, where("id", ));
  // const querySnapshot = await getDocs(q);
  // const array = [];
  // querySnapshot.forEach((doc) => {
  //   array.push({ ...doc.data(), id: doc.id });
  // });
  // forms.value = array;
};

// Gemmer ændringer i komponenterne til databasen
const saveComponents = async () => {
  const formRef = doc(db, 'forms', route.params.id);
  const form = await getDoc(formRef);

  await updateDoc(formRef, {
    ...form.data(),
    components: droppedItems.value,
  });

  alert('Saved');
  router.go(-1);
};

// Henter komponenter når siden indlæses
onMounted(() => {
  getFormComponents();
});

// Mapper komponent typer til deres respektive komponenter
const componentMap = {
  title: DroppedTitleItemComp,
  text: DroppedTextItemComp,
};

// Håndterer når en komponent bliver droppet i zonen
function onDrop(event) {
  const json = event.dataTransfer.getData('application/json');
  if (!json) return;

  const data = JSON.parse(json);
  console.log(data);
  // Tilføjer den nye komponent til listen med et unikt ID
  droppedItems.value.push({
    ...data,
    id: Date.now(),
    inputValue: '',
  });
}

// Kopierer en eksisterende komponent
function duplicateItem(index) {
  const item = droppedItems.value[index];
  // Indsætter en kopi af komponenten lige efter originalen
  droppedItems.value.splice(index + 1, 0, {
    ...item,
    id: Date.now(),
  });
}

console.log('Data', droppedItems.value);
</script>

<template>
  <div class="dropzone">
    <div class="dropzone__header">
      <h2 class="header__title">Skema Titel</h2>
      <div class="header__dropzone-actions">
        <IconsComp class="dropzone-actions__icon" iconName="more-horizon" />
        <IconsComp
          class="dropzone-actions__icon"
          iconName="save"
          @click="saveComponents"
        />
      </div>
    </div>
    <hr class="dropzone__divider" />
    <div class="dropzone__container" @dragover.prevent @drop="onDrop">
      <component
        v-for="(item, index) in droppedItems"
        :is="componentMap[item.type]"
        :key="item.id"
        :componentData="item"
        @delete="() => droppedItems.splice(index, 1)"
        @duplicate="() => duplicateItem(index)"
        @change="(data) => (droppedItems[index] = data)"
      />
    </div>
  </div>
</template>

<style scoped>
.dropzone {
  height: 100%;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.dropzone__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.header__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: start;
}
.header__dropzone-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.dropzone-actions__icon {
  cursor: pointer;
}

.dropzone__divider {
  border: 1px solid var(--placeholder-text-inactive-text);
  margin: 0.1rem 1rem 2rem 1rem;
}

.dropzone__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: auto;
}
</style>
