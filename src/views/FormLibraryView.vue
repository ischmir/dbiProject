<script setup>
import TabMenuComp from '@/components/TabMenuComp.vue';
import IconsComp from '@/components/IconsComp.vue';
import TableColumn from '@/components/TableColumnComp.vue';
import TableComp from '@/components/TableComp.vue';
import TableRow from '@/components/TableRowComp.vue';
import SearchInputComp from '@/components/SearchInputComp.vue';
import { sort, filter } from '@/components/utils.js';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const forms = ref([]);
const db = getFirestore();
const formCollection = collection(db, 'forms');
const ordering = ref('desc');

const getForms = async (order = ordering.value, searchTerm = '') => {
  ordering.value = order;
  const q = query(formCollection);
  const querySnapshot = await getDocs(q);
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ ...doc.data(), id: doc.id });
  });
  forms.value = filter(sort(array, 'name', order), 'name', searchTerm);
};

onMounted(() => {
  getForms();
});
</script>

<template>
  <TabMenuComp />
  <div class="container">
    <TableComp :cols="['Skemaer']">
      <template #header>
        <SearchInputComp :onChange="(text) => getForms(ordering.value, text)" />
        <IconsComp
          iconName="sort"
          title="Sorter alfabetisk"
          @click="() => getForms(ordering == 'asc' ? 'desc' : 'asc')"
        />
      </template>
      <TableRow v-for="form in forms" v-bind:key="form.name">
        <TableColumn> {{ form.name }} </TableColumn>
        <TableColumn></TableColumn>
      </TableRow>
    </TableComp>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 12px;
}

.icons-th {
  display: flex;
  gap: 24px;
}
</style>
