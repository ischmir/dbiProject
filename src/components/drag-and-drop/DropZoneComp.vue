<script setup>
// Importerer nødvendige Vue funktioner og komponenter
import { onMounted, ref } from "vue";
import DroppedTitleItemComp from "../drag-and-drop/dropped-items/DroppedTitleItemComp.vue";
import DroppedTextItemComp from "../drag-and-drop/dropped-items/DroppedTextItemComp.vue";
import IconsComp from "../IconsComp.vue";
// Importerer Firebase funktioner til at arbejde med databasen
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";

// Holder styr på de komponenter der er blevet droppet i zonen
const droppedItems = ref([]);

// Initialiserer Firebase og router
const db = getFirestore();
const route = useRoute();
const router = useRouter();

// Henter  komponenter fra databasen når siden indlæses
const getFormComponents = async () => {
  const formRef = doc(db, "forms", route.params.id);
  const form = await getDoc(formRef);

  const data = form.data();

  droppedItems.value = data.components || [];

  console.log(data);

  // const q = query(formCollection, where('id', ));
  // const querySnapshot = await getDocs(q);
  // const array = [];
  // querySnapshot.forEach((doc) => {
  //   array.push({ ...doc.data(), id: doc.id });
  // });
  // forms.value = array;
};

// Gemmer ændringer i komponenterne til databasen
const saveComponents = async () => {
  const formRef = doc(db, "forms", route.params.id);
  const form = await getDoc(formRef);

  await updateDoc(formRef, {
    ...form.data(),
    components: droppedItems.value,
  });

  alert("Saved");
  router.go(-1); // gå tilbage
};

// Henter komponenter når siden indlæses
onMounted(() => {
  getFormComponents();
});

 // Kobler component type til den rigtige Vue component
const componentMap = {
  title: DroppedTitleItemComp,
  text: DroppedTextItemComp,
};
 // Flyt component op eller ned
function moveItem(fromIndex, toIndex) {
  if (fromIndex < 0) {
    return;
  }

  if (toIndex > droppedItems.value.length - 1) {
    return;
  }

  const sourceElement = droppedItems.value[fromIndex];
  droppedItems.value[fromIndex] = droppedItems.value[toIndex];
  droppedItems.value[toIndex] = sourceElement;
}

 // Når en component bliver droppet i dropzone
function onDrop(event) {
   // Henter drag data
  const json = event.dataTransfer.getData("application/json");
  if (!json) return;

   // Finder drop target element
  const insertTarget = event.toElement || event.target;
  const data = JSON.parse(json);

   // Hvis ikke fundet, insert til sidst
  let index = droppedItems.value.length;
  if (insertTarget.dataset && insertTarget.dataset.id) {
     // Tjekker om det er en zone position
    const zoneMatch = insertTarget.dataset.id.match(/^zone-(\d+)$/);
    if (zoneMatch) {
       // Drop zone før item ved index
      index = parseInt(zoneMatch[1], 10);
    } else if (insertTarget.dataset.id === "zone-end") {
      index = droppedItems.value.length;
    } else {
       // Fallback: find item via id
      index = droppedItems.value.findIndex(
        (elem) => elem.id.toString() === insertTarget.dataset.id,
      );
      if (index !== -1) {
         // Tjek om drop er over eller under
        const rect = insertTarget.getBoundingClientRect();
        const offsetY = event.clientY - rect.top;
        if (offsetY > rect.height / 2) {
           // Hvis nederste halvdel, insert efter
          index = index + 1;
        }
         // Ellers insert før
      }
    }
  }

  const droppedItem = {
    ...data,
    id: Date.now(),  // Unikt id (milisekunder)
    inputValue: "",  // Klar til input
  };

   // Insert på rigtig plads
  droppedItems.value = [
    ...droppedItems.value.slice(0, index),
    droppedItem,
    ...droppedItems.value.slice(index),
  ];
}

 // Kopier en component
function duplicateItem(index) {
  const item = droppedItems.value[index];
   // Kopier indsættes efter original
  droppedItems.value.splice(index + 1, 0, {
    ...item,
    id: Date.now(),
  });
}
</script>

<template>
  <div class="dropzone">
    <div class="dropzone__header">
      <h2 class="header__title">Skema Titel</h2>
      <div class="header__dropzone-actions">
        <IconsComp class="dropzone-actions__icon" iconName="more-horizon" />
        <IconsComp class="dropzone-actions__icon" iconName="save" @click="saveComponents" />
      </div>
    </div>
    <hr class="dropzone__divider" />
    <div class="dropzone__container" @dragover.prevent @drop="onDrop">
      <div v-for="(item, index) in droppedItems" :key="'zone-' + index">
        <div class="dropzone__container_zone" :data-id="'zone-' + index" />
        <component
          :is="componentMap[item.type]"
          :key="item.id"
          :componentData="item"
          @delete="() => droppedItems.splice(index, 1)"
          @duplicate="() => duplicateItem(index)"
          @change="(data) => (droppedItems[index] = data)"
          @up="() => moveItem(index, index - 1)"
          @down="() => moveItem(index, index + 1)"
        />
      </div>
      <div data-id="zone-end" class="dropzone__container_zone" />
    </div>
  </div>
</template>

<style scoped>
.dropzone__container_zone {
  width: 100%;
  height: 50px;
}

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
