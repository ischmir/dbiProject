<script setup>
// Importerer nødvendige Vue funktioner og komponenter
import { onMounted, ref } from "vue";
import TabMenuComp from "@/components/TabMenuComp.vue";
import IconsComp from "@/components/IconsComp.vue";
import TableColumn from "@/components/TableColumnComp.vue";
import TableComp from "@/components/TableComp.vue";
import { sort } from "@/components/utils.js";
import TableRow from "@/components/TableRowComp.vue";
import CreateFormModalComp from "@/components/CreateFormModalComp.vue";
// Importerer Firebase funktioner til at Hente, tilføje og slette i 'folders' og 'forms'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "vue-router";

// Opretter reaktive variabler til at holde styr på sortering, 'folders' og 'forms'
const ordering = ref("desc");
const folderId = ref(null);
const folders = ref([]);
const forms = ref([]);
const isModalVisible = ref(null);

// Funktioner til at åbne og lukke modal vinduet
const openModal = (folderId) => {
  isModalVisible.value = folderId;
};

const closeModal = () => {
  isModalVisible.value = null;
  clickFolder(folderId.value);
};

//  sætter Firestore og vue-router op.
const db = getFirestore();
const router = useRouter();
const folderCollection = collection(db, "folders");

// Henter alle 'folders' fra databasen
const getFolders = async () => {
  const querySnapshot = await getDocs(folderCollection);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  folders.value = array;
};

// Opretter en ny 'folder'
const addFolder = async () => {
  const name = prompt("Navn");
  // tjekker om navn ikke er tomt
  if (name) {
    const folderCollection = collection(db, "folders");
    //opretter ny mappe
    const newDoc = await addDoc(folderCollection, {
      name,
    });
    // Genindlæser mapper og vælger den nye.
    await getFolders();
    await clickFolder(newDoc.id);
  }
};

// Sletter en 'form' fra db
const deleteForm = async (id) => {
  console.log("Delete", id);
  const document = doc(db, "forms", id);
  // genindlæser indholdet i mappen.
  await deleteDoc(document);
  clickFolder(folderId.value);
};

// Håndterer klik på en mappe - henter skemaer i den valgte mappe
const clickFolder = async (id, order = ordering.value) => {
  folderId.value = id;
  ordering.value = order;

  // Finder alle 'forms' i den valgte mappe
  const q = query(collection(db, "forms"), where("folderId", "==", id));

  const querySnapshot = await getDocs(q);

  const array = [];
  querySnapshot.forEach((doc) => {
    // pusher data og id i array
    array.push({ ...doc.data(), id: doc.id });
  });
  // Sorterer 'forms' efter navn
  forms.value = sort(array, "name", order);
};

// Henter 'folders' når siden indlæses
onMounted(() => {
  getFolders();
});

// Håndterer klik på en 'form' - sender brugeren til 'form' editoren
const clickForm = (id) => {
  console.log("Clicked", id);
  router.push(`/form-editor/${id}`);
};

console.log("form", forms);
console.log("folders", folders);
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Mapper']">
      <template #header>
        <IconsComp iconName="add-folder" class="cursor" title="Opret mappe" @click="addFolder" />
      </template>
      <TableRow
        v-for="folder in folders"
        v-bind:key="folder.name"
        :class="{ isActive: folderId == folder.id }"
        @click="() => clickFolder(folder.id)"
        class="cursor"
      >
        <TableColumn> {{ folder.name }} </TableColumn>
        <TableColumn> <IconsComp iconName="arrow-right" /> </TableColumn>
      </TableRow>
    </TableComp>

    <TableComp :cols="['Indhold']" v-if="!!folderId">
      <template #header>
        <IconsComp
          iconName="sort"
          class="cursor"
          title="Sorter alfabetist"
          @click="() => clickFolder(folderId, ordering == 'asc' ? 'desc' : 'asc')"
        />
        <IconsComp iconName="add-schedule" title="Opret skema" @click="openModal" class="cursor" />
      </template>
      <TableRow v-for="form in forms" v-bind:key="form.id">
        <TableColumn @click="() => clickForm(form.id)" class="cursor">
          {{ form.name }}
        </TableColumn>
        <TableColumn>
          <IconsComp iconName="checkpoints" />
          <IconsComp iconName="delete" class="cursor" @click="() => deleteForm(form.id)" />
        </TableColumn>
      </TableRow>
    </TableComp>
  </div>

  <CreateFormModalComp :folderId="folderId" v-if="isModalVisible && folderId" @close="closeModal" />
</template>

<style lang="scss" scoped>
.isActive {
  color: var(--cta-button-link-active);
}

.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 12px;
  padding: 12px;
}

.icons-th {
  display: flex;
  gap: 24px;
}

.cursor {
  cursor: pointer;
}
</style>
