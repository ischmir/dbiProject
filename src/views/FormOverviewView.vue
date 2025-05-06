<script setup>
import { onMounted, ref } from 'vue';
import TabMenuComp from '@/components/TabMenuComp.vue';
import IconsComp from '@/components/IconsComp.vue';
import TableColumn from '@/components/TableColumnComp.vue';
import TableComp from '@/components/TableComp.vue';
import TableRow from '@/components/TableRowComp.vue';
import CreateFormModalComp from '@/components/CreateFormModalComp.vue';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

const folderId = ref(null);
const folders = ref([]);
const forms = ref([]);
const isModalVisible = ref(null);

const openModal = (folderId) => {
  isModalVisible.value = folderId;
};

const closeModal = () => {
  isModalVisible.value = null;
  clickFolder(folderId.value);
};

const db = getFirestore();
const formCollection = collection(db, 'folders');

const getFolders = async () => {
  const querySnapshot = await getDocs(formCollection);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  folders.value = array;
};

const deleteForm = async (id) => {
  console.log('Delete', id);

  const document = doc(db, 'forms', id);
  await deleteDoc(document);
  clickFolder(folderId.value);
};

const clickFolder = async (id) => {
  folderId.value = id;

  // Find forms med det rigtige folderId
  const q = query(collection(db, 'forms'), where('folderId', '==', id));

  const querySnapshot = await getDocs(q);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  forms.value = array;
};

onMounted(() => {
  getFolders();
});

console.log('form', forms);
console.log('folders', folders);
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Mapper']">
      <template #header>
        <IconsComp iconName="add-folder" title="Opret mappe" />
      </template>
      <TableRow
        v-for="folder in folders"
        v-bind:key="folder.name"
        :class="{ isActive: folderId == folder.id }"
        @click="() => clickFolder(folder.id)"
      >
        <TableColumn> {{ folder.name }} </TableColumn>
      </TableRow>
    </TableComp>

    <TableComp :cols="['Indhold']" v-if="!!folderId">
      <template #header>
        <IconsComp iconName="sort" title="Sorter alfabetist" />
        <IconsComp iconName="add-schedule" title="Opret skema" @click="openModal" />
      </template>
      <TableRow v-for="form in forms" v-bind:key="form.id">
        <TableColumn> {{ form.name }} </TableColumn>
        <TableColumn>
          <IconsComp iconName="checkpoints" />
          <IconsComp iconName="delete" @click="() => deleteForm(form.id)" />
        </TableColumn>
      </TableRow>
    </TableComp>
  </div>

  <CreateFormModalComp
    :folderId="folderId"
    v-if="isModalVisible && folderId"
    @close="closeModal"
  />
</template>

<style lang="scss" scoped>
.isActive {
  color: var(--warning-dark);
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
</style>
